// AsteroidSpawner.js
import React, { useEffect, useState } from 'react';
import AsteroidTypes from './AsteroidTypes';
import SmallAsteroid from './SmallAsteroid';
import MediumAsteroid from './MediumAsteroid';
import LargeAsteroid from './LargeAsteroid';

const AsteroidSpawner = ({ onAsteroidDestroy }) => {
  const [asteroidType, setAsteroidType] = useState(AsteroidTypes.SMALL);

  // Logic to spawn different asteroid types based on game progress

  return (
    <>
      {asteroidType === AsteroidTypes.SMALL && (
        <SmallAsteroid /* Position and props */ />
      )}
      {asteroidType === AsteroidTypes.MEDIUM && (
        <MediumAsteroid /* Position and props */ />
      )}
      {asteroidType === AsteroidTypes.LARGE && (
        <LargeAsteroid /* Position and props */ />
      )}
    </>
  );
};

export default AsteroidSpawner;
