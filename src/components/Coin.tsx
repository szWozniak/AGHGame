import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface CoinProps {
    x?: number
    y?: number
    z?: number
}

export function Coin({ x = 0, y = 1, z = 0 }: CoinProps) {
    const meshRef = useRef<Mesh>(null)

    const randomRotationX = Math.random() * 1000 
    const randomRotationY = Math.random() * 1000 

    useFrame(({ clock }) => {
        if (meshRef?.current) {
            meshRef.current.rotation.y += 0.01 + Math.sin(clock.elapsedTime * 0.1 + randomRotationY) * 0.005
            meshRef.current.rotation.x += 0.005 + Math.cos(clock.elapsedTime * 0.1 + randomRotationX) * 0.005

            meshRef.current.position.y = y + Math.sin(clock.elapsedTime * 2) * 0.2
        }
    })

    return (
        <mesh ref={meshRef} position={[x, y, z]} castShadow>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
                color="#FFD700"
                metalness={2}
                roughness={0.3}
            />
        </mesh>
    )
}