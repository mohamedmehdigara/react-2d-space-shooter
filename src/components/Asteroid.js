import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s; // Adjust the duration as needed
`;

export function getBoundingBox(left, top, width, height) {
  return {
    x: left,
    y: top,
    width: width,
    height: height,
  };
}

const Asteroid = ({ top, left, shouldDisappear }) => {
  const [opacity, setOpacity] = useState(1);
  const width = 40;
  const height = 40;

  useEffect(() => {
    if (shouldDisappear) {
      const interval = setInterval(() => {
        setOpacity((prevOpacity) => {
          const newOpacity = prevOpacity - 0.1;
          if (newOpacity <= 0) {
            clearInterval(interval);
          }
          return newOpacity;
        });
      }, 100);
    }
  }, [shouldDisappear]);

  return (
    <AsteroidWrapper style={{ top, left, width, height, opacity }} />
  );
};

export default React.memo(Asteroid);
