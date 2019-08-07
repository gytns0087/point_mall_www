import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import DataHelper from '../DataHelper';

@inject('authStore', 'itemStore')
@observer 
class Header extends React.Component {

    helper = new DataHelper();
    constructor(props) {
        super(props);
        

        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        this.indexCategories();
    }

    indexCategories() {
        axios.get(DataHelper.baseURL()+ '/categories/')
            .then((response) => {
                const categories = response.data;
                this.setState({
                    categories: categories
                });
            });
    }

    logout = () => {
        const { authStore } = this.props;
        authStore.deleteToken();
        alert('로그아웃 되었습니다.');
    }

    render() {
        const { authStore, itemStore } = this.props;
        const categories = this.state.categories.map((category) => {
            return (
                <Link key={category.id} to={'/categories/' + category.id}>{category.title}</Link>
            )
        });
        return (
            <header>
                <Link to="/">PointMall</Link>
                {categories}
                <div className="header-right">
                    <Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>
                    {
                        authStore.isLoggedIn && <Link to="/me/items">My Items</Link>
                    }
                    {
                        authStore.isLoggedIn ?
                        <button onClick={this.logout}>Logout</button> :
                        <Link to= "/login">Login</Link>    
                    }
                </div>
            </header>
        );
    }
}

export default Header;