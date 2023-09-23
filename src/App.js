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
    this.state = {
      playerHealth: 100, // Set the initial player health
      playerX: (window.innerWidth - 30) / 2, // Initial player X position
      playerY: window.innerHeight - 40, // Initial player Y position
      bullets: [], // Array to store bullets
      asteroids: [], // Array to store asteroids
    };
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
    this.spawnAsteroids(); // Spawn asteroids when the game starts
    setInterval(this.checkCollisions.bind(this), 100); // Check collisions every 100ms
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
    const { playerHealth, playerX, playerY, bullets, asteroids } = this.state;
  
    return (
      <div tabIndex="0" onKeyDown={this.handleKeyDown}>
        <HealthBar health={playerHealth} maxHealth={100} />
        <SpaceShip position={{ x: playerX, y: playerY }} />
        {bullets.map((bullet, index) => (
          <Bullet key={index} x={bullet.x} y={bullet.y} />
        ))}
        {asteroids.map((asteroid, index) => (
          <Asteroid key={index} left={asteroid.x} top={asteroid.y} />
        ))}
      </div>
    );
  }
}
export default App;