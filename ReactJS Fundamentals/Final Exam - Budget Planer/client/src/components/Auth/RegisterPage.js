import React, { Component } from 'react';
import Input from '../common/Input';
import { register } from '../../api/remote';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: false,
            email: false,
            password: '',
            repeat: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        if (!this.state.email) {
            toastr.error('Fill the Email field');
            return;
        }
        if (!this.state.username) {
            toastr.error('Fill the Username field');
            return;
        }
        if (this.state.password !== this.state.repeat) {
            toastr.error('Passwod should match!');
            return;
        }
        if (this.state.password.length < 4) {
            toastr.error('Password must be at least 4 characters long.');
            return;
        }
        register(this.state.username, this.state.email, this.state.password)
        .then((res) => {
            toastr.success('Registration successful!');
            this.props.history.push('/login');
        })
    }

    render() {
        return (
            <div className="container">
            <div className="row space-top">
                <div className="col-md-12">
                    <h1>Register</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form onSubmit={this.onSubmitHandler}>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="form-control-label " htmlFor="new-username">Username</label>
                            <input onChange={this.onChangeHandler} name="username" className="form-control" id="new-username" type="text"/>
                        </div>
                        <div className="form-group has-success">
                            <label className="form-control-label" htmlFor="new-email">E-mail</label>
                            <input onChange={this.onChangeHandler} name="email" className="form-control is-valid" id="new-email" type="text"/>
                            <div className="form-control-feedback">This input value is valid</div>
                        </div>
                        <div className="form-group has-danger">
                            <label className="form-control-label" htmlFor="new-password">Password</label>
                            <input onChange={this.onChangeHandler} name="password" className="form-control" id="new-password" type="password"/>
                            {/* <div className="form-control-feedback">This input value is invalid</div> */}
                        </div>
                        <div className="form-group has-danger">
                            <label className="form-control-label" htmlFor="new-repeat-password">Repeat password</label>
                            <input onChange={this.onChangeHandler} name="repeat" className="form-control" id="new-repeat-password" type="password"/>
                            {/* <div className="form-control-feedback">This input value is invalid</div> */}
                        </div>
                        <input type="submit" className="btn btn-secondary" value="Register"/>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}

export default withRouter(RegisterPage);