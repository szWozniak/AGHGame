import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export function Ground() {
  const grassTexture = useLoader(TextureLoader, '/grass_top.png');

  const groundTexture = grassTexture.clone();
  groundTexture.repeat.set(250, 250);
  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;


  return (
    <mesh receiveShadow position={[0, -2.5, 0]}>
      <boxGeometry args={[1000, 1, 1000]} />
      <meshStandardMaterial
        color={'#81DD59'}
        map={groundTexture}
        //normalMap={normalMap} 
        //normalScale={new THREE.Vector2(10, 3)}
        roughness={1}
      />
    </mesh>
  );
}