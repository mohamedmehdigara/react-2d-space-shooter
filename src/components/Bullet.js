import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveBullet = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const BulletWrapper = styled.div`
  position: absolute;
  width: 10px;
  height: 30px;
  background-color: #ff9900;
  animation: ${moveBullet} ${(props) => props.speed}s linear infinite;
`;

const Bullet = ({ top, left, speed }) => {
  return <BulletWrapper style={{ top, left }} speed={speed} />;
};

export default Bullet;
