import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    render() {
        const { onLogout } = this.props;
        return (
            <div className="menu">
                <NavLink activeClassName="active" to="/feed">Home</NavLink>
                <NavLink activeClassName="active" to="/discover">Discover</NavLink>
                <NavLink activeClassName="active" to="/me">Me</NavLink>
                <a onClick={onLogout} href="javascript:void(0)">Logout</a>
            </div>
        )
    }
}

export default Menu;