import React, { Component } from 'react';
import Input from './../Common/Input';
import { login } from './../../api/remote';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        login(this.state.email, this.state.password)
            .then((res) => {
                if (!res.success) {
                    this.setState({ error: res });
                    return;
                } 
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', res.user.name);
                this.props.history.push('/');
            })
    }


    render() {
        return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <Input
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        label="Password"
                    />
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        )
    }
}

export default withRouter(LoginPage);