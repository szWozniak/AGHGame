import React, { useState, useEffect } from 'react';
import { Block } from './Block';

export const Map = () => {
    const [blocks, setBlocks] = useState<any[]>([])

    useEffect(() => {
        fetch('/map/blocks.json')
        .then((response) => response.json())
        .then((data) => setBlocks(data.blocks))
        .catch((error) => console.error('Error loading blocks data:', error))
    }, [])

  return (
    <>
      {blocks.map((block, index) => (
        <Block key={index} x={block.x} y={block.y} z={block.z} type={block.type} />
      ))}
    </>
  );
};