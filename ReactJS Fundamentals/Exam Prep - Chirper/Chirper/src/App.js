import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Menu from './components/common/Menu';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import Feed from './components/Chirps/Feed';
import Me from './components/Profile/Me';
import DiscoverPage from './components/Discover/DiscoverPage';
import ProfilePage from './components/Profile/ProfilePage';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        const loggedIn = localStorage.getItem('token') !== null;
        return (
            <div className="App">
                <main>
                    <Header />
                    {loggedIn && <Menu onLogout={this.onLogout} />}
                    <Switch>
                        {!loggedIn && <Route exact path="/" component={RegisterPage} />}
                        {loggedIn && <Route exact path="/" component={Feed} />}
                        <Route path="/feed" component={Feed} />
                        <Route path="/me" component={Me} />
                        <Route path="/discover" component={DiscoverPage} />
                        <Route path="/profile/:id" component={ProfilePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </Switch>
                    <Footer />
                </main>
            </div>
        );
    }
}

export default withRouter(App);