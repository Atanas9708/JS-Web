import React, { Component } from 'react';
import { calcTime, listUserChirps, deleteChirp } from './../../api/remote';

class ChirpCard extends Component {

    render() {
        const { author, time, text, id, chirps } = this.props;

        return (
            <article className="chirp">
                <div className="titlebar">
                    <a href="#" className="chirp-author">{author}</a>
                    <span className="chirp-time">{calcTime(time)} ago</span>
                </div>
                <p>{text}</p>
            </article>
        )
    }
}

export default ChirpCard;