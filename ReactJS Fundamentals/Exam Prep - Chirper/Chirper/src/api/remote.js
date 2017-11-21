import { userInfo } from "os";

const host = 'https://baas.kinvey.com/';
const appKey = 'kid_rJw2piT1G';
const appSecret = '32db80cc96804cd7a398ed4a80dae3e4';

function register(username, subscriptions = [], password) {
    return fetch(host + 'user/' + appKey, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            subscriptions,
            password
        })
    })
        .then((res) => {
            return res.json();
        })
}

function login(username, password) {
    return fetch(host + `user/${appKey}/login`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
        .then((res) => {
            return res.json();
        })
}

function countChirps(username) {
    return fetch(host + `appdata/${appKey}/chirps?query={"author":"${username}"}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token'),
        }
    })
        .then((res) => {
            return res.json();
        })
}

function countFollowing(username) {
    return fetch(host + `user/${appKey}/?query={"username":"${username}"}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token'),
        }
    })
        .then((res) => {
            return res.json();
        })
}

function countFollowers(username) {
    return fetch(host + `user/${appKey}/?query={"subscriptions":"${username}"}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token'),
        }
    })
        .then((res) => {
            return res.json();
        })
}

function createChirp(chirp) {
    return fetch(host + `appdata/${appKey}/chirps`, {
        method: 'POST',
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chirp)
    })
        .then((res) => {
            return res.json();
        })
}

function deleteChirp(chirpId) {
    return fetch(host + `appdata/${appKey}/chirps/${chirpId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
}

function listUserFeed(input) {
    let subs = JSON.stringify(input);
    return fetch(host + `appdata/${appKey}/chirps?query={"author":{"$in": ${subs}}}&sort={"_kmd.ect": 1}`, {
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token')
        }
    })
        .then((res => {
            return res.json();
        }))
}

function listUserChirps(username) {
    return fetch(host + `appdata/${appKey}/chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`, {
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
}

function discoverUsers() {
    return fetch(host + `user/${appKey}`, {
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
}

function getUserById(userId) {
    return fetch(host + `user/${appKey}/${userId}`, {
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
}

function followUser(userId, newArr) {
    let obj = {
        "subscriptions": newArr
    };
    return fetch(host + `user/${appKey}/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            return res.json();
        })
}

function modifySubs(arr, username) {
    let subs = JSON.parse(localStorage.getItem('subscriptions'));
    if (subs.includes(username)) {
        let indexOfUser = arr.indexOf(username);
        arr.splice(indexOfUser, 1);
    } else {
        arr.push(username);
    }
    return arr;
}

function calcTime(dateIsoFormat) {
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
}


export {
    register,
    login,
    countChirps,
    countFollowing,
    countFollowers,
    createChirp,
    deleteChirp,
    listUserFeed,
    listUserChirps,
    discoverUsers,
    getUserById,
    followUser,
    modifySubs,
    calcTime
};