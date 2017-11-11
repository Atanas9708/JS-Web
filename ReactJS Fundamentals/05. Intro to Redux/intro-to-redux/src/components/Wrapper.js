import React, { Component } from 'react';
import Counter from './Counter';
import { connect } from 'react-redux';
import actions from './../actions'

class Wrapper extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.appState.map(counter => {
                    return <Counter key={counter.index} data={counter} func={this.props} />
                })}
                <br />
                <button onClick={() => {
                    this.props.addCounter()
                }}>ADD</button>
                <button onClick={() => {
                    this.props.removeCounter()
                }}>REMOVE</button>
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
      increment: (payload) => dispatch(actions.increment(payload)),
      decrement: (payload) => dispatch(actions.decrement(payload)),
      clear: (payload) => dispatch(actions.clear(payload)),
      addCounter: () => dispatch(actions.addCounter()),
      removeCounter: () => dispatch(actions.removeCounter())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);