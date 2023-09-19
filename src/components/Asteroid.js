// Asteroid.js
import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
  border-radius: 50%;
  cursor: pointer; // Add this to make it clickable
`;

const Asteroid = ({ top, left, onShoot }) => {
  const handleClick = () => {
    // Call the onShoot function to handle the asteroid being shot
    onShoot();
  };

  return <AsteroidWrapper top={top} left={left} onClick={handleClick} />;
};

export default Asteroid;
