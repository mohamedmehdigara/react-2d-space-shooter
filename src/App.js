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

class App extends Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.ctx = null;
    this.asteroids = []; // Initialize asteroids as an empty array
    this.bullets = []; // Initialize bullets as an empty array
    this.quadTree = null;
    this.score = 0;
    this.addEventListeners = this.addEventListeners.bind(this); // Bind this to the method

  
    // Define and initialize the ship object
    this.ship = {
      x: (window.innerWidth - 30) / 2,
      y: window.innerHeight - 40,
      width: 30,
      height: 30,
    };
  }
  
  startGame() {
    // Initialize asteroids (you should have an array of asteroid objects)
    // Initialize asteroids with sample asteroid objects
    this.asteroids = [
      { x: 100, y: 100, width: 30, height: 30, speed: 2 },
      { x: 200, y: 200, width: 40, height: 40, speed: 3 },
      // Add more asteroid objects as needed
    ];

    // Start the game loop
    requestAnimationFrame(this.gameLoop);
  }

  // Add collision detection logic here
  checkCollisions() {
    const { playerX, playerY, bullets, asteroids } = this.state;
    const updatedAsteroids = [...asteroids];
    const updatedBullets = [];

    for (const bullet of bullets) {
      const bulletBoundingBox = bullet.getBoundingBox();

      // Check collisions with asteroids
      for (let i = updatedAsteroids.length - 1; i >= 0; i--) {
        const asteroid = updatedAsteroids[i];
        const asteroidBoundingBox = asteroid.getBoundingBox();

        if (this.isCollision(bulletBoundingBox, asteroidBoundingBox)) {
          // Collision detected, remove the bullet and asteroid
          updatedAsteroids.splice(i, 1);
        } else {
          updatedBullets.push(bullet);
        }
      }
    }

    this.setState({
      asteroids: updatedAsteroids,
      bullets: updatedBullets,
    });
  }

  isCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  // Update player position based on keyboard input
  handleKeyDown = (event) => {
    const { playerX, playerY } = this.state;
    const speed = 5; // Adjust player speed as needed

    switch (event.key) {
      case 'ArrowLeft':
        this.setState({ playerX: playerX - speed });
        break;
      case 'ArrowRight':
        this.setState({ playerX: playerX + speed });
        break;
      case 'ArrowUp':
        this.setState({ playerY: playerY - speed });
        break;
      case 'ArrowDown':
        this.setState({ playerY: playerY + speed });
        break;
      case ' ':
        // Spacebar is pressed, create and shoot a bullet
        const bullet = {
          x: playerX + 12, // Adjust the bullet's X position as needed
          y: playerY,
        };
        this.setState((prevState) => ({ bullets: [...prevState.bullets, bullet] }));
        break;
      default:
        break;
    }
  };

  // Update game logic here (e.g., handle collisions)
  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;
  
    // Initialize the QuadTree with a boundary that covers the entire canvas
    const boundary = new Rectangle(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    this.quadTree = new QuadTree(boundary, 4);
  
    // Add event listeners and start the game loop
    this.addEventListeners();
    this.startGame();
  }

  addEventListeners() {
    // Add event listener for keyboard controls
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  
    // Add event listener for mouse or touch controls
    this.canvasRef.current.addEventListener('mousemove', this.handleMouseMove);
    this.canvasRef.current.addEventListener('mousedown', this.handleMouseDown);
    this.canvasRef.current.addEventListener('mouseup', this.handleMouseUp);
    
    // Add event listener for window resize
    window.addEventListener('resize', this.handleResize);
  }
  
  // Keyboard controls
  handleKeyDown(event) {
    // Handle key presses
    switch (event.key) {
      case 'ArrowLeft':
        // Move the spaceship left
        this.moveSpaceship('left');
        break;
      case 'ArrowRight':
        // Move the spaceship right
        this.moveSpaceship('right');
        break;
      case 'ArrowUp':
        // Move the spaceship up
        this.moveSpaceship('up');
        break;
      case 'ArrowDown':
        // Move the spaceship down
        this.moveSpaceship('down');
        break;
      case ' ':
        // Fire a bullet
        this.fireBullet();
        break;
      // Add more controls as needed
    }
  }
  
  handleKeyUp(event) {
    // Handle key releases (e.g., stop spaceship movement)
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        // Stop spaceship movement in the corresponding direction
        this.stopSpaceship();
        break;
      // Add more key release actions if necessary
    }
  }
  
  // Mouse and touch controls
  handleMouseMove(event) {
    // Update spaceship position based on mouse/touch movement
    const mouseX = event.clientX - this.canvasRef.current.getBoundingClientRect().left;
    const mouseY = event.clientY - this.canvasRef.current.getBoundingClientRect().top;
    this.moveSpaceshipTo(mouseX, mouseY);
  }
  
  handleMouseDown(event) {
    // Handle mouse click or touch start
    // Example: Fire a bullet when the player clicks/taps
    this.fireBullet();
  }
  
  handleMouseUp(event) {
    // Handle mouse release or touch end
    // Example: Stop firing bullets when the player releases the click/tap
    this.stopFiring();
  }
  
  // Window resize event
  handleResize() {
    // Adjust the canvas size and update game logic for new dimensions
    const canvas = this.canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Add logic to reposition game objects, if needed
  }
  
  // Function to spawn asteroids periodically
  spawnAsteroids() {
    setInterval(() => {
      const asteroid = {
        x: Math.random() * window.innerWidth,
        y: 0,
        width: 40,
        height: 40,
        speed: 2,
      };
      this.setState((prevState) => ({ asteroids: [...prevState.asteroids, asteroid] }));
    }, 2000); // Adjust the interval as needed
  }

  // Render the game components
  render() {
    return (
      <div className="App">
        <canvas ref={this.canvasRef}></canvas>
        <Player
          position={this.ship}
          onFire={this.handleFire}
          onMove={this.handleMove}
        />
        {this.asteroids.map((asteroid, index) => (
          <Asteroid
            key={index}
            top={asteroid.y}
            left={asteroid.x}
          />
        ))}
        {this.bullets.map((bullet, index) => (
          <Bullet
            key={index}
            x={bullet.x}
            y={bullet.y}
          />
        ))}
        <Scoreboard score={this.score} />
        <HealthBar health={this.health} />
      </div>
    );
  }
}

export default App;