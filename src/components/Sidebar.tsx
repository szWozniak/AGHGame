import React from 'react';
import { useGame } from '../contexts/GameContext';

export const Sidebar = () => {
  const { coins, nextCost } = useGame();

  return (
    <div className="gui">
      <div className="title">
        MineClicker
      </div>
      <div>
        💰 Złoto: <b>{coins}</b>
        <br />
        Następne ulepszenie:<br /><br />
        🌳 <b>Drzewo</b>: <b>{coins}</b>/{nextCost}<br /><br />
        <i>Kliknij PPM w crafting aby zakupić drzewo!</i>
      </div>
      <div className="footer">
        Made with ❤️ by:<br />
        Szymon Woźniak & Mikołaj Pajor
      </div>
    </div>
  );
};