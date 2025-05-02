import React, { useState, useEffect } from 'react';
import { Block } from './Block';
import { useGame } from '../contexts/GameContext';

export const Map = () => {
  const [blocks, setBlocks] = useState<any[]>([])
  const [treeSchema, setTreeSchema] = useState<any[]>([])

  const { trees } = useGame()

  useEffect(() => {
    fetch('/map/blocks.json')
      .then((response) => response.json())
      .then((data) => setBlocks(data.blocks))
      .catch((error) => console.error('Error loading blocks data:', error))
  }, [])

  useEffect(() => {
    fetch('/map/tree.json')
      .then((response) => response.json())
      .then((data) => setTreeSchema(data.blocks.map((block) => ({ ...block, x: block.x - 3, z: block.z + 8 }))))
      .catch((error) => console.error('Error loading blocks data:', error))
  }, [])

  let allBlocks = [...blocks]
  trees.forEach((tree) => {
    allBlocks = [...allBlocks, ...treeSchema.map((block) => ({ ...block, x: block.x + tree.x, z: block.z + tree.z }))]
  })

  return (
    <>
      {allBlocks.map((block, index) => (
        <Block key={index} x={block.x} y={block.y} z={block.z} type={block.type} />
      ))}
    </>
  );
};