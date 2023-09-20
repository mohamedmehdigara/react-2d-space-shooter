import React from 'react';
import Asteroid from './Asteroid'; // Import your Asteroid component

const Enemy = ({ asteroids }) => {
  return (
    <>
      {asteroids.map((asteroid, index) => (
        <Asteroid key={index} top={asteroid.y} left={asteroid.x} />
      ))}
    </>
  );
};

export default React.memo(Enemy); // Use React.memo for performance optimization
