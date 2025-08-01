import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h2>Counter: {count}</h2>
            <button onClick={increment} style={{ marginRight: '10px' }}>Increment</button>
            <button onClick={() => setCount(0)} style={{ margin: '10px' }}>Reset</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
}

export default Counter;
