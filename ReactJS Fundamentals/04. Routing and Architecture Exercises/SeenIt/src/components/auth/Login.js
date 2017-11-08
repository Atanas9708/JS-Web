import React, { Component } from 'react';
import reqHandler from './../../utils/reqHandler';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    loginUser = (e) => {
        e.preventDefault();
        reqHandler.login(this.state)
        .then(response => {
            console.log(response);
            localStorage.setItem('token', response._kmd.authtoken);
            localStorage.setItem('username', response.username);
        }).catch(e => {
            console.log(e);
        })
    }

    render() {
        return (
            <form id="loginForm" onSubmit={this.loginUser}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input onChange={this.onChange} name="username" type="text" />
                <label>Password:</label>
                <input onChange={this.onChange} name="password" type="password" />
                <input id="btnLogin" value="Sign In" type="submit" />
            </form>
        )
    }
}

export default Login;