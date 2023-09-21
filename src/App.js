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


class App extends Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.ctx = null;
    this.asteroids = [];
    this.bullets = [];
    this.quadTree = null;
    this.state = {
      score: 0, // Initialize score with a default value
    };

    // Define and initialize the ship object
    this.ship = {
      x: (window.innerWidth - 30) / 2,
      y: window.innerHeight - 40,
      width: 30,
      height: 30,
    };

    // Track the game level
    this.level = 1;
  }

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;

    // Initialize the QuadTree with a boundary that covers the entire canvas
    const boundary = new Rectangle(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height
    );
    this.quadTree = new QuadTree(boundary, 4);

    // Add event listeners and start the game loop
    this.addEventListeners();
    this.startGame();
  }

  // Add event listeners for user input
  addEventListeners() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  // Handle keydown events (e.g., for shooting bullets)
  handleKeyDown = (event) => {
    if (event.key === ' ') {
      // Spacebar is pressed, create and shoot a bullet
      const bullet = {
        x: this.ship.x + this.ship.width / 2,
        y: this.ship.y,
        width: 2,
        height: 5,
        speed: 5,
      };
      this.bullets.push(bullet);

      // Insert the bullet into the QuadTree
      this.quadTree.insert(bullet);
    }
  };

  // Game loop
  gameLoop = () => {
    this.updateGameObjects();
    this.checkCollisions();
    this.drawGameObjects();
    requestAnimationFrame(this.gameLoop);
  };

  // Update the game objects (e.g., move asteroids, bullets)
  updateGameObjects() {
    // Update asteroid positions
    for (const asteroid of this.asteroids) {
      asteroid.y += asteroid.speed;
    }

    // Update bullet positions and remove off-screen bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.y -= bullet.speed;

      // Remove bullets that are off-screen
      if (bullet.y + bullet.height < 0) {
        this.bullets.splice(i, 1);
      }
    }

    // Update the QuadTree with the current positions of objects
    this.quadTree = new QuadTree(this.quadTree.boundary, this.quadTree.capacity);
    for (const bullet of this.bullets) {
      this.quadTree.insert(bullet);
    }
    for (const asteroid of this.asteroids) {
      this.quadTree.insert(asteroid);
    }

    // Check if all asteroids are destroyed, then advance to the next level
    if (this.asteroids.length === 0) {
      this.level++;
      this.spawnAsteroids(); // Spawn new asteroids for the next level
    }
  }

  // Check collisions using the QuadTree
  checkCollisions() {
    // Handle collisions between bullets and asteroids
    for (const bullet of this.bullets) {
      const potentialColliders = this.quadTree.query(bullet);
      for (const asteroid of potentialColliders) {
        if (bullet.intersects(asteroid)) {
          // Handle the collision (e.g., remove bullet and asteroid)
          const bulletIndex = this.bullets.indexOf(bullet);
          if (bulletIndex !== -1) {
            this.bullets.splice(bulletIndex, 1);
          }

          const asteroidIndex = this.asteroids.indexOf(asteroid);
          if (asteroidIndex !== -1) {
            this.asteroids.splice(asteroidIndex, 1);
          }
        }
      }
    }
  }

  // Draw game objects on the canvas
  drawGameObjects() {
    this.ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);

    // Draw asteroids
    for (const asteroid of this.asteroids) {
      if (asteroid.type === AsteroidTypes.SMALL) {
        SmallAsteroid(this.ctx, asteroid.x, asteroid.y);
      } else if (asteroid.type === AsteroidTypes.MEDIUM) {
        MediumAsteroid(this.ctx, asteroid.x, asteroid.y);
      } else if (asteroid.type === AsteroidTypes.LARGE) {
        LargeAsteroid(this.ctx, asteroid.x, asteroid.y);
      }
    }

    // Draw bullets
    this.ctx.fillStyle = 'red';
    for (const bullet of this.bullets) {
      this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    // Draw the player's ship
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.ship.x, this.ship.y, this.ship.width, this.ship.height);

    // Display the current level
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Level: ${this.level}`, 10, 20);
  }

  // Start the game
  startGame() {
    this.spawnAsteroids(); // Initialize asteroids for the first level

    // Start the game loop
    requestAnimationFrame(this.gameLoop);
  }

  // Spawn asteroids based on the current level
  spawnAsteroids() {
    this.asteroids = []; // Clear existing asteroids
    const numAsteroids = this.level * 5; // Increase the number of asteroids with each level

    for (let i = 0; i < numAsteroids; i++) {
      // Randomly choose an asteroid type (small, medium, or large)
      const randomType = Math.random() < 0.7
        ? AsteroidTypes.SMALL
        : Math.random() < 0.9
        ? AsteroidTypes.MEDIUM
        : AsteroidTypes.LARGE;

      // Randomly position the asteroids across the canvas
      const randomX = Math.random() * this.canvasRef.current.width;
      const randomY = -Math.random() * this.canvasRef.current.height;

      // Set the initial speed based on asteroid type
      let speed;
      if (randomType === AsteroidTypes.SMALL) {
        speed = 2;
      } else if (randomType === AsteroidTypes.MEDIUM) {
        speed = 1.5;
      } else {
        speed = 1;
      }

      // Create the asteroid object
      const asteroid = {
        x: randomX,
        y: randomY,
        type: randomType,
        speed,
      };

      this.asteroids.push(asteroid);
    }
  }

  updateScore = (points) => {
    this.setState((prevState) => ({
      score: prevState.score + points,
    }));
  };

  render() {
    const { score } = this.state; // Destructure score from state

    return (
      <div>
        <canvas ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <Player ship={this.ship} />
        <Enemy asteroids={this.asteroids} />
        <Scoreboard score={this.state.score} />

      </div>
    );
  }
}

export default App;
