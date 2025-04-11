import React, { useState, useEffect } from 'react';
import { Coin } from './Coin';

export const Game = () => {
  const [coins, setCoins] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomX = Math.random() * 10 - 5;
      const randomZ = Math.random() * 10 - 5;

      setCoins(prevCoins => [
        ...prevCoins,
        { x: randomX, z: randomZ }
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {coins.map((coin, index) => (
        <Coin key={index} x={coin.x} z={coin.z} />
      ))}
    </>
  );
};