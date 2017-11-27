import React, { Component } from 'react';
import { addExpense } from './../../api/remote';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class AddExpense extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: 'Non-essential',
            cost: 0,
            paymentDate: 0
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const year = (new Date()).getFullYear();
        const month = this.props.match.params.month || (new Date()).getMonth() + 1;
        const expense = {
            date: Number(this.state.paymentDate),
            name: this.state.name,
            category: this.state.category,
            amount: Number(this.state.cost)
        };
        if (expense.amount < 0) {
            toastr.error('The cost of the expense must be a positive number!');
            return;
        }
        if (expense.date < 1 || expense.date > 31) {
            toastr.error('The date of the expense must be a number between 1 and 31!');
            return;
        }
        addExpense(year, month, expense)
        .then((res) => {
            toastr.success('Expense added successfully!');
            this.props.history.push(`/monthly/${month}`);
        })
    }

    render() {
        const year = (new Date()).getFullYear();
        const month = this.props.match.params.month || (new Date()).getMonth() + 1;
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
            <div className="container">
            <div className="row space-top">
                <div className="col-md-12">
                    <h1>Add Expenses</h1>
                    <h3>{monthName[month]} {year}</h3>
                </div>
            </div>
            <div className="row space-top">
                <div className="col-md-10">
                    <form onSubmit={this.onSubmitHandler}>
                        <legend>Add a new expense</legend>
                        <div className="form-group">
                            <label className="col-md-2" htmlFor="name">Name:</label>
                            <input onChange={this.onChangeHandler} className="col-md-2" name="name" type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2" htmlFor="category">Category:</label>
                            <select onChange={this.onChangeHandler} value={this.state.category} className="col-md-2 pl-2" name="category">
                                <option>Non-essential</option>
                                <option>Fixed</option>
                                <option>Variable</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2" htmlFor="cost">Cost:</label>
                            <input onChange={this.onChangeHandler} className="col-md-2" name="cost" type="number"/>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2" htmlFor="paymentDate">Payment Date:</label>
                            <input onChange={this.onChangeHandler} className="col-md-2" name="paymentDate" type="number"/>
                        </div>
                        <input type="submit" className="btn btn-secondary" value="Add"/>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(AddExpense);