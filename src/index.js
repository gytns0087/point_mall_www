import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'; 
import AuthStore from './AuthStore';
import ItemStore from './ItemStore'

const authStore = new AuthStore();
const itemStore = new ItemStore();

ReactDOM.render(
    <Provider authStore={authStore} itemStore={itemStore}>
        <App />
    </Provider>,  
    document.getElementById('root')

);

serviceWorker.unregister();
