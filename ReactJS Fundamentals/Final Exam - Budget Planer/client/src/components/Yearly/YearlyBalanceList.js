import React, { Component } from 'react';
import YearlyBalanceCard from './YearlyBalanceCard';
import { listYearlyBalance } from './../../api/remote';

class YearlyBalanceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: {},
            year: 0
        }
    }

    loadBalance() {
        const year = (new Date()).getFullYear();
        listYearlyBalance(year)
            .then((balance) => {
                this.setState({ balance, year });
            })
    }

    componentDidMount() {
        this.loadBalance();
    }

    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Yearly Balance</h1>
                    </div>
                </div>
                <div className="row space-top col-md-12">
                    {Object.entries(this.state.balance).map(balance => {
                        let budget = 0;
                        let b = 0;
                        for (let year in balance) {
                            budget = balance[year].budget;
                            b = balance[year].balance;
                        }
                        for (let month of balance) {
                            return <YearlyBalanceCard 
                                key={month}
                                month={month}
                                year={this.state.year}
                                budget={budget}
                                balance={b}
                            
                            />
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default YearlyBalanceList;