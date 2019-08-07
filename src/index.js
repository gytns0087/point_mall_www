import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'; 
import RootStore from './RootStore';

const rootStore = new RootStore();

ReactDOM.render(
    <Provider authStore={rootStore.authStore} itemStore={rootStore.itemStore}>
        <App />
    </Provider>,  
    document.getElementById('root')

);

serviceWorker.unregister();
