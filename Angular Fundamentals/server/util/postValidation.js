module.exports = {
    validatePost: (payload) => {
        let errors = {};
        let postIsValid = true;

        if (!payload['title'] || !payload['image'] || !payload['class'] || !payload['category'] || !payload['description']) {
            error.fields = 'Please fill the provided fields.';
            postIsValid = false;
        }

        if (payload['image'].endsWith('.jpg') || payload['image'].endsWith('.png')) {
            //console.log('valid image');
        } else {
            errors.image = 'Image must be in jpg or png format.';
            postIsValid = false;
        }

        if (payload['title'].length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            postIsValid = false;
        }

        if (payload['description'].length < 5 || payload['description'].length > 800) {
            errors.description = 'Description must be between 5 and 800 characters long!';
            postIsValid = false;
        }

        return {
            success: postIsValid,
            errors
        }
    }
}