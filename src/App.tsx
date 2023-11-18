import React from 'react';
import './App.css';
import Directory from './components/directory/directory';
import { root } from './data/files';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bright Tree</h1>
        <Directory root={root}/>
      </header>
    </div>
  );
}

export default App;
