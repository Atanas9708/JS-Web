import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './../../actions/userActions';
import { bindActionCreators } from 'redux';
import Input from './Input';

class InputWrapper extends Component {
    constructor(props) {
        super(props);

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div>
                <input onChange={this.onChange} id="input" name="input" type="text" />
                <button onClick={() => {
                    if (this.state === null || this.state.input === '') {
                        return;
                    }
                    this.props.actions.addInput({ input: this.state.input });
                    document.getElementById('input').value = '';
                    this.setState({input: ''});
                }}>Add input</button>

                {this.props.appState.user.map(user => {
                    return <Input key={user.index} data={user} func={this.props.actions}/>
                })}
                <br />
                <button onClick={() => {
                    this.props.actions.deleteInput();
                }}>Delete last</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        appState: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputWrapper);