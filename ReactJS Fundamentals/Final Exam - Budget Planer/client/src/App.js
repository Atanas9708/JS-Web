import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';


import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import YearlyBalanceView from './components/Yearly/YearlyBalanceView';
import MonthlyBalanceView from './components/Monthly/MonthlyBalanceView';
import CurrentMonthBalance from './components/Monthly/CurrentMonthBalance';
import AddExpense from './components/Monthly/AddExpense';

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
                        <PrivateRoute path="/monthly" component={CurrentMonthBalance} />
                        <PrivateRoute path="/monthlyDetails/:id" component={MonthlyBalanceView} />
                        <Route path="/addexpense/:month" component={AddExpense} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </Switch>
                </div>
            </main>
        );
    }
}

export default withRouter(App);