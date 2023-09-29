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

const Asteroid = ({ top, left }) => {
  const [opacity, setOpacity] = useState(1); // Initial opacity is 1 (fully visible)

  const width = 40; // Set the default width
  const height = 40; // Set the default height

  useEffect(() => {
    // Function to gradually reduce opacity over time
    const disappearAsteroid = () => {
      const interval = setInterval(() => {
        // Reduce the opacity gradually
        setOpacity((prevOpacity) => {
          const newOpacity = prevOpacity - 0.1; // Adjust the step as needed
          if (newOpacity <= 0) {
            // Asteroid has disappeared, clear the interval
            clearInterval(interval);
          }
          return newOpacity;
        });
      }, 100); // Adjust the interval duration as needed
    };

    disappearAsteroid();
  }, []);

  return <AsteroidWrapper style={{ top, left, width, height, opacity }} />;
};

export default React.memo(Asteroid);
