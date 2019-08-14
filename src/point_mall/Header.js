import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('httpService', 'itemStore', 'authStore')   // inject 함수는 컴포넌트에서 스토어에 접근할 수 있게 해줍니다. 정확히는, 스토어에 있는 값을 컴포넌트의 props 로 "주입"을 해줍니다.
@observer   // 관찰 받고 있는 상태
class Header extends React.Component {  // React.Component를 상속받은 Header 클래스 선언

    constructor(props) {    // constructor 메서드는 class 내에서 객체를 생성하고 초기화하기 위한 특별한 메서드입니다.
        super(props);       // 자식 클래스에서 부모의 메서드를 호출할 때는 super() 메서드로 부모를 구해 호출한다.
        this.state = {      // constructor의 state
            categories: []  // categories라는 객체를 []로 초기화.
        };
    }

    componentDidMount() {   // DOM에 삽입되어 렌더링이 완료된 후 실행된다. 컴포넌트가 갱신된 후에 실행된다.
        this.indexCategories(); // indexCategories 라는 함수를 실행한다.
    }

    indexCategories() { // indexCategories 함수 정의
        this.props.httpService.indexCategories() // HttpService.js의 indexCategories 함수 호출 inject때문에 가능.
            .then(categories => {
                this.setState({     // setState 메소드는 해당 컴포넌트의 재렌더링(re-render)을 발생시킨다.
                    categories
                });
            });
    }

    logout = () => {    // logout 이벤트 정의.
        const { authStore } = this.props; // == 'const authStore = this.props.authStore'
        authStore.deleteToken();    // AuthStore.js의 deleteToken()함수 호출.
        alert('로그아웃 되었습니다.');  // 경고창
    }

    render() {        
        const { authStore, itemStore } = this.props;    // 두 줄 쓸 거 한 줄 쓰는 이점이 있다.
        const user = authStore.user;    // AuthStore.js의 user 참조.
        const username = user ? user.username : ''
        const point = user ? user.point : 0
        const categories = this.state.categories.map((category) => {
            // map() 함수는 각 배열의 요소를 돌면서 인자로 전달된 함수를 사용하여 처리 된 
            // 새로운 결과를 새로운 배열에 담아 반환하는 함수
            return (
                <Link key={category.id} to={'/categories/' + category.id}>{category.title}</Link>
                // “키(key)“는 요소 리스트를 만들 때 포함해야하는 특수한 문자열 속성
                // 키는 React가 어떤 아이템이 바뀌었는 지, 혹은 추가되었는 지, 혹은 삭제되었는 지를 
                // 인식하는 데 도움을 줍니다. 요소에 안정적인 ID를 제공하려면 배열 내부 요소에 키를 주어야합니다.
            )
        });
        return (  // HTML5 코드
            <header>
                <Link to="/">PointMall</Link>
                {categories}    
                <div className="header-right">
                    {
                        authStore.isLoggedIn ?
                            <span> {username}님/{point}P</span> :
                        null
                    }

                    <Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>
                    {
                        authStore.isLoggedIn ?
                            <Link to="/me/items">My Items</Link> :
                            <Link to="/register">Register</Link>
                    }
                    {
                        authStore.isLoggedIn ?
                            <Link to="/charge">포인트 충전</Link> :
                            null
                    }
                    {
                        authStore.isLoggedIn ?
                            <button onClick={this.logout}>Logout</button> :
                            <Link to="/login">Login</Link>
                    }

                </div>
            </header>
        );
    }
}

export default Header;