import React, { Component } from 'react';
import { discoverUsers, countFollowers, countChirps } from './../../api/remote';
import User from './User';

class DiscoverPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    loadUsers() {
        discoverUsers()
            .then((users) => {
                this.setState({ users });
            })
    }

    componentDidMount() {
        this.loadUsers();
    }

    render() {
        const username = localStorage.getItem('username');

        return (
            <section id="viewDiscover">
                <div className="content">
                    <div className="chirps">
                        <h2 className="titlebar">Discover</h2>
                        <div id="userlist">
                            {this.state.users.filter(u => u.username !== username).map(user => {
                                user.followers = this.state.users.filter(u => u.subscriptions.includes(user.username)).length;

                                return <User
                                    key={user._id}
                                    user={user.username}
                                    userId={user._id}
                                    followersCount={user.followers}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default DiscoverPage;