import React, { Component } from 'react';

class Bullet extends Component {
  // Add a getBoundingBox method to Bullet
  getBoundingBox() {
    return {
      x: this.props.x,
      y: this.props.y,
      width: this.props.width,
      height: this.props.height,
    };
  }
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
