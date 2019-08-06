import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { observer } from 'mobx-react';
import DataHelper from '../DataHelper';

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
        this.helper.deleteToken();
        alert('로그아웃 되었습니다.');
    }

    render() {
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
                    <Link to="/cart/items">Cart</Link>
                    <Link to="/me/items">My Items</Link>
                    {
                        this.helper.isLoggedIn ?
                        <button onClick={this.logout}>Logout</button> :
                        <Link to= "/login">Login</Link>    
                    }
                </div>
            </header>
        );
    }
}

export default Header;