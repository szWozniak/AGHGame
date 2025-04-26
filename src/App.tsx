import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'
import { Ground } from './components/Ground'
import { Sky } from '@react-three/drei'
import { Game } from './components/Game'
import * as THREE from 'three';
import { Player } from './components/Player'
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
  const [nextUpdate, setNextUpdate] = useState(10);

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
          <br />
          Następne ulepszenie:<br /><br />
          🌳 <b>Drzewo</b>: <b>{coins}</b>/{nextUpdate}<br />
        </div>
        <div className="footer">
          Made with ❤️ by:<br />
          Szymon Woźniak & Mikołaj Pajor
        </div>
      </div>
      <div className="crosshair"></div>

      <Canvas
        shadows
        camera={{ position: [0, 4, 0], fov: 70 }}
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
        <Player />
      </Canvas>
    </>
  )
}

export default App