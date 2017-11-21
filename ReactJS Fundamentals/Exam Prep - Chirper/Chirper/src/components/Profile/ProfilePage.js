import React, { Component } from 'react';
import UserStats from '../common/UserStats';
import ChirpList from './../Chirps/ChirpList';
import ChirpCard from './../Chirps/ChirpCard';
import { countChirps, countFollowers, countFollowing, getUserById, followUser, listUserChirps, modifySubs } from './../../api/remote';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            chirps: [],
            chirpsCount: 0,
            followingCount: 0,
            followersCount: 0,
            text: 'Follow'
        }
    }

    loadStats(username) {
        let chirpsP = countChirps(username);
        let followingP = countFollowing(username);
        let followersP = countFollowers(username);

        Promise.all([chirpsP, followingP, followersP])
            .then((res) => {
                let following = res[2].filter(x => x.username !== username).length;
                this.setState({
                    chirpsCount: res[0].length,
                    followersCount: res[1].length,
                    followersCount: following
                });
            })
    }

    loadData() {
        const userId = this.props.match.params.id;
        getUserById(userId)
            .then((res) => {
                this.setState({ user: res.username });
                this.loadStats(res.username);
            });
    }

    loadChirps() {
        const userId = this.props.match.params.id;
        getUserById(userId)
            .then((res) => {
                const username = res.username;
                listUserChirps(username).then(chirps => {
                    this.setState({ chirps });
                })
            });
    }

    componentDidMount() {
        this.loadData();
        this.loadChirps();
    }

    render() {
        const user = this.state.user;
        const userId = localStorage.getItem('userId');
        let text;

        if (JSON.parse(localStorage.getItem('subscriptions')).includes(this.state.user)) {
            text = 'Unfollow';
        } else {
            text = 'Follow';
        }

        return (
            <div className="content">
                <div className="chirper">
                    <h2 className="titlebar">{this.state.user}</h2>
                    <a onClick={() => {
                        let arr = JSON.parse(localStorage.getItem('subscriptions')).splice(0);
                        let newArr = modifySubs(arr, user);

                        followUser(userId, newArr).then((res) => {
                            localStorage.setItem('subscriptions', JSON.stringify(newArr));
                            this.setState({ text });
                            if (this.state.text === 'Follow') {
                                this.setState({followersCount: this.state.followersCount + 1});
                                toastr.success(`Subscribed to ${user}!`);
                            } else {
                                this.setState({followersCount: this.state.followersCount - 1});
                                toastr.success(`Unsubscribed from ${user}!`);
                            }
                            
                        });
                    }} id="btnFollow" className="chirp-author" href="javascript:void(0)">{text}</a>

                    <UserStats
                        chirps={this.state.chirpsCount}
                        following={this.state.followingCount}
                        followers={this.state.followersCount}
                    />
                </div>
                {this.state.chirps.length > 0 ?
                    <div id="chirps" className="chirps">
                        <h2 className="titlebar">Chirps</h2>
                        {this.state.chirps.map((c, i) => (
                            <ChirpCard
                                key={i}
                                time={c._kmd.ect}
                                author={c.author}
                                text={c.text}
                            />
                        ))}
                    </div>
                    : <div id="myChirps" className="chirps">
                        <h2 className="titlebar">Chirps</h2>
                        <div className="chirp"><span className="loading">No chirps in database</span></div>
                    </div>}
            </div>
        )
    }
}

export default ProfilePage;