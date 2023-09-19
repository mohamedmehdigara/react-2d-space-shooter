// Bullet.js
import React from 'react';
import styled from 'styled-components';

const BulletWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: 10px;
  height: 10px;
  background-color: #ffff00;
  border-radius: 50%;
`;

const Bullet = ({ top, left }) => {
  return <BulletWrapper top={top} left={left} />;
};

export default Bullet;
