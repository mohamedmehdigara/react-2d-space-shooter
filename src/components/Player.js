import React, { Component } from 'react';

class Player extends Component {
  constructor() {
    super();
    this.state = {
      bullets: [],
    };
  }

  // Function to handle shooting
  shoot = () => {
    const bullet = {
      x: this.playerRef.getBoundingClientRect().x + this.playerRef.offsetWidth / 2,
      y: this.playerRef.getBoundingClientRect().y,
    };

    this.setState((prevState) => ({
      bullets: [...prevState.bullets, bullet],
    }));
  };

  // Function to update bullet positions
  updateBullets = () => {
    this.setState((prevState) => ({
      bullets: prevState.bullets.map((bullet) => ({ ...bullet, y: bullet.y - 5 })),
    }));
  };

  componentDidMount() {
    // Set up shooting interval
    this.shootingInterval = setInterval(this.shoot, 1000);

    // Set up bullet movement interval
    this.bulletMovementInterval = setInterval(this.updateBullets, 50);
  }

  componentWillUnmount() {
    // Clear intervals when unmounting the component
    clearInterval(this.shootingInterval);
    clearInterval(this.bulletMovementInterval);
  }

  render() {
    return (
      <div
        ref={(ref) => (this.playerRef = ref)}
        className="Player"
        style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <h3>Player</h3>
      </div>
    );
  }
}

export default Player;
