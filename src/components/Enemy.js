import React from 'react';
import Asteroid from './Asteroid';

const Enemy = ({ asteroids }) => {
  return (
    <>
      {asteroids.map((asteroid, index) => (
        <Asteroid key={index} top={asteroid.y} left={asteroid.x} />
      ))}
    </>
  );
};

// Use React.memo for performance optimization with a custom comparison function
export default React.memo(Enemy, (prevProps, nextProps) => {
  // Compare the incoming `asteroids` prop to determine if a re-render is needed
  return (
    prevProps.asteroids.length === nextProps.asteroids.length &&
    prevProps.asteroids.every((prevAsteroid, index) =>
      // Check if the position of each asteroid is the same
      prevAsteroid.x === nextProps.asteroids[index].x &&
      prevAsteroid.y === nextProps.asteroids[index].y
    )
  );
});
