import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { useGame } from '../contexts/GameContext';

const textures: { [key: string]: { top: string, side: string, colorTop: string, colorSide: string } } = {
  "grass": {
    top: '/grass_top.png',
    side: '/grass_side.png',
    colorTop: '#81DD59',
    colorSide: ''
  },
  "crafting": {
    top: '/crafting_top.png',
    side: '/crafting_side.png',
    colorTop: '',
    colorSide: ''
  },
  "tree": {
    top: '/tree_top.png',
    side: '/tree_side.png',
    colorTop: '',
    colorSide: ''
  },
  "leaves": {
    top: '/leaves.png',
    side: '/leaves.png',
    colorTop: '#81DD59',
    colorSide: '#81DD59'
  }
};

export function Block({ x, y, z, type }: { x: number, y: number, z: number, type: string }) {
  const { addTree } = useGame()

  const top = textures[type].top;
  const side = textures[type].side;
  const colorTop = textures[type].colorTop;
  const colorSide = textures[type].colorSide;

  const texture = useLoader(TextureLoader, top);
  texture.repeat.set(1, 1);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const textureSide = useLoader(TextureLoader, side);
  textureSide.repeat.set(1, 1);
  textureSide.wrapS = textureSide.wrapT = THREE.RepeatWrapping;

  const handleClick = () => {
    if (type === "crafting") {
      addTree()
    }
  };

  return (
    <mesh
      castShadow
      receiveShadow
      onClick={handleClick}
      position={[x * 4, y * 4, z * 4]}
    >
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial
        roughness={1}
        color={colorTop}
        attach="material-2"
        map={texture}
      />
      <meshStandardMaterial roughness={1} color={colorSide} attach="material-0" map={textureSide} />
      <meshStandardMaterial roughness={1} color={colorSide} attach="material-1" map={textureSide} />
      <meshStandardMaterial roughness={1} color={colorSide} attach="material-3" map={textureSide} />
      <meshStandardMaterial roughness={1} color={colorSide} attach="material-4" map={textureSide} />
      <meshStandardMaterial roughness={1} color={colorSide} attach="material-5" map={textureSide} />
    </mesh>
  );
}