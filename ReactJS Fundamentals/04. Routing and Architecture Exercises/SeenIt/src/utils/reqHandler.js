import notify from './../notifications/notify';

const hostUrl = 'https://baas.kinvey.com';
const appKey = 'kid_BkhVvfRCZ';
const appSecret = '95bc88e5b7ee4b809b045097c1db436f';

let reqHandler = {
    login: (payload) => {
        return fetch(`${hostUrl}/user/${appKey}/login`, {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(data => {
                return data.json();
            })
    },
    register: (payload) => {
        return fetch(`${hostUrl}/user/${appKey}`, {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(data => {
                return data.json();
            })
    },
    listAllPosts: () => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
            .then(data => {
                return data.json();
            })

    },
    createPost: (payload) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(data => {
                return data.json();
            })
    },
    myPosts: () => {
        let username = localStorage.getItem('username');
        let token = localStorage.getItem('token');
        return fetch(`${hostUrl}/appdata/${appKey}/posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + token
            }
        })
            .then(data => {
                return data.json();
            })
    },
    editPost: (data, postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                return data.json();
            })
    },
    deletePost: (postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
            .then(data => {
                return data.json();
            })
    },
    loadPostById: (postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts/${postId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
            .then(data => {
                return data.json();
            })
    },
    createComment: (data) => {
        return fetch(`${hostUrl}/appdata/${appKey}/comments`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                return data.json();
            })
    },
    deleteComment: (commentId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
            .then(data => {
                return data.json();
            })
    },
    loadCommentsById: (postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
            .then(data => {
                return data.json();
            })
    },
    calcTime: (dateIsoFormat) => {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    },
    validateReg: (fields) => {
        let userPattern = /[a-zA-Z]{3,}/g;
        let passPattern = /[a-zA-Z0-9]{6,}/g;

        if (!userPattern.test(fields.username)) {
            notify.showError('A username should be at least 3 characters long and should contain only english alphabet letters.');
            return false;
        }

        if (!passPattern.test(fields.password)) {
            notify.showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits.');
            return false;
        }

        if (fields.password !== fields.repeatPass) {
            notify.showError('Passwords should match!');
            return false;
        }

        return true;
    }
}

export default reqHandler;