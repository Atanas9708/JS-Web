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
        .then((res) => {
            return res.json();
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
        .then((res) => {
            return res.json();
        })
}

function listYearlyBalance(year) {
    return fetch(host + `plan/${year}`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
}

function getMonthlyBalance(year, month) {
    return fetch(host + `plan/${year}/${month}`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
}

function addExpense(year, month, expense) {
    return fetch(host + `plan/${year}/${month}/expense`, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    })
        .then((res) => {
            return res.json();
        })
}

function updateIncomeAndBudget(year, month, update) {
    return fetch(host + `plan/${year}/${month}`, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    })
        .then((res) => {
            return res.json();
        })
}

function deleteExpense(expenseId) {
    return fetch(host + `plan/expense/${expenseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.json();
        })
}

export { register, login, listYearlyBalance, getMonthlyBalance, addExpense, updateIncomeAndBudget, deleteExpense };