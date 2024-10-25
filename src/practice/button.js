import React from 'react';
import { useState } from "react";


function App() {
    const [count, setCount] = useState(0)
    function handleClick() {
        // alert("clicked")
        setCount(count + 1);
    }
    return (
        <div className="App">
            <MyButton count={count} onClick={handleClick} />
            <MyButton count={count} onClick={handleClick} />
        </div>
    );
}

function MyButton({ count, onClick }) {
    return (
        <button onClick={onClick}>
            Clicked {count} times
        </button>
    );
}


export default App;
