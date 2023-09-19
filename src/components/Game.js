import React, { useState, useEffect, useCallback } from 'react';
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
  const [shipDirection, setShipDirection] = useState(0);
  const [bullets, setBullets] = useState([]);
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    // Game loop
    const gameLoop = () => {
      // Update game logic here (move the spaceship, update bullets, asteroids, etc.)
      // ...

      // Request the next animation frame
      requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    requestAnimationFrame(gameLoop);

    // Clean up event listeners
    return () => {
      // Clean up logic
    };
  }, [shipPosition, bullets, asteroids]);

  // Function to handle shooting
  const handleShoot = useCallback(() => {
    const newBullet = {
      id: Date.now(),
      top: 550,
      left: shipPosition + 22, // Adjust bullet position
    };
    setBullets((prevBullets) => [...prevBullets, newBullet]);
  }, [shipPosition]);

  // Function to handle arrow key controls
  const handleKeyPress = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        setShipDirection(-1);
        break;
      case 'ArrowRight':
        setShipDirection(1);
        break;
      case ' ':
        handleShoot();
        break;
      default:
        break;
    }
  }, [handleShoot]);

  useEffect(() => {
    // Add event listeners for arrow keys and spacebar for shooting
    window.addEventListener('keydown', handleKeyPress);

    // Clean up event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <GameWrapper>
      <SpaceShip position={shipPosition} direction={shipDirection} />
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
