import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s;
  animation: fadeOut 0.5s; /* Apply the fadeOut animation */
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
    // Function to gradually reduce opacity over time
    const disappearAsteroid = () => {
      console.log("Disappearing asteroid animation triggered");

      const interval = setInterval(() => {
        // Reduce the opacity gradually
        setOpacity((prevOpacity) => {
          const newOpacity = prevOpacity - 0.1; // Adjust the step as needed
          if (newOpacity <= 0) {
            // Asteroid has disappeared, clear the interval
            clearInterval(interval);
          }
          console.log('Current Opacity:', newOpacity); // Log the current opacity


          return newOpacity;
        });
      }, 100); // Adjust the interval duration as needed
    };
  
    if (shouldDisappear) {
      disappearAsteroid();
    }
  }, [shouldDisappear]);
  

  return (
    <AsteroidWrapper style={{ top, left, width, height, opacity }} />
  );
};

export default React.memo(Asteroid);
