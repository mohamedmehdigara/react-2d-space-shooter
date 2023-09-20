// SmallAsteroid.js
import React from 'react';
import styled from 'styled-components';

const SmallAsteroidWrapper = styled.div`
  /* Define styles for small asteroids */
`;

const SmallAsteroid = ({ top, left }) => {
  return <SmallAsteroidWrapper style={{ top, left }} />;
};

export default SmallAsteroid;
// Similar components for medium and large asteroids
