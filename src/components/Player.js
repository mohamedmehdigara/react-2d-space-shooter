// Player.js
import React from 'react';
import SpaceShip from './SpaceShip'; // Import your SpaceShip component

const Player = ({ position }) => {
  return <SpaceShip position={position} />;
};

export default Player;
