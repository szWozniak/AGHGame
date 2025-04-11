import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader } from 'three';
import * as THREE from 'three';

interface CoinProps {
  x?: number;
  y?: number;
  z?: number;
  size?: number;
  onClick?: any;
}

export function Coin({ x = 0, y = -0.5, z = 0, size = 1, onClick }: CoinProps) {
  const grassTexture = useLoader(TextureLoader, '/gold.png');

  const groundTexture = grassTexture.clone();
  groundTexture.repeat.set(1, 1);
  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;

  const meshRef = useRef<Mesh>(null);

  const randomRotationX = Math.random() * 1000;
  const randomRotationY = Math.random() * 1000;

  useFrame(({ clock }) => {
    if (meshRef?.current) {
      meshRef.current.rotation.y += 0.01 + Math.sin(clock.elapsedTime * 0.1 + randomRotationY) * 0.005;
      meshRef.current.rotation.x += 0.005 + Math.cos(clock.elapsedTime * 0.1 + randomRotationX) * 0.005;

      meshRef.current.position.y = y + Math.sin(clock.elapsedTime * 2) * 0.2;
    }
  });

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      castShadow
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial metalness={5} roughness={1} map={grassTexture} />
    </mesh>
  );
}