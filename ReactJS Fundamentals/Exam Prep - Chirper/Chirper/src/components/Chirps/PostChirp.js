import React, { Component } from 'react';
import UserStats from './../common/UserStats';
import { withRouter } from 'react-router-dom';
import { countChirps, countFollowers, countFollowing, createChirp } from './../../api/remote';
import toastr from 'toastr';

class PostChirp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
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

    loadStats() {
        const username = localStorage.getItem('username');
        const countChirpsP = countChirps(username);
        const countFollowersP = countFollowers(username);

        Promise.all([countChirpsP, countFollowersP])
            .then((res) => {
                let following = JSON.parse(localStorage.getItem('subscriptions')).length;
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
            this.setState({ text: '' });
            toastr.success('Chirp created successfully!');
            this.props.history.push('/me');
        })
    }

    componentDidMount() {
        this.loadStats();
    }

    render() {
        const username = localStorage.getItem('username');
        const { chirpsCount, followingCount, followersCount } = this.state;
        return (
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
        )
    }
}

export default withRouter(PostChirp);