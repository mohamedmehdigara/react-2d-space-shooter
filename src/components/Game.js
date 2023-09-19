import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SpaceShip from './SpaceShip';
import Asteroid from './Asteriod';
import Bullet from './Bullet';

const GameWrapper = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  margin: 0 auto;
  overflow: hidden;
`;

const Game = () => {
  const [shipPosition, setShipPosition] = useState(375);
  const [bullets, setBullets] = useState([]);
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    // Implement game loop using requestAnimationFrame for smoother animations
    const gameLoop = () => {
      // Update game logic here (move the spaceship, update bullets, asteroids, etc.)

      // Check for collisions
      // Handle user input (e.g., move the spaceship)

      // Update component states
      setShipPosition((prevPosition) => prevPosition + 1); // Example: Move the spaceship to the right

      // Clean up logic (remove off-screen bullets or destroyed asteroids)

      // Request the next animation frame
      requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    requestAnimationFrame(gameLoop);

    // Add event listeners for arrow keys
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          setShipPosition((prevPosition) => prevPosition - 10);
          break;
        case 'ArrowRight':
          setShipPosition((prevPosition) => prevPosition + 10);
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
  }, []); // Empty dependency array to run the effect only once

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
      <SpaceShip position={shipPosition} onShoot={handleShoot} />
      {bullets.map((bullet) => (
        <Bullet key={bullet.id} {...bullet} />
      ))}
      {asteroids.map((asteroid) => (
        <Asteroid key={asteroid.id} {...asteroid} />
      ))}
    </GameWrapper>
  );
};

export default Game;
