// Bullet.js
import React from 'react';
import styled from 'styled-components';

const BulletWrapper = styled.div`
  position: absolute;
  width: 5px;
  height: 20px;
  background-color: #00ff00;
`;

const Bullet = ({ top, left }) => {
  return <BulletWrapper style={{ top, left }} />;
};

export default Bullet;
