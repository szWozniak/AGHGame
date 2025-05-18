import React, { useState, useEffect } from 'react';
import { Coin } from './Coin';
import { useGame } from '../contexts/GameContext';

export const Game = ({ ...props }: any) => {
  const [coins, setCoins] = useState<any[]>([]);

  const { updateCoins } = useGame();

  useEffect(() => {
    const interval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 80;
      const randomX = radius * Math.cos(angle);
      const randomZ = radius * Math.sin(angle);
      const minDistance = 10;
  
      let closestCoinIndex = -1;
      let closestDistance = Infinity;
  
      coins.forEach((coin, index) => {
        const dx = coin.x - randomX;
        const dz = coin.z - randomZ;
        const distance = Math.sqrt(dx * dx + dz * dz);
  
        if (distance < minDistance && distance < closestDistance) {
          closestDistance = distance;
          closestCoinIndex = index;
        }
      });
  
      if (closestCoinIndex !== -1) {
        // 🔁 Zwiększ size najbliższej monety
        setCoins(prevCoins => {
          const updated = [...prevCoins];
          updated[closestCoinIndex] = {
            ...updated[closestCoinIndex],
            size: (updated[closestCoinIndex].size || 1) + 1, // domyślnie 1
          };
          return updated;
        });
      } else {
        // ➕ Dodaj nową monetę
        const newCoin = {
          id: Date.now() + Math.random(),
          x: randomX,
          z: randomZ,
          size: 1,
        };
        setCoins(prevCoins => [...prevCoins, newCoin]);
      }
    }, 50);
  
    return () => clearInterval(interval);
  }, [coins]);

  const removeCoin = (id: number, size: number) => {
    setCoins(prevCoins => prevCoins.filter(coin => coin.id !== id));
    updateCoins(size);
  };

  return (
    <>
      {coins.map((coin) => (
        <Coin
          key={coin.id}
          x={coin.x}
          z={coin.z}
          size={coin.size}
          onClick={() => removeCoin(coin.id, coin.size)}
        />
      ))}
    </>
  );
};