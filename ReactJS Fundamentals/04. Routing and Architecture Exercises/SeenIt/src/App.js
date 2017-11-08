import React, { Component } from 'react';
import './App.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import GuestHome from './components/auth/GuestHome';
import Menu from './components/common/Menu';
import Routes from './components/common/Routes';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: ''
    }
  }

  componentDidMount() {
    let authtoken = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    if (authtoken !== '' && authtoken !== null) {
      this.setState({ token: authtoken, username: username });
    }
  }

  render() {
    return (
        <div>
          {this.state.username !== '' ? <Header name={this.state.username} /> : null}
          {this.state.token === '' ? <GuestHome /> :
            <div>
              <Menu />
              <Routes />
            </div>
          }
          <Footer />
        </div>
    );
  }
}

export default App;
