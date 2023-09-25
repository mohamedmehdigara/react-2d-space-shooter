import React from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
`;

const Asteroid = ({ top, left, getBoundingBox }) => {
  return <AsteroidWrapper style={{ top, left }} />;
};

export default React.memo(Asteroid);

