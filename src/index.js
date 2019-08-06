import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'; 
import AuthStore from './AuthStore';

const authStore = new AuthStore();

ReactDOM.render(
    <Provider authStore={authStore}>
        <App />
    </Provider>,  
    document.getElementById('root')

);

serviceWorker.unregister();
