import React, { Component } from 'react';
import reqHandler from './../../utils/reqHandler';
import notifiy from './../../notifications/notify';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fireRedirect: false
        }

        this.onChange = this.onChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    loginUser = (e) => {
        e.preventDefault();
        reqHandler.login(this.state)
            .then(response => {
                this.setState({ fireRedirect: true })
                localStorage.setItem('token', response._kmd.authtoken);
                localStorage.setItem('username', response.username);
                notifiy.showInfo('Loggin successful!');
                window.location.replace('/catalog');
            })
            .catch((e) => {
                console.log(e);
            })
    }

    render() {
        const { fireRedirect } = this.state;
        return (
            <div>
                <form id="loginForm" onSubmit={this.loginUser}>
                    <h2>Sign In</h2>
                    <label>Username:</label>
                    <input onChange={this.onChange} name="username" type="text" />
                    <label>Password:</label>
                    <input onChange={this.onChange} name="password" type="password" />
                    <input id="btnLogin" value="Sign In" type="submit" />
                </form>
                {fireRedirect && (
                    <Redirect to='/' />
                )}
            </div>
        )
    }
}

export default Login;