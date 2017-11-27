import React, { Component } from 'react';
import { deleteExpense } from './../../api/remote';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class ExpenseCard extends Component {
    render() {
        const { name, category, amount, date, id } = this.props;
        return (
            <tr>
                <td>{name}</td>
                <td>{category}</td>
                <td>{amount}</td>
                <td>{date}</td>
                <td>
                    <a onClick={() => {
                        deleteExpense(id)
                        .then((res => {
                            console.log(res);
                            toastr.success('Expense deleted successfully!');
                            this.props.history.push('/yearly');
                        }))
                    }} href="javascript:void(0)" className="btn btn-secondary">Delete</a>
                </td>
            </tr>
        )
    }
}

export default withRouter(ExpenseCard);