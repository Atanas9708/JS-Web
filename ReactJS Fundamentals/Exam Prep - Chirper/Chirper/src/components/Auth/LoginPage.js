import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../api/remote';
import toastr from 'toastr';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        login(this.state.username, this.state.password).then((res) => {
            console.log(res);
            localStorage.setItem('token', res._kmd.authtoken);
            localStorage.setItem('username', res.username);
            localStorage.setItem('userId', res._id);
            localStorage.setItem('subscriptions', JSON.stringify(res.subscriptions));
            toastr.success('Login successful');
            this.props.history.push('/feed');
        })
    }

    render() {
        return (
            <section id="viewLogin">
                <div className="content">
                    <form onSubmit={this.onSubmitHandler} id="formLogin" className="form">
                        <label>Username</label>
                        <input onChange={this.onChangeHandler} name="username" type="text" />
                        <label>Password</label>
                        <input onChange={this.onChangeHandler} name="password" type="password" />
                        <input id="btnLogin" value="Sign In" type="submit" />
                        <Link to="/register">Register</Link>
                    </form>
                </div>
            </section>
        );
    }
}

export default withRouter(LoginPage);