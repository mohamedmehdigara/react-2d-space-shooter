// Sound.js
import React, { useEffect } from 'react';
import { Howl } from 'howler';

const Sound = ({ src, autoplay, loop }) => {
  useEffect(() => {
    const sound = new Howl({
      src: [src],
      autoplay,
      loop,
    });

    return () => {
      sound.unload();
    };
  }, [src, autoplay, loop]);

  return null;
};

export default Sound;
