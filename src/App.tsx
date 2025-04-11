import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'
import { Ground } from './components/Ground'
import { Sky } from '@react-three/drei'
import { Coin } from './components/Coin'
import { Game } from './components/Game'
import * as THREE from 'three';
import { Block } from './components/Block'
import { Map } from './components/Map'
import { useState } from 'react'


function Fog() {
  const { scene } = useThree()
  // Using FogExp2 for more realistic, exponential fog
  scene.fog = new THREE.FogExp2('#ffffff', 0.005) // Fog color and density
  return null
}

function App() {
  const [coins, setCoins] = useState<number>(0)

  const updateCoins = (delta: number) => {
    setCoins(prev => prev + delta)
  }

  return (
    <>
      <div className="gui">
        <div className="title">
          MineClicker
        </div>
        <div>
          💰 Złoto: <b>{coins}</b>
        </div>
        <div className="footer">
          Made with ❤️ by:<br />
          Szymon Woźniak & Mikołaj Pajor
        </div>
      </div>
      <Canvas
        shadows
        camera={{ position: [3, 2, 5], fov: 50 }}
      >
        <Sky
          distance={1000}
          sunPosition={[100, 100, 100]}
          inclination={0.5}
          azimuth={0.25}
          turbidity={3}
          rayleigh={0.1}
        />
        <ambientLight intensity={0.9} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Game updateCoins={updateCoins} />
        <Map />

        <Ground />
        <Fog />
        <OrbitControls
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={40}
          maxDistance={60}
          zoomSpeed={2}
        />
      </Canvas>
    </>
  )
}

export default App