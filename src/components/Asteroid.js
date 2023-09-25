import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
`;

const Asteroid = ({ top, left }) => {
  const width = 40;
  const height = 40;

  return (
    <AsteroidWrapper
      style={{ top, left, width, height }}
      data-bounding-box={`{ "x": ${left}, "y": ${top}, "width": ${width}, "height": ${height} }`}
    />
  );
};

export default React.memo(Asteroid);
