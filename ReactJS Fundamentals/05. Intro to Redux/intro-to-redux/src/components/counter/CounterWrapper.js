import React, { Component } from 'react';
import Counter from './Counter';
import { connect } from 'react-redux';
import actions from './../../actions/counterActions';
import { bindActionCreators } from 'redux';

class Wrapper extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.appState.counter.map(counter => {
                    return <Counter key={counter.index} data={counter} func={this.props.actions} />
                })}
                <br />
                <button onClick={() => {
                    this.props.actions.addCounter()
                }}>ADD</button>
                <button onClick={() => {
                    this.props.actions.removeCounter()
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
      actions: bindActionCreators(actions, dispatch)  
    //   increment: (payload) => dispatch(actions.increment(payload)),
    //   decrement: (payload) => dispatch(actions.decrement(payload)),
    //   clear: (payload) => dispatch(actions.clear(payload)),
    //   addCounter: () => dispatch(actions.addCounter()),
    //   removeCounter: () => dispatch(actions.removeCounter())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);