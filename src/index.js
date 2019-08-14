import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import RootStore from './RootStore';
import { Router } from 'react-router-dom'

const rootStore = new RootStore();

ReactDOM.render(
    <Router history={rootStore.history}>
        <Provider
            authStore={rootStore.authStore}
            itemStore={rootStore.itemStore}
            httpService={rootStore.httpService}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')

);

serviceWorker.unregister();
