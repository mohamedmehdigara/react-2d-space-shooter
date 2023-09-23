import React, { Component } from 'react';

class Asteroid extends Component {
  // Add a getBoundingBox method to Asteroid
  getBoundingBox() {
    return {
      x: this.props.left,
      y: this.props.top,
      width: 40, // Set the width of the bounding box
      height: 40, // Set the height of the bounding box
    };
  }

  render() {
    return (
      <div
        className="Asteroid"
        style={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          backgroundColor: '#ff0000',
          top: `${this.props.top}px`,
          left: `${this.props.left}px`,
        }}
      ></div>
    );
  }
}

export default Asteroid;
