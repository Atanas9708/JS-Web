const validator = require('validator');
const User = require('mongoose').model('User');

module.exports = {
    validateSignupForm: (payload) => {
        const errors = {};
        const isFormValid = true;
        let message = '';

        if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
            isFormValid = false;
            errors.email = 'Please provice a correct email.';
        }

        if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
            isFormValid = false
            errors.username = 'Please provide a valid username.'
        }

        if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 4) {
            isFormValid = false
            errors.password = 'Password must have at least 4 characters.'
        }

        if (!payload || typeof payload.repeatPass !== 'string' || payload.repeatPass.trim().length < 4) {
            isFormValid = false
            errors.repeatPass = 'Password must have at least 4 characters.'
        }

        if (!payload || payload.password !== payload.repeatPass) {
            isFormValid = false
            errors.password = 'Passwords must match.'
        }

        if (!isFormValid) {
            message = 'Check the form for errors.'
        }


        return {
            success: isFormValid,
            message,
            errors
        }
    },

    validateLoginForm: (payload) => {
        const errors = {}
        let isFormValid = true
        let message = ''
      
        if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
          isFormValid = false
          errors.username = 'Please provide your username.'
        }
      
        if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
          isFormValid = false
          errors.password = 'Please provide your password.'
        }
      
        if (!isFormValid) {
          message = 'Check the form for errors.'
        }
      
        return {
          success: isFormValid,
          message,
          errors
        }
    }
}