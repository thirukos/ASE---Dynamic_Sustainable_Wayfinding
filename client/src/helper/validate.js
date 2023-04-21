import toast from 'react-hot-toast'
import { authenticate } from './helper'

/**

@function usernameValidate
@async
@param {Object} values - The object containing the values to be validated
@param {string} values.username - The username to be validated for existence
@description Validates the username by checking if it exists in the database, and returns any validation errors.
@returns {Promise} Returns a Promise that resolves with any validation errors or rejects with an error message.
*/
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        // check user exist or not
        const { status } = await authenticate(values.username);
        
        if(status !== 200){
            errors.exist = toast.error('User does not exist...!')
        }
    }

    return errors;
}

/**
Validates the password input field for login form.
@async
@param {object} values - An object containing values for the form fields.
@returns {Promise} Returns a Promise that resolves with any validation errors or an empty object if no errors.
*/
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/**

Validates the password input field and the confirm password input field for password reset form.
@async
@param {object} values - An object containing values for the form fields.
@returns {Promise} Returns a Promise that resolves with any validation errors or an empty object if no errors.
*/
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

/**

Validates the username, password, and email input fields for the registration form.
@async
@param {object} values - An object containing values for the form fields.
@returns {Promise} Returns a Promise that resolves with any validation errors or an empty object if no errors.
*/
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validate profile page */
/**

Validates the user profile form.
@async
@function profileValidation
@param {object} values - The object containing the profile form values.
@param {string} values.email - The email address of the user.
@returns {object} An object containing any validation errors.
*/
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}

/**
Validates the password input based on specific requirements
@async
@param {Object} errors - An object containing potential validation errors
@param {Object} values - An object containing password value to validate
@returns {Object} Returns an object containing validation errors (if any)
*/
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}

/**

@function usernameVerify
@description Validates the username value
@param {Object} errors - The errors object to add errors to
@param {Object} values - The values object to validate
@returns {Object} The updated errors object
*/
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

/**

@function passwordVerify
@async
@param {Object} [errors={}] - The error object to append password validation errors to.
@param {Object} values - The password values to validate.
@description Validates the password field of a form to ensure it meets certain criteria.
@returns {Object} Returns an object with appended password validation errors.
*/
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}