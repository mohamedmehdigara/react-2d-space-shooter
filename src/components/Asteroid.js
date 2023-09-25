import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
`;
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

const Asteroid = ({ top, left }) => {
  const width = 20; // Set the default width
  const height = 20; // Set the default height

  const getBoundingBox = () => {
    return {
      x: left,
      y: top,
      width: width,
      height: height,
    };
  };

  return (
    <AsteroidWrapper style={{ top, left, backgroundColor: randomColor, width, height }} />
  );
};

export const getBoundingBox = (top, left) => {
  const width = 20; // Set the default width
  const height = 20; // Set the default height

  return {
    x: left,
    y: top,
    width: width,
    height: height,
  };
};

export default React.memo(Asteroid);
