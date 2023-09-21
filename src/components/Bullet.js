import React, { Component } from 'react';

class Bullet extends Component {
  render() {
    return (
      <div
        className="Bullet"
        style={{
          position: 'absolute',
          width: '5px',
          height: '20px',
          backgroundColor: '#00ff00',
          left: `${this.props.x}px`,
          top: `${this.props.y}px`,
        }}
      ></div>
    );
  }
}

export default Bullet;
