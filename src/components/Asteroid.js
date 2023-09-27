import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
`;

export function getBoundingBox(left, top, width, height) {
  return {
    x: left,
    y: top,
    width: width,
    height: height,
  };
}


const Asteroid = ({ top, left }) => {
  const width = 40; // Set the default width
  const height = 40; // Set the default height

  // Define the getBoundingBox function
  return (
    <AsteroidWrapper style={{ top, left, width, height }} />
  );
};

export default React.memo(Asteroid);

// Export the getBoundingBox function as well


