// SpaceShip.js
import React, { useState } from 'react';
import styled from 'styled-components';

const SpaceShipWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: ${(props) => props.position}px;
  width: 50px;
  height: 50px;
  background-color: #00ff00;
`;

const SpaceShip = ({ position, onShoot }) => {
  const handleShoot = () => {
    // Call the onShoot function to create a bullet
    onShoot(position + 25); // Adjust the position where the bullet should start
  };

  return (
    <SpaceShipWrapper position={position}>
      <button onClick={handleShoot}>Shoot</button>
    </SpaceShipWrapper>
  );
};

export default SpaceShip;
