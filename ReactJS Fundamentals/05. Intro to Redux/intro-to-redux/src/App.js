import React, { Component } from 'react';
import './App.css';
import CounterWrapper from './components/counter/CounterWrapper';
import InputWrapper from './components/input/InputWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CounterWrapper />
        <br />
        <InputWrapper />
      </div>
    );
  }
}


export default App;
