// LargeAsteroid.js
import React from 'react';

const LargeAsteroid = (ctx, x, y) => {
  ctx.fillStyle = 'gray';
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.fill();
};

export default LargeAsteroid;
