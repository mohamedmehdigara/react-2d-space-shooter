import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

const Game = ({ onGameUpdate }) => {
  const pixiContainerRef = useRef(null);
  const [gameState, setGameState] = useState({
    player: {
      x: 375,
      y: 500,
      width: 50,
      height: 50,
    },
    // Initialize other game objects here...
  });

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
    player.x = gameState.player.x;
    player.y = gameState.player.y;

    gameContainer.addChild(player);

    // Custom game loop
    const updateGame = () => {
      // Your game logic goes here

      // Update player position in game state
      setGameState((prevState) => ({
        ...prevState,
        player: {
          ...prevState.player,
          x: player.x,
          y: player.y,
        },
        // Update other game objects here...
      }));

      // Send game state to the parent component
      onGameUpdate(gameState);

      // Continue game loop
      requestAnimationFrame(updateGame);
    };

    // Start the game loop
    requestAnimationFrame(updateGame);

    // Clean up PIXI resources when unmounting
    return () => {
      app.destroy(true);
    };
  }, [onGameUpdate, gameState]);

  return <div ref={pixiContainerRef}></div>;
};

export default Game;

