const host = 'http://localhost:5000/';

function register(name, email, password) {
    return fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    })
        .then(data => {
            return data.json();
        })
}

function login(email, password) {
    return fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(data => {
            return data.json();
        })
}

function createHotel(hotel) {
    return fetch(host + 'hotels/create', {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotel)
    })
        .then(res => {
            return res.json();
        })
}

function getPage(page) {
    return fetch(host + 'hotels/all?page=' + page)
        .then((res) => {
            return res.json();
        })
}

function getHotelById(hotelId) {
    return fetch(host + `hotels/details/${hotelId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
        }
    })
        .then((res) => {
            return res.json();
        })
}

function createReview(hotelId, review) {
    return fetch(host + `hotels/details/${hotelId}/reviews/create`, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
        .then(res => {
            return res.json();
        })
}

function listReviews(hotelId) {
    return fetch(host + `hotels/details/${hotelId}/reviews`, {
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    })
        .then((res => {
            return res.json();
        }))
}

export { register, login, createHotel, getPage, getHotelById, createReview, listReviews };