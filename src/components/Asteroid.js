import React, { Component } from 'react';
import styled from 'styled-components';

const AsteroidWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
`;

class Asteroid extends Component {
  render() {
    const { top, left } = this.props;
    return <AsteroidWrapper style={{ top, left }} />;
  }
}

export default Asteroid;
