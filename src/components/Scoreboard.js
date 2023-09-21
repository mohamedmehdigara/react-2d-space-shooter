import React, { useState } from 'react';

const Scoreboard = () => {
  const [score, setScore] = useState(0);

  // Rest of the component code

  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
    </div>
  );
};

export default Scoreboard;
