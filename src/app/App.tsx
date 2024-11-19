import { useState } from 'react';
import './App.css';

function App() {
  const [ count, setCount ] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <button onClick={(): void => setCount((count: number): number => count + 1)}>
        count is {count}
      </button>
    </>
  );
}

export { App };