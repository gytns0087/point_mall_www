import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { inject } from 'mobx-react'
import DataHelper from '../DataHelper';

@inject('authStore')
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'username') {
            this.setState({
                username: target.value
            });
        } else if (target.name === 'password') {
            this.setState({
                password: target.value
            });
        }
    }

    login = () => {
        axios.post(
            DataHelper.baseURL()+ '/o/token/',
            {
                grant_type: 'password',
                client_id: '2lsqVZMiImypVhqfgnhs5QucGSQD4qSkETDRmBBa',
                username: this.state.username,
                password: this.state.password
            }
            ).then((response) => {
                const token = response.data;
                const { authStore, history } = this.props;
                authStore.setToken(token);
                alert(this.state.username + '님 환영합니다.');
                history.push('/');
            });
    }

    enterkey = () => {
        if (window.event.keyCode === 13) {
            this.login();
        }
    }

    render() {
        return (
            <div>
                <div id="container">
                    <p>
                        <label>아이디</label>
                        <input type="text"
                            value={this.state.username}
                            onChange={this.onInputChanged}
                            name="username"/>
                    </p>
                    <p>
                        <label>비밀번호</label>
                        <input type="password"
                            onKeyUp={this.enterkey}
                            value={this.state.password}
                            onChange={this.onInputChanged}
                            name="password"/>
                    </p>
                    <button onClick={this.login}>로그인</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
