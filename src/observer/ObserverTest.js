import React from 'react'
import Counter from './Counter';

export default class ObserverTest extends React.Component {

    constructor(props) {
        super(props);
        this.counter = new Counter();
        // const observe = (count) => {
        //     console.log('counter changed : ' + count);
        // };
        // this.counter.addObserver(observe);
        
        // this.counter.addObserver((count) => {
        //     console.log('counter chnaged ' + count);
        //     this.forceUpdate();
        // });

        this.counter.addObserver(this);
    }

    increase = () => {
        this.counter.count++;
        this.forceUpdate();
    }

    decrease = () => {
        this.counter.count--;
        this.forceUpdate();

    }

    render() {
        return (
            <div>
                <h1>Observer Test</h1>
                <h2>카운트 : {this.counter.count}</h2>
                <button onClick={this.increase}>Increase</button>
                <button onClick={this.decrease}>Decrease</button>
            </div>
        )
    }
}