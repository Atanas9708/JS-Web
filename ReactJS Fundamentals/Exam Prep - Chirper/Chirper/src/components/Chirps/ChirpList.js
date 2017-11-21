import React, { Component } from 'react';
import { listUserFeed } from './../../api/remote';
import ChirpCard from './ChirpCard';

class ChirpList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chirps: []
        }
    }

    loadChirps() {
        let subs = JSON.parse(localStorage.getItem('subscriptions'));
        listUserFeed(subs)
            .then((chirps) => {
                console.log(chirps);
                this.setState({ chirps });
            })
    }

    componentDidMount() {
        this.loadChirps();
    }

    componentWillReceiveProps() {
        this.loadChirps();
    }

    render() {
        if (this.state.chirps.length > 0) {
            return (
                <div id="chirps" className="chirps">
                <h2 className="titlebar">Chirps</h2>
                    {this.state.chirps.map((c, i) => {
                       return <ChirpCard
                            key={i}
                            time={c._kmd.ect}
                            author={c.author}
                            text={c.text}
                        />
                    })}
                </div>
            )
        }

        return (
            <div id="myChirps" className="chirps">
                <h2 className="titlebar">Chirps</h2>
                <div className="chirp"><span className="loading">No chirps in database</span></div>
            </div>
        )
    }
}

export default ChirpList;