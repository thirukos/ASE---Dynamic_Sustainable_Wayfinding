import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
console.log('REACT_APP_SERVER_DOMAIN:', process.env.REACT_APP_SERVER_DOMAIN);
/** Make API Requests */
/**
@function getUsername
@async
@description Retrieves the username from the stored token in local storage and decodes it.
@returns {Promise} Returns a Promise that resolves with the decoded username or rejects with an error message.
*/
export async function getUsername() {
    const token = localStorage.getItem('token')
    if (!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
/**

@function authenticate
@async
@param {string} username - The username to authenticate.
@description Sends a POST request to authenticate a user with the given username.
@returns {Promise} Returns a Promise that resolves with the authentication result or rejects with an error message.
*/
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error: "Username doesn't exist...!" }
    }
}

/** get User details */
/**
@function getUser
@async
@param {Object} param0 - An object containing the username.
@param {string} param0.username - The username of the user to get details for.
@description Sends a GET request to retrieve user details for the given username.
@returns {Promise} Returns a Promise that resolves with the user data or rejects with an error message.
*/
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match...!" }
    }
}

/**
@function getUserScore
@async
@param {string} username - The username of the user whose score to retrieve.
@description Sends a GET request to retrieve the user score for the given username.
@returns {Promise} Returns a Promise that resolves with the user score or rejects with an error message.
*/
export async function getUserScore(username) {
    try {
        const res = await axios.get(`/api/user/${username}`);
        return await res.data.score;
    }
    catch (error) {
        return { error: "no score" }
    }

}


/**
@function registerUser
@async
@param {Object} credentials - Object containing username, email and password of user.
@param {string} credentials.username - The username of the user to be registered.
@param {string} credentials.email - The email of the user to be registered.
@param {string} credentials.password - The password of the user to be registered.
@description Sends a POST request to register the user with the given credentials. Sends a confirmation email to the registered email address if the registration is successful.
@returns {Promise} Returns a Promise that resolves with the success message or rejects with an error message.
*/
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg })
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/**
@function verifyPassword
@async
@param {object} userObject - An object containing username and password properties.
@param {string} userObject.username - The username of the user to verify the password.
@param {string} userObject.password - The password to verify.
@description Sends a POST request to the server to verify the user's password for the given username.
@returns {Promise} Returns a Promise that resolves with the user data or rejects with an error message.
*/
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't Match...!" })
    }
}

/**
@function updateUser
@async
@param {object} response - An object containing user profile information to update.
@description Sends a PUT request to update the user profile information.
@returns {Promise} Returns a Promise that resolves with the updated user profile information or rejects with an error message.
*/
export async function updateUser(response) {
    try {

        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } });

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile...!" })
    }
}

/**
@function updateUserscore
@async
@param {Object} response - The response object containing the user score information.
@param {string} response.username - The username of the user whose score is to be updated.
@param {number} response.score - The new score to be updated for the user.
@description Sends a PUT request to update the user score for the given username.
@returns {Promise} Returns a Promise that resolves with the updated score data or rejects with an error message.
*/
export async function updateUserscore(response) {
    try {
        const token = await localStorage.getItem('token');
        //console.log(token)
        const data = await axios.put('/api/updateuserscore', response, { headers: { "Authorization": `Bearer ${token}` } });
        console.log(data)

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error: "Couldn't Update score" })
    }

}

/**
@function generateOTP
@async
@param {string} username - The username for which OTP is to be generated.
@description Generates an OTP for password recovery for the given username by sending a GET request to '/api/generateOTP'. Sends an email to the user's email address containing the OTP if the GET request is successful.
@returns {Promise} Returns a Promise that resolves with the OTP or rejects with an error message.
*/
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });

        // send mail with the OTP
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" })
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/**
@function verifyOTP
@async
@param {Object} credentials - Object containing the username and OTP code to verify.
@param {string} credentials.username - The username of the user to verify.
@param {string} credentials.code - The OTP code to verify.
@description Sends a GET request to verify the OTP code for the given username.
@returns {Promise} Returns a Promise that resolves with data and status, or rejects with an error message.
*/
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
@function resetPassword
@async
@param {Object} credentials - Object containing the username and new password to reset.
@param {string} credentials.username - The username of the user to reset password.
@param {string} credentials.password - The new password to set.
@description Sends a PUT request to reset password for the given username.
@returns {Promise} Returns a Promise that resolves with data and status, or rejects with an error message.
*/
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}

/**

@function getPubTrans
@async
@description Sends a GET request to retrieve public transportation data.
@returns {Object} Returns an object containing public transportation data or an error message.
*/
export async function getPubTrans() {
    try {
        const { data } = await axios.get(`/api/pubtrans`);
        console.log('helper')
        console.log(data);
        return data;
    } catch (error) {
        return { error: "Public transport data not available" }
    }
}

/**

@function getWeather
@async
@param {number} lat - The latitude of the location for which weather data is requested.
@param {number} lon - The longitude of the location for which weather data is requested.
@description Sends a GET request to retrieve weather data for the specified latitude and longitude.
@returns {Object} Returns an object containing weather data or an error message.
*/
export async function getWeather({ lat, lon}){
    try{

        const { data } = await axios.get(`/api/weather/${lat}/${lon}`);
        console.log('helper')
        console.log(data);
        return data;
    } catch (error) {
        return { error : "Weather data not available"}
    }
}
