import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { autorun } from 'mobx';
import DataHelper from '../DataHelper';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };

        const helper = new DataHelper();
        autorun(() => {
            console.log('header' + helper.authToken);
        });
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
                    <Link to="/login">Login</Link>
                </div>
            </header>
        );
    }
}


export default Header;
