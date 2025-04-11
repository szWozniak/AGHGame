import React, { useState, useEffect } from 'react';
import { Coin } from './Coin';

export const Game = ({updateCoins, ...props}: any) => {
  const [coins, setCoins] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomX = Math.random() * 60 - 40;
      const randomZ = Math.random() * 60 - 40;

      const newCoin = {
        id: Date.now() + Math.random(),
        x: randomX,
        z: randomZ,
      };

      setCoins(prevCoins => [...prevCoins, newCoin]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const removeCoin = (id: number) => {
    setCoins(prevCoins => prevCoins.filter(coin => coin.id !== id));
    updateCoins(1);
  };

  return (
    <>
      {coins.map((coin) => (
        <Coin
          key={coin.id} 
          x={coin.x}
          z={coin.z}
          onClick={() => removeCoin(coin.id)}
        />
      ))}
    </>
  );
};