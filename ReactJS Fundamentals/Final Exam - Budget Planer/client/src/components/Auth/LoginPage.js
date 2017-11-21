import React, { Component } from 'react';
import Input from '../common/Input';
import { login } from '../../api/remote';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: false,
            password: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        if(!this.state.password && !this.state.email) {
            toastr.error('Enter a valid email and password');
            return;
        }
        if(!this.state.email) {
            toastr.error('Enter a valid email');
            return;
        }
        if(!this.state.password) {
            toastr.error('Enter a valid password');
            return;
        }

        login(this.state.email, this.state.password)
        .then((res) => {
            if (res.success) {
                const currentMonth = (new Date()).getMonth() + 1
                localStorage.setItem('token', res.token);
                localStorage.setItem('name', res.user.name);
                toastr.success('Login successful!');
                this.props.history.push(`/monthly/${currentMonth}`);
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Login</h1>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="email">E-mail</label>
                                <input onChange={this.onChangeHandler} name="email" className="form-control" id="email" type="text" />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="password">Password</label>
                                <input onChange={this.onChangeHandler} name="password" className="form-control" id="password" type="password" />
                            </div>
                            <input type="submit" className="btn btn-secondary" value="Login" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginPage);