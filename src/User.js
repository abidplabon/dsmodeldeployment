import {useState} from 'react';

function User(props){
    return(
        <h1>Name: {props.name} Age: {props.age}<button onClick={props.function}>Clickme</button></h1>
    );
}

function SecondUser(){
    const [counter,setCounter] = useState(0);
    const Increment = ()=>{
        setCounter(counter+1);
    }
    return(
        <div>
        <h1>Second User Data Here</h1>
        <button onClick={Increment}>ClickMe</button>
        <p>You Clicked the button {counter} times</p>
        </div>
    );
}
export {User,SecondUser};