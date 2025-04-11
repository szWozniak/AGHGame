import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export function Block() {
  const groundTexture = useLoader(TextureLoader, '/grass_top2.png');

  groundTexture.repeat.set(1, 1);
  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;


  return (
    <mesh receiveShadow position={[0, 0, 0]}>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial
        color={'#91BD59'}
        map={groundTexture}
        //normalMap={normalMap} 
        //normalScale={new THREE.Vector2(10, 3)}
        roughness={1}
      />
    </mesh>
  );
}