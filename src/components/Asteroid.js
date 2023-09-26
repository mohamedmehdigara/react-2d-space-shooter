import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  background-color: ${(props) => props.color || '#ff0000'};
  animation: rotate 5s linear infinite; /* Add rotation animation */

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Asteroid = ({ top, left, width, height }) => {
  const minSize = 20;
  const maxSize = 60;
  const randomSize = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const getBoundingBox = () => {
    return {
      x: left,
      y: top,
      width: width,
      height: height,
    };
  };

  return (
    <AsteroidWrapper
      style={{
        top,
        left,
        width: randomSize,
        height: randomSize,
      }}
      color={randomColor}
    />
  );
};

export default React.memo(Asteroid);
