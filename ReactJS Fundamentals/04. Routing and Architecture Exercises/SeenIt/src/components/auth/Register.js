import React, { Component } from 'react';
import reqHandler from './../../utils/reqHandler';
import notifiy from './../../notifications/notify';

class Register extends Component {

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    regUser = (e) => {
        e.preventDefault();
        let isValid = reqHandler.validateReg(this.state);
        if (isValid) {
            reqHandler.register(this.state)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response._kmd.authtoken);
                localStorage.setItem('username', response.username);
                notifiy.showInfo('Registration successful!');
                window.location.replace('/catalog');
            })
            .catch(e => {
                notifiy.handleError(e);
            })
        }
    }

    render() {
        return (
            <form id="registerForm" onSubmit={this.regUser}>
                <h2>Register</h2>
                <label>Username:</label>
                <input onChange={this.onChange} name="username" type="text" />
                <label>Password:</label>
                <input onChange={this.onChange} name="password" type="password" />
                <label>Repeat Password:</label>
                <input onChange={this.onChange} name="repeatPass" type="password" />
                <input id="btnRegister" value="Sign Up" type="submit" />
            </form>
        )
    }
}

export default Register;