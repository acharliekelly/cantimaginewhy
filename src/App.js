import React from 'react';
// import logo from './logo.svg';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Gallery currentAlbum="landscape" />
        
      </header>
    </div>
  );
}

export default App;
