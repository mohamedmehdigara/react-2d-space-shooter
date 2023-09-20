import React, { Component } from 'react';
import './App.css';
import { QuadTree, Rectangle } from './QuadTree'; // Import the QuadTree and Rectangle classes
import Game from './components/Game'; // Import the Game component
import Score from './components/Score'; // Import the Score component
import GameOver from './components/GameOver'; // Import the GameOver component
import Sound from './components/Sound'; // Import the Sound component

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameData: null, // Initialize game data
      score: 0, // Initialize score
      isGameOver: false, // Initialize game over state
    };
  }

  // Define the onGameUpdate function to update game data
  handleGameUpdate = (gameData) => {
    this.setState({ gameData });
  };

  // Function to handle increasing the score
  increaseScore = () => {
    this.setState((prevState) => ({ score: prevState.score + 1 }));
  };

  // Function to handle game over
  handleGameOver = () => {
    this.setState({ isGameOver: true });
  };

  // Function to restart the game
  restartGame = () => {
    this.setState({
      score: 0,
      isGameOver: false,
    });
  };

  render() {
    const { score, isGameOver } = this.state;

    return (
      <div className="App">
        <h1>Space Shooter Game</h1>

        {/* Render the Game component and pass onGameUpdate as a prop */}
        <Game
          onGameUpdate={this.handleGameUpdate}
          onIncreaseScore={this.increaseScore}
          onGameOver={this.handleGameOver}
          isGameOver={isGameOver}
        />

        {/* Render the Score component and pass the score */}
        <Score score={score} />

        {/* Render the GameOver component when the game is over */}
        {isGameOver && <GameOver score={score} onRestart={this.restartGame} />}

        {/* Render other components such as Sound, Settings, etc. */}
        <Sound />

        {/* Add any additional components here */}
      </div>
    );
  }
}

export default App;
