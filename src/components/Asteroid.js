// Asteroid.js
import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
`;

const Asteroid = ({ top, left }) => {
  return <AsteroidWrapper style={{ top, left }} />;
};

export default Asteroid;
