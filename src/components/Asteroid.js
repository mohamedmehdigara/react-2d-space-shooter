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
`;

const Asteroid = ({ top, left }) => {
  return <AsteroidWrapper top={top} left={left} />;
};

export default Asteroid;
