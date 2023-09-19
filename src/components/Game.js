import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const Game = () => {
  const pixiContainerRef = useRef(null);

  useEffect(() => {
    // Initialize PixiJS
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000, // Background color
    });

    pixiContainerRef.current.appendChild(app.view);

    // Create a container for game objects
    const gameContainer = new PIXI.Container();
    app.stage.addChild(gameContainer);

    // Create your game objects, animations, and logic using PIXI.Graphics, PIXI.Sprite, etc.
    // Example:
    const player = new PIXI.Graphics();
    player.beginFill(0xffffff);
    player.drawRect(0, 0, 50, 50);
    player.endFill();
    player.x = 375;
    player.y = 500;

    gameContainer.addChild(player);

    // Update game logic here
    app.ticker.add(() => {
      // Your game logic goes here
    });

    // Clean up PIXI resources when unmounting
    return () => {
      app.destroy(true);
    };
  }, []);

  return <div ref={pixiContainerRef}></div>;
};

export default Game;
