import React, { Component } from 'react';
import styled from 'styled-components';

const SpaceShipWrapper = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  transform-origin: center bottom; // Set pivot point to ship's bottom center
  animation: swing 2s infinite alternate; // Add swinging animation
`;

class SpaceShip extends Component {
  render() {
    const { position } = this.props;
    return <SpaceShipWrapper style={{ left: position.x, top: position.y }} />;
  }
}

export default SpaceShip;
