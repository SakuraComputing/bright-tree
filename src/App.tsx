import React from 'react';
import './App.css';
import { root } from './data/files';
import Directory from './components/Directory/Directory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bright<sup>HR</sup> Tree</h1>
        <Directory root={root}/>
      </header>
    </div>
  );
}

export default App;
