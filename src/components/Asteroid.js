import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.color};
  animation: rotation ${(props) => props.rotationDuration}s linear infinite;
`;

const Asteroid = ({ top, left, width, height, color, rotationDuration }) => {
  return (
    <AsteroidWrapper
      style={{ top, left }}
      width={width}
      height={height}
      color={color}
      rotationDuration={rotationDuration}
    />
  );
};

export default Asteroid;
