import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header>
                <nav class="navbar navbar-dark bg-secondary">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                {loggedIn && <NavLink class="nav-link" exact to="/monthly">Monthly Balance</NavLink>}
                                {loggedIn && <NavLink class="nav-link"  to="/yearly">Yearly Balance</NavLink>}
                                {loggedIn &&<a onClick={onLogout} href="javascript:void(0)" class="nav-link">Logout</a>}
                                {!loggedIn &&<NavLink class="nav-link" to="/login">Login</NavLink>}
                                {!loggedIn &&<NavLink class="nav-link" to="/register">Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}