import React from 'react';

class PromiseTest extends React.Component {
    promiseTest = () => {
        const promise = new Promise((resolve, reject) => {
            let a = 1;
            const b = 2;
            reject(a + b);
            a = 10;
            console.log('after resolve');
        });

        promise.then(result => {
            console.log('promise ' + result);
            return 10;
        }).then(result => {
            console.log('promise ' + result);
            return 100;
        }).then(result => {
            console.log('promise '+ result)
            return 1000
        }).then(result => {
            console.log('promise '+ result)
        }).catch(() => {
            console.log('promise catch');
            return 5000
        }).then(result => {
            console.log('promise catch '+ result)
        });
    }

    render() {
        return (
            <div>
                <h1>Promise Test</h1>
                <button onClick={this.promiseTest}>Promise</button>
            </div>
        )
    }
}

export default PromiseTest;