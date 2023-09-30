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
import Asteroid, { getBoundingBox } from './components/Asteroid'; // Import the Asteroid component and getBoundingBox function
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
      rotationAngle: 0,       // Current rotation angle of the player
      rotationSpeed: 5,       // Speed of rotation (in degrees per frame)
      playerRotation: 0,     // Initial rotation angle
      playerRotationSpeed: 2, // Rotation speed in degrees per frame
      getBoundingBox: (left, top, width, height) => {
        return {
          x: left,
          y: top,
          width: width,
          height: height,
        };
      },
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
        this.rotatePlayer(-this.state.playerRotationSpeed); // Rotate left with a negative speed
        break;
      case 'ArrowRight':
        this.rotatePlayer(this.state.playerRotationSpeed); // Rotate right with a positive speed
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
  

  rotatePlayer(rotationDelta) {
    // Update player's rotation angle
    this.setState((prevState) => ({
      playerRotation: prevState.playerRotation + rotationDelta,
    }));
  }

  
  shootBullet() {
    const { playerPosition, playerRotation } = this.state;
    const bulletSpeed = 10; // Adjust bullet speed as needed
  
    // Calculate the position of the bullet's origin (center of the player's spaceship)
    const bulletOriginX = playerPosition.x + playerPosition.width / 2;
    const bulletOriginY = playerPosition.y + playerPosition.height / 2;
  
    // Calculate the offset for the bullet's initial position based on rotation
    const bulletOffsetX = Math.sin((playerRotation * Math.PI) / 180) * (playerPosition.width / 2);
    const bulletOffsetY = -Math.cos((playerRotation * Math.PI) / 180) * (playerPosition.height / 2);
  
    // Calculate the actual initial position of the bullet
    const bulletX = bulletOriginX + bulletOffsetX - 2.5; // Adjust for the bullet's width
    const bulletY = bulletOriginY + bulletOffsetY;
  
    const bullet = {
      x: bulletX,
      y: bulletY,
      width: 5,
      height: 20,
      direction: playerRotation, // Set bullet direction based on player's rotation
      speed: bulletSpeed,
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
    console.log("Checking collisions..."); // Add this line to check if the function is called
  
    const { bullets, asteroids } = this.state;
    const canvasWidth = this.canvasRef.current.width;
    const canvasHeight = this.canvasRef.current.height;
    const updatedAsteroids = [...asteroids];
    const updatedBullets = [];
  
    for (const bullet of bullets) {
      const bulletBoundingBox = {
        x: bullet.x,
        y: bullet.y,
        width: bullet.width,
        height: bullet.height,
      };
  
      // Check for collisions with asteroids
      for (let i = updatedAsteroids.length - 1; i >= 0; i--) {
        const asteroid = updatedAsteroids[i];
  
        console.log("Bullet:", bullet);
        console.log("Asteroid:", asteroid);
  
        if (!asteroid) {
          // Handle the null or undefined asteroid, e.g., by skipping it
          continue;
        }
  
        const asteroidBoundingBox = getBoundingBox(
          asteroid.x,
          asteroid.y,
          asteroid.width,
          asteroid.height
        );
  
        if (this.isCollision(bulletBoundingBox, asteroidBoundingBox)) {
          // Handle collision logic (e.g., increase score)
          console.log("Bullet hit asteroid!"); // Add this line to check if a collision is detected
  
          updatedAsteroids.splice(i, 1);
  
          console.log("Marking asteroid for disappearance:", asteroid);
  
          // Trigger an animation for asteroid disappearance (you can implement this)
          asteroid.shouldDisappear = true;
        } else {
          updatedBullets.push(bullet);
        }
      }
  
      // Check if the bullet is still within the visible area
      if (this.isBulletOnScreen(bullet, canvasWidth, canvasHeight)) {
        updatedBullets.push(bullet);
      }
    }
  
    // Update state with the results of collision checks
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

  updateBullets() {
    const { bullets } = this.state;
    const canvasWidth = this.canvasRef.current.width;
    const canvasHeight = this.canvasRef.current.height;
  
    // Helper function to calculate the new position of a bullet
    const calculateNewPosition = (bullet) => {
      const bulletAngleInRadians = (bullet.direction * Math.PI) / 180;
      const deltaX = Math.sin(bulletAngleInRadians) * bullet.speed;
      const deltaY = -Math.cos(bulletAngleInRadians) * bullet.speed;
  
      // Calculate new position
      const newX = bullet.x + deltaX;
      const newY = bullet.y + deltaY;
  
      return { ...bullet, x: newX, y: newY };
    };
  
    // Update bullet positions
    const updatedBullets = bullets.map((bullet) => {
      const newPosition = calculateNewPosition(bullet);
  
      // Check if the bullet is still within the visible area
      if (this.isBulletOnScreen(newPosition, canvasWidth, canvasHeight)) {
        return newPosition;
      }
  
      return null; // Remove bullets that are off-screen
    }).filter(Boolean); // Filter out null values (off-screen bullets)
  
    // Update the state with the updated bullet positions
    this.setState({ bullets: updatedBullets });
  }
  
  // Helper function to check if a bullet is within the visible area
  isBulletOnScreen(bullet, canvasWidth, canvasHeight) {
    return (
      bullet.x >= 0 &&
      bullet.x <= canvasWidth &&
      bullet.y >= 0 &&
      bullet.y <= canvasHeight
    );
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
    const { playerPosition, bullets, asteroids, enemies, score, health, playerRotation } = this.state;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Save the current context state
    ctx.save();
  
    // Translate the context to the center of the player's spaceship
    ctx.translate(playerPosition.x + playerPosition.width / 2, playerPosition.y + playerPosition.height / 2);
  
    // Apply rotation
    ctx.rotate((playerRotation * Math.PI) / 180);
  
    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(-playerPosition.width / 2, -playerPosition.height / 2, playerPosition.width, playerPosition.height);
  
    // Restore the context state to avoid affecting other drawings
    ctx.restore();
    }

    gameLoop() {
      this.checkCollisions();
      this.updateBullets();
      this.updateAsteroids();
      this.drawGame();
      requestAnimationFrame(() => this.gameLoop());
    } 

    animateAsteroidDisappearance() {
      const { asteroids } = this.state;
      const updatedAsteroids = [...asteroids];
    
      for (const asteroid of updatedAsteroids) {
        // Check if the asteroid should disappear (e.g., reached minimum opacity)
        if (asteroid.opacity <= 0) {
          // Remove the asteroid from the updatedAsteroids array
          updatedAsteroids.splice(updatedAsteroids.indexOf(asteroid), 1);
        } else {
          // Reduce the asteroid's opacity (you can adjust the decrement rate)
          asteroid.opacity -= 0.02; // Example decrement rate, adjust as needed
        }
      }
    
      // Update the state with the updated asteroid array
      this.setState({ asteroids: updatedAsteroids });
    
      // Continue the animation loop
      requestAnimationFrame(() => this.animateAsteroidDisappearance());
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
 width={asteroid.width}
 height={asteroid.height}
 getBoundingBox={this.state.getBoundingBox}

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
