// MediumAsteroid.js
import React from 'react';

const MediumAsteroid = (ctx, x, y) => {
  ctx.fillStyle = 'gray';
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
};

export default MediumAsteroid;
