import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Button, Label, Input, Button2 } from '@johndoe/library';

// import json from './assets/site_1.json';

import './App.css';

function App() {
    const [count, setCount] = useState(0)
    const [inputCustomCountValue, setInputCustomCountValue] = useState('');

    const handleClickCustomCount = () => {
        if (inputCustomCountValue === '') {
            setCount(count => count + 1);
        } else {
            setCount(Number(inputCustomCountValue));
        }
    }

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Label>My Label</Label><br />
                <Input
                    placeholder="Custom count"
                    value={inputCustomCountValue}
                    onChange={(e) => setInputCustomCountValue(e.target.value)}
                /><br />
                <Button onClick={handleClickCustomCount}>
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
                <Button2
                    label="Button"
                    onClick={() => { }}
                    primary
                />
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App;