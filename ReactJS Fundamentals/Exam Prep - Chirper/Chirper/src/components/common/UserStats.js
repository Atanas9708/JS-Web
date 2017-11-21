import React, { Component } from 'react';

export default class PostChirp extends Component {
    render() {
        const { chirps, following, followers } = this.props;
        return (
            <div id="userStats" className="user-details">
                <span>{chirps} chirps</span> | <span>{following} following</span> | <span>{followers} followers</span>
            </div>
        )
    }
}
