import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            val: this.props.data.value,
            clicked: false
        }
    }

    onChange = (e) => {
        this.setState({ val: e.target.value });
    }

    render() {
        if (!this.state.clicked) {
            return (
                <div>
                    <input disabled="true" id="edit" type="text" value={this.props.data.value} />
                    <button style={{ background: 'green', color: 'white' }} onClick={() => {
                        this.setState({ clicked: true })
                    }}>Edit input</button>
                </div>
            )
        } else {
            return (
                <div>
                    <input onChange={this.onChange} id="edit" type="text" value={this.state.val} />
                    <button style={{ background: 'green', color: 'white', width: 36.5 }} onClick={() => {
                        this.props.func.editInput({ index: this.props.data.index, input: this.state.val });
                        this.setState({ clicked: false });
                    }}>&#10004;
                    </button>
                    <button style={{ width: 36.5 }} onClick={() => {
                        this.setState({ clicked: false });
                    }}>&#10006;
                    </button>
                </div>

            )
        }
    }
}

export default Input;