import ReactDOM from 'react-dom';
import './index.css';
import makeApp from './app/app';


function clickHandler(id) {
    const app = makeApp(clickHandler, id);
    ReactDOM.render(app, document.getElementById('root'));
}

clickHandler(0);