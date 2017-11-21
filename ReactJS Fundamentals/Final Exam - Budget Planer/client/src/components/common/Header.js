import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const currentMonth = (new Date().getMonth() + 1);

        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {loggedIn && <NavLink className="nav-link" exact to={`/monthly/${currentMonth}`}>Monthly Balance</NavLink>}
                                {loggedIn && <NavLink className="nav-link"  to="/yearly">Yearly Balance</NavLink>}
                                {loggedIn &&<a onClick={onLogout} href="javascript:void(0)" className="nav-link">Logout</a>}
                                {!loggedIn &&<NavLink className="nav-link" to="/login">Login</NavLink>}
                                {!loggedIn &&<NavLink className="nav-link" to="/register">Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}