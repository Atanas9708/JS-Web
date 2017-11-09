import React from 'react';
import { Link } from 'react-router-dom';
let Header = (props) => {
    return (
        <header>
            <span className="logo">☃</span><span className="header">SeenIt</span>
            <div
                id="profile"><span>{props.name}</span>|<Link onClick={() => {
                    localStorage.clear();
                    window.location.replace('/');
                    }} to="/logout">logout</Link>
            </div>
        </header>
    );
}

export default Header;