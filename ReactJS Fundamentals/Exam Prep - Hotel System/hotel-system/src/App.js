import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Common/Header';
import HomePage from './components/Home/HomePage';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import CreatePage from './components/Create/CreatePage';
import DetailsPage from './components/Details/DetailsPage';
import NotFound from './components/Common/NotFound';
import PrivateRoute from './components/Common/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header loggedIn={localStorage.getItem('token') !== null} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/view/:page" component={HomePage} />
          <PrivateRoute path="/create" component={CreatePage} />
          <PrivateRoute  path="/details/:id" component={DetailsPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
