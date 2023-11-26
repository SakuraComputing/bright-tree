import React from 'react';
import './App.css';
import { root } from './data/files';
import Directory from './components/Directory/Directory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='app-title'>Bright<sup>HR</sup> Tree</div>
        <Directory root={root}/>
      </header>
    </div>
  );
}

export default App;
