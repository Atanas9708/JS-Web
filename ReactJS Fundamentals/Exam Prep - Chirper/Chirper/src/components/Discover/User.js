import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
    render() {
        const { user, userId, followersCount } = this.props;

        return (
            <div className="userbox">
                <div><Link to={`/profile/${userId}`} className="chirp-author">{user}</Link></div>

                <div className="user-details">
                    <span>{followersCount} followers</span>
                </div>
            </div>
        )
    }
}

export default User;