// Game.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SpaceShip from './SpaceShip';
import Asteroid from './Asteroid';
import Bullet from './Bullet';

const GameWrapper = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #000;
`;

const Game = () => {
  const [shipPosition, setShipPosition] = useState(375);
  const [shipDirection, setShipDirection] = useState(0); // 0 for not moving, 1 for right, -1 for left
  const [bullets, setBullets] = useState([]);
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    // Implement game loop using requestAnimationFrame for smoother animations
    const gameLoop = () => {
      // Update game logic here (move the spaceship, update bullets, asteroids, etc.)

      // Move the spaceship
      setShipPosition((prevPosition) => {
        let newPosition = prevPosition + 1 * shipDirection; // Adjust speed as needed

        // Keep the spaceship within the borders
        if (newPosition < 0) {
          newPosition = 0;
        } else if (newPosition > 750) {
          newPosition = 750;
        }

        return newPosition;
      });

      // Check for collisions and handle reactions (e.g., removing hit asteroids)
      const updatedAsteroids = asteroids.filter((asteroid) => {
        const asteroidBottom = asteroid.top + 40; // Adjust for asteroid size
        const asteroidRight = asteroid.left + 40; // Adjust for asteroid size

        const spaceshipBottom = 600; // Adjust for spaceship size
        const spaceshipRight = shipPosition + 50; // Adjust for spaceship size

        const collided =
          shipPosition < asteroidRight &&
          spaceshipRight > asteroid.left &&
          spaceshipBottom > asteroid.top &&
          spaceshipBottom < asteroidBottom;

        if (collided) {
          // Handle collision reaction here (e.g., remove the asteroid)
          return false;
        }

        return true; // Keep asteroids that haven't collided
      });

      setAsteroids(updatedAsteroids);

      // Request the next animation frame
      requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    requestAnimationFrame(gameLoop);

    // Add event listeners for arrow keys and spacebar for shooting
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          setShipDirection(-1);
          break;
        case 'ArrowRight':
          setShipDirection(1);
          break;
        case ' ':
          handleShoot(shipPosition + 20); // Adjust the bullet position
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Clean up event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [shipPosition, shipDirection, asteroids]);

  const handleShoot = (bulletPosition) => {
    const newBullet = {
      id: Date.now(),
      top: 550, // Adjust as needed
      left: bulletPosition,
    };
    setBullets((prevBullets) => [...prevBullets, newBullet]);
  };

  return (
    <GameWrapper>
      <SpaceShip position={shipPosition} />
      {bullets && bullets.map((bullet) => (
        <Bullet key={bullet.id} {...bullet} />
      ))}
      {asteroids && asteroids.map((asteroid) => (
        <Asteroid
          key={asteroid.id}
          {...asteroid}
          onShoot={() => handleShoot(asteroid.left + 20)} // Pass a callback to handle shooting
        />
      ))}
    </GameWrapper>
  );
};

export default Game;
