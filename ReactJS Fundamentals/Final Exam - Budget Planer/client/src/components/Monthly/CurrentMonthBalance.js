import React, { Component } from 'react';
import ExpenseList from './ExpenseList';
import { Link } from 'react-router-dom';
import { updateIncomeAndBudger } from './../../api/remote';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class MonthlyBalanceView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            income: 0,
            budget: 0
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    update() {
        const year = (new Date()).getFullYear();
        const month = this.props.match.params.id || (new Date()).getMonth() + 1;
        const update = {
            income: Number(this.state.income),
            budget: Number(this.state.budget)
        };
        updateIncomeAndBudger(year, month, update)
        .then((res => {
            console.log(res);
            toastr.success('Income and Budget are updated!');
            this.props.history.push('/yearly');
        }))
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.update();
    }
    

    render() {
        const month = (new Date().getMonth() + 1);
        const year = (new Date()).getFullYear();
        const monthName = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        };

        return (
            <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Welcome to Budget Planner</h1>
                </div>
            </div>
            <div class="row space-top ">
                <div class="col-md-12 ">
                    <div class="card bg-secondary">
                        <div class="card-body">
                            <blockquote class="card-blockquote">
                                <h2 id="month">{monthName[month]} {year}</h2>
                                <div class="row">
                                    <div class="col-md-3 space-top">
                                        <h4>Planner</h4>
                                        <form onSubmit={this.onSubmitHandler}>
                                            <div class="form-group">
                                                <label class="form-control-label" for="income">Income:</label>
                                                <input onChange={this.onChangeHandler} class="form-control" value={this.state.income} name="income" type="number" />
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label" for="budget">Budget:</label>
                                                <input onChange={this.onChangeHandler} class="form-control" value={this.state.budget} name="budget" type="number" />
                                            </div>
                                            <input type="submit" class="btn btn-secondary" value="Save" />
                                        </form>
                                    </div>
                                    <div class="col-md-8 space-top">
                                        <div class="row">
                                            <h4 class="col-md-9">Expenses</h4>
                                            <Link to={`/addexpense/${month}`} class="btn btn-secondary ml-2 mb-2">Add expenses</Link>
                                        </div>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Category</th>
                                                    <th>Cost</th>
                                                    <th>Payment Date</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <ExpenseList month={month}/>
                                        </table>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(MonthlyBalanceView);