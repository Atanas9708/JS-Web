import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class YearlyBalanceCard extends Component {
    constructor(props) {
        super(props);

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { year, month, budget, balance } = this.props;
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
            <div class="col-md-3">
                <div class="card text-white bg-secondary">
                    <div class="card-body">
                        <blockquote class="card-blockquote">
                            <h2>{monthName[Number(month)]}</h2>
                            <h4>Year {year}</h4>
                            <label for="budget">Budget:</label>
                            <input onChange={this.onChangeHandler} class="col-md-9" value={budget} disabled="true" name="budget" disabled="" />
                            <label for="balance">Balance:</label>
                            <input onChange={this.onChangeHandler} class="col-md-9" value={balance}disabled="true" name="balance" disabled="" />
                            <div class="space-top">
                                <Link to={`/monthlyDetails/${month}`}class="btn btn-secondary">Details</Link>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        )
    }
}

export default YearlyBalanceCard;