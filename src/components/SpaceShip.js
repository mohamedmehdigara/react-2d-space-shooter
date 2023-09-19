// SpaceShip.js
import React from 'react';
import styled from 'styled-components';

const SpaceShipWrapper = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  transform-origin: center bottom; // Set pivot point to ship's bottom center
  animation: swing 2s infinite alternate; // Add swinging animation
`;

const SpaceShip = ({ position }) => {
  return <SpaceShipWrapper style={{ left: position }} />;
};

export default SpaceShip;
