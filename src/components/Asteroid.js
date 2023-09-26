import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
`;

const Asteroid = ({ top, left }) => {
  // Define the getBoundingBox function
  const getBoundingBox = () => {
    return {
      x: left,
      y: top,
      width: 40, // Set the width of the asteroid
      height: 40, // Set the height of the asteroid
    };
  };

  return <AsteroidWrapper style={{ top, left }} />;
};

export default React.memo(Asteroid);
