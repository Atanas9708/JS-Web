import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { register } from '../../api/remote';
import toastr from 'toastr';
import { userInfo } from 'os';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: false,
            password: false,
            repeat: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { password, repeat, username } = this.state;
        if(!username && !password && !repeat) {
            toastr.error('Fill all the empty fields!');
            return;
        }
        if (!username) {
            toastr.error('Username field must not be emtpy!');
            return;
        }
        if (username.length < 5) {
            toastr.error('Username must be at least 5 characters long!');
            return;
        }
        if (!password) {
            toastr.error('Password field must not be emtpy!');
            return;
        }
        if (!repeat) {
            toastr.error('Repeat Password field must not be emtpy!');
            return;
        }

        if (password !== repeat) {
            toastr.error('Passwords must match!');
            return;
        }
        const subscriptions = [];
        register(username, subscriptions, password)
            .then((res) => {
                console.log(res);
                localStorage.setItem('token', res._kmd.authtoken);
                localStorage.setItem('username', res.username);
                localStorage.setItem('userId', res._id);
                localStorage.setItem('subscriptions', JSON.stringify(res.subscriptions));
                toastr.success('Registration successful');
                this.props.history.push('/feed');
            })
    }

    render() {
        return (
            <section id="viewRegister">
                <div className="content">
                    <form onSubmit={this.onSubmitHandler} className="form" id="formRegister">
                        <label>Username</label>
                        <input onChange={this.onChangeHandler} name="username" type="text" />
                        <label>Password</label>
                        <input onChange={this.onChangeHandler} name="password" type="password" />
                        <label>Repeat Password</label>
                        <input onChange={this.onChangeHandler} name="repeat" type="password" />
                        <input id="btnRegister" value="Register" type="submit" />
                        <Link to="/login">Log in</Link>
                    </form>
                </div>
            </section>
        );
    }
}

export default withRouter(RegisterPage);