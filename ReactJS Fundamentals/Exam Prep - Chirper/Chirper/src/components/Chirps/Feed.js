import React, { Component } from 'react';
import PostChirp from './PostChirp';
import ChirpList from './ChirpList';

export default class Feed extends Component {
    render() {
        return (
            <div className="content">
                <PostChirp />
                <ChirpList />
            </div>
        );
    }
}