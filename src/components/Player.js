// Player.js
import React from 'react';
import SpaceShip from './SpaceShip';
import PropTypes from 'prop-types';

const Player = ({ position, spaceshipColor }) => {
  return <SpaceShip position={position} color={spaceshipColor} />;
};

Player.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  spaceshipColor: PropTypes.string, // Allow customization of spaceship color
};

export default Player;
