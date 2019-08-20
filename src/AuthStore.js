import { observable, action, computed } from 'mobx'
import axios from 'axios'

export default class AuthStore {
    BASE_URL = 'http://localhost:8003';

    @observable authToken = null;
    @observable user = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authToken = localStorage.getItem('auth_token');
        this.user = JSON.parse(localStorage.getItem('auth_user'));
    }

    @action setToken(token) {
        this.authToken = token.token_type + ' ' + token.access_token;
        localStorage.setItem('auth_token', this.authToken);
        localStorage.setItem('refresh_token', token.refresh_token); // 19.08.14
        this.getUser();
    }

    @action deleteToken() {
        this.rootStore.itemStore.clearCartItems();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        this.authToken = null;
        this.user = null;
    }

    getUser() {
        axios.get(
            this.BASE_URL + '/me/',
            {
                headers: {
                    'Authorization': this.authToken
                }
            }
        ).then((response) => {
            this.user = response.data;
            localStorage.setItem('auth_user', JSON.stringify(this.user));
        });

    }

    @computed get isLoggedIn() {
        return this.authToken != null;
    }

    get refreshToken(){ // 19.08.14
        return localStorage.getItem('refresh_token');
    }
}