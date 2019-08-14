import React from 'react';

class PromiseTest extends React.Component {

    callback(func){
        for(let i=0; i<10; i++){
            func(i);
        }
    }
    
    callbackTest = () => {
        const callbackFunc = function (i) {
            console.log('callback: ' + i);
        };
        this.callback(callbackFunc);
    }

    promiseTest = () => {
        const promise = new Promise((resolve, reject) => {  
            // 꼭 resolve, reject가 아니어도 됨. 첫번째가 then, 두번째가 catch를 받아옴
            let a = 10;
            const b = 2;
            resolve({
                sum: a + b,
                minus: a - b,
                multi: a * b}
                );
            reject(a/b);
            console.log('after resolve')
        }); 

        promise.then(({sum, minus, multi})=>{    // then이니까 resolve
            console.log('promise ' + sum);
            console.log('promise ' + minus);
            console.log('promise ' + multi);
        }).catch((dev)=>{       // catch 니까 reject 
            console.log('promise catch ' + dev)
        });
    }

    render(){
        return(
            <div>
                <h1>Promise Test</h1>
                <button onClick={this.callbackTest}>Callback</button>
                <button onClick={this.promiseTest}>Promise</button>
            </div>
        );
    }
}

export default PromiseTest;