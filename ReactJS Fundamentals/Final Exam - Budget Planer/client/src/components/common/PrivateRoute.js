import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

export default class PrivateRoute extends Component {
    render() {
        if (localStorage.getItem('token') === null) {
            return <Redirect to="/login" />;
        };

        return (
            <Route {...this.props}>
                this.props.children
            </Route>
        );
    }
}