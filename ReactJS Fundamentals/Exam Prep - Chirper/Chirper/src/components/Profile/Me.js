import React, { Component } from 'react';
import {
    listUserChirps,
    countChirps,
    countFollowers,
    countFollowing,
    createChirp,
    deleteChirp,
    calcTime
} from './../../api/remote';
import ChirpCard from './../Chirps/ChirpCard';
import UserStats from './../common/UserStats';
import toastr from 'toastr';

class Me extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userChirps: [],
            chirpsCount: 0,
            followingCount: 0,
            followersCount: 0
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    loadChirps() {
        const username = localStorage.getItem('username');
        listUserChirps(username)
            .then((userChirps) => {
                this.setState({ userChirps });
            })
    }

    loadStats() {
        const username = localStorage.getItem('username');
        const countChirpsP = countChirps(username);
        const countFollowersP = countFollowers(username);

        Promise.all([countChirpsP, countFollowersP])
            .then((res) => {
                let following = JSON.parse(localStorage.getItem('subscriptions')).length;
                console.log(following);
                this.setState({
                    chirpsCount: res[0].length,
                    followersCount: res[1].length,
                    followingCount: following
                })
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const chirp = {
            text: this.state.text,
            author: localStorage.getItem('username')
        };
        if (chirp.text === '' || chirp.text === undefined || chirp.text === null ){
            toastr.error('Chirps cannot be empty!');
            return;
        }
        createChirp(chirp).then((res) => {
            document.getElementById('text').value = '';
            let chirps = this.state.userChirps.slice();
            chirps.push(res);
            this.setState({ text: '', userChirps: chirps, chirpsCount: this.state.chirpsCount + 1 });
            toastr.success('Chirp created successfully!');
        })
    }

    componentDidMount() {
        this.loadStats();
        this.loadChirps();
    }


    render() {
        let main = null;
        if (this.state.userChirps.length > 0) {
            main = (
                <div id="chirps" className="chirps">
                    <h2 className="titlebar">Chirps</h2>
                    {this.state.userChirps.map((c, i) => (
                        <article className="chirp">
                            <div className="titlebar">
                                <a href="#" className="chirp-author">{c.author}</a>
                                <span className="chirp-time">{calcTime(c._kmd.ect)} ago</span>
                                <span className="chirp-time">
                                    <a onClick={() => {
                                        let chirpToDelete = this.state.userChirps.filter(c => c._id === c._id)[0];
                                        let newChirps = this.state.userChirps.slice();
                                        let index = newChirps.indexOf(chirpToDelete);
                                        newChirps.splice(index, 1);
                                        deleteChirp(c._id)
                                            .then(() => {
                                                this.setState({
                                                    userChirps: newChirps,
                                                    chirpsCount: this.state.chirpsCount - 1
                                                });
                                                this.loadChirps();
                                                toastr.success('Chirp deleted successfully!');
                                            });
                                    }} href="javascript:void(0)" >Delete</a>
                                </span>
                            </div>
                            <p>{c.text}</p>
                        </article>
                    ))}
                </div>
            )
        } else {
            main = (
                <div id="myChirps" className="chirps">
                    <h2 className="titlebar">Chirps</h2>
                    <div className="chirp"><span className="loading">No chirps in database</span></div>
                </div>
            )
        }

        const username = localStorage.getItem('username');
        const { chirpsCount, followingCount, followersCount } = this.state;

        return (
            <div className="content">
                <div className="chirper">

                    <h2 className="titlebar">{username}</h2>

                    <form onSubmit={this.onSubmit} id="formSubmitChirp" className="chirp-form">
                        <textarea onChange={this.onChange} name="text" id="text" className="chirp-input"></textarea>
                        <input className="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit" />
                    </form>
                    <UserStats
                        chirps={chirpsCount}
                        following={followingCount}
                        followers={followersCount}
                    />
                </div>
                {main}
            </div>
        )
    }
}

export default Me;