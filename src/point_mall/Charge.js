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
        };
    }

    componentDidMount() {
        // this.charge();
        this.props.authStore.getUser();
    }

    charge = () => {
        this.props.httpService.charge(
            this.props.authStore.user.id,
            this.props.authStore.user.username,
            this.props.authStore.user.password,
            Number(this.state.point) + Number(this.props.authStore.user.point)
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
        const { authStore } = this.props;
        const user = authStore.user;
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