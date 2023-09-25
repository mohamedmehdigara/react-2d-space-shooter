// App.js

import React, { Component } from 'react';
import './App.css';
import { QuadTree, Rectangle } from './QuadTree';
import Player from "./components/Player"
import Enemy from './components/Enemy'; // Import the Enemy component
import AsteroidTypes from './components/AsteroidTypes'; // Import the AsteroidTypes constants
import SmallAsteroid from './components/SmallAsteroid'; // Import the SmallAsteroid component
import MediumAsteroid from './components/MediumAsteroid'; // Import the MediumAsteroid component
import LargeAsteroid from './components/LargeAsteroid'; // Import the LargeAsteroid component
import Scoreboard from './components/Scoreboard'; // Import the Scoreboard component
import HealthBar from './components/HealthBar';
import SpaceShip from "./components/SpaceShip";
import Bullet from './components/Bullet';
import Asteroid from './components/Asteroid';
import PowerUp from './components/PowerUp';


class App extends Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.ctx = null;
    this.state = {
      enemies: [], // Initialize enemies as an empty array

      asteroids: [], // Initialize asteroids as an empty array
      bullets: [], // Initialize bullets as an empty array
      quadTree: null,
      score: 0,
      playerX: (window.innerWidth - 30) / 2,
      playerY: window.innerHeight - 40,
      shipWidth: 30,
      shipHeight: 30,
      playerPosition: {
        x: (window.innerWidth - 30) / 2,
        y: window.innerHeight - 40,
        width: 30,
        height: 30,
      },
      health: 100, // Initial health value
      powerUps: [], // Initialize power-ups as an empty array

    
    };
    
    // Bind event handlers to this instance
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
   
    this.handleResize = this.handleResize.bind(this);
  }
  

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;

    const boundary = new Rectangle(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    this.quadTree = new QuadTree(boundary, 4);

    this.addEventListeners();
    this.startGame();
    this.spawnAsteroidsAndEnemies(); // Updated function
    this.gameLoop();
  }

  startGame() {
    // Initialize the game state
    this.setState({
      asteroids: [],
      enemies: [],
      bullets: [],
      quadTree: null,
      score: 0,
      playerX: (window.innerWidth - 30) / 2,
      playerY: window.innerHeight - 40,
      shipWidth: 30,
      shipHeight: 30,
    });

    // Set up the canvas and quad tree
    this.ctx = this.canvasRef.current.getContext('2d');
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;

    const boundary = new Rectangle(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    this.quadTree = new QuadTree(boundary, 4);

    // Add event listeners
    this.addEventListeners();

    // Start spawning asteroids
    this.spawnAsteroidsAndEnemies(); // Updated function

    // Start the game loop
    this.gameLoop();
  }



  addEventListeners() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', this.handleResize);
  }

  handleKeyDown = (event) => {
    const speed = 5;
  
    switch (event.key) {
      case 'ArrowLeft':
        this.movePlayer('left', speed);
        break;
      case 'ArrowRight':
        this.movePlayer('right', speed);
        break;
      case 'ArrowUp':
        this.movePlayer('up', speed);
        break;
      case 'ArrowDown':
        this.movePlayer('down', speed);
        break;
      case ' ':
        this.shootBullet();
        break;
      default:
        this.stopPlayer(); // Stop player movement for other keys
        break;
    }
  };
  
  handleKeyUp = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        this.stopPlayer();
        break;
      default:
        break;
    }
  };

  handleResize = () => {
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;
  };

  movePlayer(direction, speed) {
    const { playerPosition } = this.state;
    switch (direction) {
      case 'left':
        this.setState({ playerPosition: { ...playerPosition, x: playerPosition.x - speed } });
        break;
      case 'right':
        this.setState({ playerPosition: { ...playerPosition, x: playerPosition.x + speed } });
        break;
      case 'up':
        this.setState({ playerPosition: { ...playerPosition, y: playerPosition.y - speed } });
        break;
      case 'down':
        this.setState({ playerPosition: { ...playerPosition, y: playerPosition.y + speed } });
        break;
      default:
        break;
    }
  }

  stopPlayer() {
    // Set player movement speed to 0 to stop the player
    this.setState({
      playerXSpeed: 0,
      playerYSpeed: 0,
    });
  }
  

  shootBullet() {
    const { playerPosition } = this.state;
    const bullet = {
      x: playerPosition.x + playerPosition.width / 2,
      y: playerPosition.y,
      width: 5,
      height: 20,
    };
    this.setState((prevState) => ({ bullets: [...prevState.bullets, bullet] }));
  }

  spawnAsteroidsAndEnemies() {
    setInterval(() => {
      // Spawn asteroids
      const asteroid = {
        x: Math.random() * window.innerWidth,
        y: 0,
        width: 40,
        height: 40,
        speed: 2,
      };

      // Spawn enemies (similar to asteroids)
      const enemy = {
        x: Math.random() * window.innerWidth,
        y: 0,
        width: 40,
        height: 40,
        speed: 2,
        asteroids: [], // Initialize as an empty array

      };

      const powerUp = {
        x: Math.random() * window.innerWidth,
        y: 0,
      };

      this.setState((prevState) => ({
        asteroids: [...prevState.asteroids, asteroid],
        enemies: [...prevState.enemies, enemy], // Add enemies to state
        powerUps: [...prevState.powerUps, powerUp], // Add power-ups to state

      }));
    }, 2000);
  }

  checkCollisions() {
    const { playerPosition, bullets, asteroids, enemies, powerUps } = this.state;
    const updatedAsteroids = [...asteroids];
    const updatedEnemies = [...enemies]; // Clone the enemies array
  
    const updatedBullets = [];
  
    for (const bullet of bullets) {
      const bulletBoundingBox = bullet.getBoundingBox();
  
      for (let i = updatedAsteroids.length - 1; i >= 0; i--) {
        const asteroid = updatedAsteroids[i];
        const asteroidBoundingBox = asteroid.getBoundingBox();
  
        if (this.isCollision(bulletBoundingBox, asteroidBoundingBox)) {
          updatedAsteroids.splice(i, 1);
          this.setState((prevState) => ({ score: prevState.score + 1 }));
        } else {
          updatedBullets.push(bullet);
        }
      }
    }

    for (let i = powerUps.length - 1; i >= 0; i--) {
      const powerUp = powerUps[i];
      const powerUpBoundingBox = {
        x: powerUp.x,
        y: powerUp.y,
        width: 20 /* power-up width */,
        height: 20 /* power-up height */,
      };
  
      if (this.isCollision(playerPosition, powerUpBoundingBox)) {
        // Handle the power-up effect here
        // For example, increase the player's score
        this.setState((prevState) => ({ score: prevState.score + 10 }));
  
        // Remove the collected power-up
        powerUps.splice(i, 1);
      }
    }
  
    this.setState({
      asteroids: updatedAsteroids,
      bullets: updatedBullets,
      enemies: updatedEnemies, // Update enemies array
      powerUps: powerUps, // Update power-ups array

    });
  
    // Check collisions with player and decrement health
    for (const asteroid of updatedAsteroids) {
      const playerBoundingBox = playerPosition;
      const asteroidBoundingBox = asteroid.getBoundingBox();
  
      if (this.isCollision(playerBoundingBox, asteroidBoundingBox)) {
        this.setState((prevState) => ({ health: prevState.health - 10 }));
      }
    }
  }
  

  isCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  updateBullets() {
    const { bullets } = this.state;
    const updatedBullets = [];

    for (const bullet of bullets) {
      bullet.y -= 10; // Adjust bullet speed as needed

      // Remove bullets that are off-screen
      if (bullet.y + bullet.height > 0) {
        updatedBullets.push(bullet);
      }
    }

    this.setState({ bullets: updatedBullets });
  }

  updateAsteroids() {
    const { asteroids } = this.state;
    const updatedAsteroids = [];

    for (const asteroid of asteroids) {
      asteroid.y += asteroid.speed; // Move asteroids downward

      // Remove asteroids that are off-screen
      if (asteroid.y - asteroid.height < window.innerHeight) {
        updatedAsteroids.push(asteroid);
      }
    }

    this.setState({ asteroids: updatedAsteroids });
  }

  drawGame() {
    const { playerPosition, bullets, asteroids, enemies, score, health } = this.state;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerPosition.x, playerPosition.y, playerPosition.width, playerPosition.height);

    // Draw bullets
    ctx.fillStyle = 'red';
    for (const bullet of bullets) {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    // Draw asteroids
    ctx.fillStyle = 'gray';
    for (const asteroid of asteroids) {
      ctx.fillRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
    }

    // Draw scoreboard
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);

    // Draw health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(20, 40, health * 2, 20);

    ctx.fillStyle = 'purple';
    for (const enemy of enemies) {
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }

  gameLoop() {
    this.checkCollisions();
    this.updateBullets();
    this.updateAsteroids();
    this.drawGame();
    requestAnimationFrame(() => this.gameLoop());
  }

  render() {
    return (
      <div className="App">
        <canvas ref={this.canvasRef}></canvas>
        {this.state.enemies.map((enemy, index) => (
        <Enemy
          key={index}
          asteroids={enemy.asteroids}
        />
      ))}
        <Player position={this.state.playerPosition} />
        {this.state.asteroids.map((asteroid, index) => (
  <Asteroid
  key={index}
  top={asteroid.y}
  left={asteroid.x}
  getBoundingBox={() => ({
    x: asteroid.x,
    y: asteroid.y,
    width: 40, // Set the width of the asteroid
    height: 40, // Set the height of the asteroid
  })}
/>

))}

        {this.state.bullets.map((bullet, index) => (
          <Bullet
            key={index}
            x={bullet.x}
            y={bullet.y}
          />
        ))}
        {this.state.powerUps.map((powerUp, index) => (
  <PowerUp
    key={index}
    x={powerUp.x}
    y={powerUp.y}
  />
))}
        <Scoreboard score={this.score} />
        <HealthBar health={this.health} />
      </div>
    );
  }
}

export default App;
