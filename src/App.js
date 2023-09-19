// App.js

import React, { Component } from 'react';
import './App.css';
import { QuadTree, Rectangle } from './QuadTree';

// Define Asteroid and Bullet classes with getBoundingBox methods
class Asteroid {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  getBoundingBox() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
}

class Bullet {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  getBoundingBox() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
}

class App extends Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.ctx = null;
    this.asteroids = [];
    this.bullets = [];
    this.quadTree = null;
  }

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

  // Add event listeners for user input
  addEventListeners() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  // Handle keydown events (e.g., for shooting bullets)
  handleKeyDown = (event) => {
    if (event.key === ' ') {
      // Spacebar is pressed, create and shoot a bullet
      const bullet = new Bullet(
        this.ship.x + this.ship.width / 2,
        this.ship.y,
        2,
        5,
        5
      );
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
  }

  // Check collisions using the QuadTree
  checkCollisions() {
    // Handle collisions between bullets and asteroids
    for (const bullet of this.bullets) {
      const potentialColliders = this.quadTree.query(bullet.getBoundingBox());
      for (const asteroid of potentialColliders) {
        if (bullet.getBoundingBox().intersects(asteroid.getBoundingBox())) {
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
      this.ctx.fillStyle = 'gray';
      this.ctx.fillRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
    }

    // Draw bullets
    this.ctx.fillStyle = 'red';
    for (const bullet of this.bullets) {
      this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    // Draw the player's ship (you should have a ship object defined)
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.ship.x, this.ship.y, this.ship.width, this.ship.height);
  }

  // Start the game
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

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default App;
