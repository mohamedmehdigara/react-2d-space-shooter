import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
`;

const Asteroid = ({ top, left }) => {
  const width = 40; // Set the default width
  const height = 40; // Set the default height

  const getBoundingBox = () => {
    return {
      x: left,
      y: top,
      width: width,
      height: height,
    };
  };

  return (
    <AsteroidWrapper style={{ top, left, width, height }} />
  );
};

export default React.memo(Asteroid);
