import UserModel from '../model/Users.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator';
import axios from 'axios';
import fetch from 'node-fetch';

/**

@function verifyUser
@async
@param {Object} req - The Express request object.
@param {Object} res - The Express response object.
@param {Function} next - The Express next middleware function.
@returns {Promise<void>} - The Promise resolves when the user verification is completed.
@description
Middleware function that verifies the existence of a user in the database.
It checks if a user exists in the UserModel based on the provided username.
If the user exists, it calls the next middleware function.
If the user does not exist or there is an authentication error, it sends an appropriate error response.
*/
export async function verifyUser(req, res, next){ 

    try {
       
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}
 
/**
POST: http://localhost:8080/api/register 
@function register
@async
@param {Object} req - The Express request object.
@param {Object} res - The Express response object.
@returns {Promise<void>} - The Promise resolves when the user registration is completed.
@description
Function responsible for registering a new user.
It checks for the existence of a user with the same username and email in the UserModel.
If a unique username and email are provided, it hashes the password and creates a new user
entry in the database. If the user is successfully registered, it sends a success response.
In case of errors, it sends an appropriate error response.
*/
export async function register(req,res){

    try {
        const { username, password, profile, email } = req.body;  
        console.log(username+" "+password+" "+email)      

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({ error : "Please use unique username"});

                resolve();
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function(err, email){
                if(err) reject(new Error(err))
                if(email) reject({ error : "Please use unique Email"});

                resolve();
            })
        });


        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error);
    }

}



/**
POST: http://localhost:8080/api/login 
@function login
@async
@param {Object} req - The request object containing user credentials.
@param {Object} res - The response object to send back the result.
@description Handles user login by validating the provided credentials. If successful, it returns a JSON Web Token (JWT) for subsequent authentication.
@returns {Object} Sends an HTTP response with a status code and a message, along with the JWT if the login is successful.
@throws {Object} Sends an HTTP response with a status code and an error message if any error occurs during the process.
*/
export async function login(req,res){
   
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}


/** GET: http://localhost:8080/api/user/example123 
@function getUser
@async
@param {Object} req - The request object containing the username as a parameter.
@param {Object} res - The response object to send back the result.
@description Retrieves a user's data from the database using their username and returns it, excluding their password.
@returns {Object} Sends an HTTP response with a status code and the user data if found.
@throws {Object} Sends an HTTP response with a status code and an error message if any error occurs during the process or if the user is not found.
*/
export async function getUser(req,res){
    
    const { username } = req.params;

    try {    
        if(!username) return res.status(501).send({ error: "Invalid Username"});

        UserModel.findOne({ username }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());
            //console.log(rest['score'])

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }
}



/** GET: http://localhost:8080/api/user/example123 
@function getPubTrans
@async
@param {Object} req - The request object.
@param {Object} res - The response object to send back the result.
@description Retrieves public transport data from the National Transport API and returns it in JSON format.
@returns {Object} Sends an HTTP response with a status code and the public transport data in JSON format.
@throws {Error} Logs the error to the console if any error occurs during the process of fetching data from the API.
*/
export async function getPubTrans(req,res){

    const data = await axios.get('https://api.nationaltransport.ie/gtfsr/v1?format=json', {
        headers: {
            'x-api-key': 'f1121f747e314c1d9b54f569b0b79d6f',
        }
    })
    .then(response => {
        return response.data
    })
    .catch(err => console.error(err));
    
    return res.json(data);

}



/**
PUT: http://localhost:8080/api/updateuser 
@function updateUser
@async
@param {Object} req - The request object.
@param {Object} res - The response object to send back the result.
@description Updates the user information based on the provided data in the request body.
@returns {Object} Sends an HTTP response with a status code and a message indicating whether the user's record has been updated or not.
@throws {Error} Sends an HTTP response with an error status code and message if any error occurs during the process of updating the user's data.
*/
export async function updateUser(req,res){
    try {
        const { userId } = req.user;
        if(userId){
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id : userId }, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({ msg : "Record Updated...!"});
            })

        }else{
            return res.status(401).send({ error : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}


/**
GET: http://localhost:8080/api/generateOTP
@function generateOTP
@async
@param {Object} req - The request object.
@param {Object} res - The response object to send back the result.
@description Generates a 6-digit OTP and saves it in the application's local storage.
@returns {Object} Sends an HTTP response with a status code and the generated OTP.
*/
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8080/api/verifyOTP 
@function verifyOTP
@async
@param {Object} req - The request object containing the OTP entered by the user.
@param {Object} res - The response object to send back the result.
@description Verifies the OTP entered by the user against the OTP stored in the application's local storage.
@returns {Object} Sends an HTTP response with a status code and a message indicating whether the OTP verification was successful or not.
@throws {Error} Sends an HTTP response with an error status code and message if the provided OTP does not match the stored OTP.
*/
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession 
@function createResetSession
@async
@param {Object} req - The request object.
@param {Object} res - The response object to send back the result.
@description Checks if there is an active reset session in the application's local storage.
@returns {Object} Sends an HTTP response with a status code and either a reset session flag or an error message.
*/
export async function createResetSession(req,res){
   if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}

/** PUT: http://localhost:8080/api/resetPassword 
@function resetPassword
@async
@param {Object} req - The request object containing the user's username and new password.
@param {Object} res - The response object to send back the result.
@description Resets a user's password if the reset session is active, hashing the new password and updating the user record in the database.
@returns {Object} Sends an HTTP response with a status code and either a success message or an error message.
*/
export async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Record Updated...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}
