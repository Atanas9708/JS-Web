import React, { Component } from 'react';

class Counter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.data.value}</h1>
                <button onClick={() => {
                    this.props.func.increment({ index: this.props.data.index, step: 1 })
                }}>+</button>
                <button onClick={() => {
                    this.props.func.decrement({ index: this.props.data.index, step: 1 })
                }}>-</button>
                <button onClick={() => {
                    this.props.func.clear({ index: this.props.data.index })
                }}>clear</button>
            </div>
        )
    }
}

export default Counter;