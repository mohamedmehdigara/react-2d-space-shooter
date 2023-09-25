// PowerUp.js
import React from 'react';

const PowerUp = ({ x, y }) => {
  return (
    <div
      className="power-up"
      style={{ left: x, top: y }}
    ></div>
  );
};

export default PowerUp;
