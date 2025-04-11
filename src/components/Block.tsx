import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export function Block({x, y, z, ...props}) {
  const texture = useLoader(TextureLoader, '/grass_top.png');

  texture.repeat.set(1, 1);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const textureSide = useLoader(TextureLoader, '/grass_side.png');

  textureSide.repeat.set(1, 1);
  textureSide.wrapS = textureSide.wrapT = THREE.RepeatWrapping;


  return (
    <mesh castShadow receiveShadow position={[x*4, y*4, z*4]}>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial roughness={1} color={'#81DD59'} attach="material-2" map={texture} />
      <meshStandardMaterial roughness={1} attach="material-0" map={textureSide} />
      <meshStandardMaterial roughness={1} attach="material-1" map={textureSide} />
      <meshStandardMaterial roughness={1} attach="material-3" map={textureSide} />
      <meshStandardMaterial roughness={1} attach="material-4" map={textureSide} />
      <meshStandardMaterial roughness={1} attach="material-5" map={textureSide} />
    </mesh>
  );
}