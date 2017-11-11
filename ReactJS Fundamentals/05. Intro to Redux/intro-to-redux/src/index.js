import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import counter from './reducers/counterReducer';
import user from './reducers/userReducer';

const store = createStore(combineReducers({
    counter,
    user
}));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();





