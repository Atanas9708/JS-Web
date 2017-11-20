import React from 'react';
import ReactDOM from 'react-dom';
import './style/bootstrap.min.css';
import './style/site.css';
import App from './App';
import '../node_modules/toastr/build/toastr.min.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render((
    <Router>
        <App />
    </Router>), document.getElementById('root'));
registerServiceWorker();
