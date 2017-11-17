import React, { Component } from 'react';
import Input from './../Common/Input';
import { register } from './../../api/remote';
import { withRouter } from 'react-router-dom';

class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: '',
            error: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.email === '' || this.state.name === '' || 
            this.state.password === '' || this.state.repeat === '') {
            this.setState({
                error: {
                    message: 'Check the form for error',
                    errors: {
                        repeat: 'Fields cannot be empty!'
                    }
                }
            });

            return;
        }
        if (this.state.password !== this.state.repeat) {
            this.setState({
                error: {
                    message: 'Check the form for error',
                    errors: {
                        repeat: 'Passwords do not match!'
                    }
                }
            });

            return;
        }

        register(this.state.name, this.state.email, this.state.password)
            .then(res => {
                if (!res.success) {
                    this.setState({ error: res });
                    return;
                }
            })

        this.props.history.push('/login');
    }


    render() {

        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(e => {
                        return <p key={e}>{this.state.error.errors[e]}</p>;
                    })}
                </div>
            );
        }

        return (
            <div className="container">
                <h1>Register</h1>
                {errors}
                <form onSubmit={this.onSubmit}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        label="Name"
                    />
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        label="Password"
                    />
                    <Input
                        name="repeat"
                        type="password"
                        value={this.state.repeat}
                        onChange={this.onChange}
                        label="Repeat Password"
                    />
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
            </div>
        )
    }
}

export default withRouter(RegisterPage);