import axios from 'axios';
import { reaction } from 'mobx'

class HttpService {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authStore = rootStore.authStore;

        this.clientID = '2lsqVZMiImypVhqfgnhs5QucGSQD4qSkETDRmBBa'
        this.refreshSubscribers = [];
        this.isRefreshingToken = false;

        axios.defaults.baseURL = 'http://localhost:8003';
        axios.defaults.headers.common['Authorization'] = this.authStore.authToken;

        reaction(() => this.authStore.authToken, () => {
            axios.defaults.headers.common['Authorization'] = this.authStore.authToken;
        });

        axios.interceptors.response.use(response => {
            return response;
        }, originalError => {
            const { config, response } = originalError;
            const originalRequest = config;
            if (response.status === 401) {
                if (this.authStore.refreshToken == null) {
                    alert('로그인이 필요한 서비스입니다.');
                    this.rootStore.history.push('/login');
                } else {
                    if (!this.isRefreshingToken) {
                        this.isRefreshingToken = true;
                        return new Promise((resolve, reject) => {
                            this.refreshToken().then(token => {
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                resolve(axios(originalRequest));
                                for (let subscriber of this.refreshSubscribers) {
                                    subscriber(token);
                                }
                            }).catch(error => {
                                this.authStore.deleteToken();
                                reject(originalError);
                                alert('로그인이 필요한 서비스입니다.');
                                this.rootStore.history.push('/login');
                                for (let subscriber of this.refreshSubscribers) {
                                    subscriber(null);
                                }
                            }).finally(() => {
                                this.refreshSubscribers = [];
                                this.isRefreshingToken = false;
                            });
                        });
                    }

                    return new Promise((resolve, reject) => {
                        this.refreshSubscribers.push(token => {
                            if (token == null) {
                                reject(originalError);
                            } else {
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                resolve(axios(originalRequest));
                            }
                        });
                    });
                }
            }
            return Promise.reject(originalError);
        });
    }

    getItem(itemId) {
        return axios.get('/items/' + itemId).then(response => {
            return response.data;
        })
    }

    getMe() {   // MyItems의 getMe
        return axios.get('/me/').then(response => {
            return response.data;
        });;
    }



    indexItems() {  // Home.js의 indexItems
        return axios.get('/items/')
            .then(response => {
                return response.data;
            });
    }

    indexMyItems() { // MyItems.js의 indexMyItems
        return axios.get('/me/items/')
            .then(response => {
                return response.data;
            });
    }

    purchaseItem(itemId) {   // ItemDetails.js
        return axios.post('/items/' + itemId + '/purchase/')
            .then(response => {
                return response.data;
            });
    }

    purchaseItems(items) {  // CartItems.js
        return axios.post('/items/purchase/', { items })
            .then(response => {
                return response.data;
            });
    }

    register(username, password) {   // Register.js
        return axios.post('/users/',
            {
                username,
                password
            }
        ).then(response => {
            return response.data;
        })
    }

    login(username, password) {  // Login.js
        return axios.post('/o/token/', {
            grant_type: 'password',
            client_id: this.clientID,
            username,
            password
        }).then(response => {
            const token = response.data;
            this.authStore.setToken(token)
            return response.data;
        })
    }

    refreshToken(username, password) {
        return axios.post('/o/token/', {
            grant_type: 'refresh_token',
            client_id: this.clientID,
            refresh_token: this.authStore.refreshToken
        }).then(response => {
            const token = response.data;
            this.authStore.setToken(token)
            return response.data;
        })
    }

    charge(id, username, password, point) {
        return axios.put('/users/' + id + '/', {
            id,
            username,
            password,
            point
        }
        ).then(response => {
            return response.data;
        })
    }

    indexCategoryItems(categoryId) { // CategoryItems.js의 indexItems
        return axios.get('/categories/' + categoryId + '/items/')  // 파이참 item\views.py의 71번 라인에 있는 함수 호출
            .then(response => {
                return response.data;
            });
    }

    indexCategories() {  // Header.js의 indexCategories
        return axios.get('/categories/')
            .then(response => {
                return response.data;
            })
    }
}

export default HttpService;