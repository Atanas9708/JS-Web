import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';


import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import YearlyBalanceView from './components/Yearly/YearlyBalanceView';
import MonthlyBalanceView from './components/Monthly/MonthlyBalanceView';
import AddExpense from './components/Monthly/AddExpense';
import NotFound from './components/common/NotFound';

import toastr from 'toastr';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        toastr.success('Logout successful');
        this.props.history.push('/');
    }

    render() {
        let loggedIn = localStorage.getItem('token') != null
        return (
            <main>
                <div className="App">
                    <Header loggedIn={loggedIn} onLogout={this.onLogout} />
                    <Switch>
                        {!loggedIn && <Route exact path="/" component={RegisterPage} />}
                        {loggedIn && <Route exact path="/" component={MonthlyBalanceView} />}
                        <Route path="/yearly" component={YearlyBalanceView} />
                        <PrivateRoute path="/monthly/:id" component={MonthlyBalanceView} />
                        <PrivateRoute path="/addexpense/:month" component={AddExpense} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </main>
        );
    }
}

export default withRouter(App);