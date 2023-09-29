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
      let animationFrameId;

      const animateDisappearance = (timestamp) => {
        // Calculate the next opacity value based on time or frame count
        const newOpacity = opacity - 0.01; // Adjust the step as needed

        if (newOpacity <= 0) {
          // Animation complete, remove the asteroid
          cancelAnimationFrame(animationFrameId);
          return;
        }

        setOpacity(newOpacity);
        animationFrameId = requestAnimationFrame(animateDisappearance);
      };

      animationFrameId = requestAnimationFrame(animateDisappearance);

      return () => {
        // Clean up: cancel the animation frame when the component unmounts
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [opacity, shouldDisappear]);

  return (
    <AsteroidWrapper style={{ top, left, width, height, opacity }} />
  );
};

export default React.memo(Asteroid);
