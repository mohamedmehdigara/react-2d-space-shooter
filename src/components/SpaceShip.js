import React from 'react';
import styled, { keyframes } from 'styled-components';

// Import spaceship image
import spaceshipImage from './spaceship.png';

const swingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const SpaceShipWrapper = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-image: url('${spaceshipImage}');
  background-size: cover;
  transform-origin: center bottom;
  animation: ${swingAnimation} 2s infinite alternate;

  /* Add more styles for details, if needed */
`;

const SpaceShip = ({ position }) => {
  return <SpaceShipWrapper style={{ left: position }} />;
};

export default SpaceShip;
