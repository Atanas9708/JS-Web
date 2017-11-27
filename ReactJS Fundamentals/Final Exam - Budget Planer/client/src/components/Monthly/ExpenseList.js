import React, { Component } from 'react';
import { getMonthlyBalance } from './../../api/remote';
import ExpenseCard from './ExpenseCard';

class ExpenseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expense: {},
            month: this.props.month
        }
    }

    loadExpense() {
        const year = (new Date()).getFullYear();
        let { month } = this.props;
        getMonthlyBalance(year, month)
            .then((expense) => {
                this.setState({ expense });
            })
    }

    componentWillMount() {
        this.loadExpense();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({month: nextProps.month});
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.month !== prevState.month) {
            this.loadExpense();
        }
    }

    render() {
        let expenses = [];
        Object.entries(this.state.expense).map(expense => {
            for (let item of expense) {
                if (typeof item === 'object') {
                    if (item.length > 0) {
                        item.map(e => (
                            expenses.push(e)
                        ))
                    }
                }
            }
        })

        return (
            <tbody>
                {expenses.map(e => {
                    return <ExpenseCard
                        key={e.id}
                        id={e.id}
                        name={e.name}
                        category={e.category}
                        amount={Number(e.amount)}
                        date={e.date}
                    />
                })}
            </tbody>
        )
    }
}

export default ExpenseList;