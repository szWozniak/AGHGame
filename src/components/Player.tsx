import { useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

const BLOCK_SIZE = 4
const SPEED = BLOCK_SIZE * 4.3
const JUMP_FORCE = 24
const GRAVITY = -100

const keys = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'jump',
}

export function Player() {
  const { camera } = useThree()
  const velocity = useRef(new THREE.Vector3(0, 0, 0))
  const direction = new THREE.Vector3()
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  })
  const [isOnGround, setIsOnGround] = useState(true)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (keys[e.code as keyof typeof keys]) {
      setMovement(m => ({ ...m, [keys[e.code as keyof typeof keys]]: true }))
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (keys[e.code as keyof typeof keys]) {
      setMovement(m => ({ ...m, [keys[e.code as keyof typeof keys]]: false }))
    }
  }

  useEffect(() => {
    camera.rotation.set(0, 0, 0)

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    direction.set(0, 0, 0)

    // Correct movement directions
    if (movement.forward) direction.z += 1
    if (movement.backward) direction.z -= 1
    if (movement.left) direction.x += 1
    if (movement.right) direction.x -= 1

    direction.normalize()

    const frontVector = new THREE.Vector3()
    camera.getWorldDirection(frontVector)
    frontVector.y = 0
    frontVector.normalize()

    const sideVector = new THREE.Vector3()
    sideVector.crossVectors(camera.up, frontVector)
    sideVector.normalize()

    const moveVector = new THREE.Vector3()
    moveVector
      .addScaledVector(frontVector, direction.z)
      .addScaledVector(sideVector, direction.x)
      .normalize()
      .multiplyScalar(SPEED)

    // Only update horizontal velocity
    velocity.current.x = moveVector.x
    velocity.current.z = moveVector.z

    // Gravity
    velocity.current.y += GRAVITY * delta

    // Jump
    if (movement.jump && isOnGround) {
      velocity.current.y = JUMP_FORCE
      setIsOnGround(false)
    }

    // Apply velocity
    camera.position.addScaledVector(velocity.current, delta)

    // Ground collision (assuming ground at Y = BLOCK_SIZE)
    if (camera.position.y < BLOCK_SIZE) {
      camera.position.y = BLOCK_SIZE
      velocity.current.y = 0
      setIsOnGround(true)
    }
  })

  return (
    <>
      <PointerLockControls />
    </>
  )
}