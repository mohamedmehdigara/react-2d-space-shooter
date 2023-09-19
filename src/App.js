// App.js
import React from 'react';
import './App.css'; // You can create this CSS file for global styles
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Space Shooter Game</h1>
      </header>
      <main>
        <Game />
      </main>
      <footer>
        <p>Controls: Use arrow keys to move and spacebar to shoot.</p>
      </footer>
    </div>
  );
}

export default App;
