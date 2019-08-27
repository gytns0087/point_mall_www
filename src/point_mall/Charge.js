import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('authStore', 'httpService')
@observer
class Charge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            point: '',
            user: null,
        };
    }

    componentDidMount() {
        // this.charge();
        this.getMe();
    }

    getMe = () => {
        this.props.httpService.getMe()
            .then(user => {
                this.setState({
                    user
                });
            });
    }

    charge = () => {
        this.props.httpService.charge(
            this.state.user.id,
            this.state.user.username,
            this.state.user.password,
            Number(this.state.point) + Number(this.state.user.point)
        ).then(point => {
            this.setState({
                point
            })
            alert('충전되었습니다.');
            window.location.reload();
        })
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'point') {
            this.setState({
                point: target.value
            });
        }
    }

    render() {
        // const { authStore } = this.props;
        const user = this.state.user;
        const point = user ? user.point : 0
        return (
            <div>
                <div id="container">
                    <h3>현재포인트 : {point} P</h3>
                    <p>
                        <label>충전할 포인트</label>
                        <input type="number"
                            name="point"
                            onChange={this.onInputChanged} />
                    </p>
                    <button onClick={this.charge} onChange={this.onInputChanged}>충전하기</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Charge);