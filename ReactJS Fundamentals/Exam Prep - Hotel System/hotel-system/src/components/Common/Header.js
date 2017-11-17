import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        localStorage.clear();
        this.props.history.push("/");
    }


    render() {
        const { loggedIn } = this.props;
        return (
            <header>
                <span>Hotel System</span>
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                {loggedIn && <NavLink to="/create" activeClassName="active">Create Hotel</NavLink>}
                {loggedIn && <a onClick={this.logOut} href="javascript:void(0)">Logout</a>}
                {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
                {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
            </header>
        )
    }
}

export default withRouter(Header);