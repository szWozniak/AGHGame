import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

// Create the provider
export const GameProvider = ({ children }) => {
  const [coins, setCoins] = useState<number>(0)
  const [nextCost, setNextCost] = useState<number>(5)
  
  const [trees, setTrees] = useState([{
    x: 6, z: -15
  }])

  const updateCoins = (delta: number) => {
    setCoins(prev => prev + delta)
  }

  const addTree = () => {
    if(coins >= nextCost) {
      setTrees([...trees, {
        x: Math.floor(Math.random()*50) - 25,
        z: Math.floor(Math.random()*50) - 25
      }])
  
      setCoins(coins - nextCost);
      setNextCost(prev => prev+2)
    } else {
      alert("Nie masz wystarczajaco zlota aby zakupic drzewo!");
    }
  }

  return (
    <GameContext.Provider value={{ updateCoins, coins, trees, nextCost, addTree }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);