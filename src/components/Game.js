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
  const [shipDirection, setShipDirection] = useState(1); // 1 for right, -1 for left
  const [bullets, setBullets] = useState([]);
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    // Implement game loop using requestAnimationFrame for smoother animations
    const gameLoop = () => {
      // Update game logic here (move the spaceship, update bullets, asteroids, etc.)

      // Move the spaceship
      setShipPosition((prevPosition) => {
        let newPosition = prevPosition + 2 * shipDirection; // Adjust speed as needed

        // Bounce off the borders
        if (newPosition < 0) {
          newPosition = 0;
          setShipDirection(1); // Change direction to right
        } else if (newPosition > 750) {
          newPosition = 750;
          setShipDirection(-1); // Change direction to left
        }

        return newPosition;
      });

      // Clean up logic (remove off-screen bullets or destroyed asteroids)

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
  }, [shipPosition, shipDirection]);

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
