import React from 'react';
import ItemBox from './ItemBox';
import { inject, observer } from 'mobx-react';

@inject('httpService') 
@observer
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.indexItems();
    }

    indexItems() {
        this.props.httpService.indexItems() // httpService를 inject 했으므로 ..
            .then(items => {
                this.setState({
                    items
                });
            });
    }

    render() {
        const items = this.state.items.map((item) => {
            return (
                <ItemBox key={item.id} item={item} />
            )
        });
        return (
            <div>
                <div id="container">
                    <div id="item-list-container">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
