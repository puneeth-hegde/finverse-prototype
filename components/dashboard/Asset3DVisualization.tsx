'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere } from '@react-three/drei'
import { Mesh } from 'three'


function Shape({ position, color, shape }: { position: [number, number, number], color: string, shape: 'box' | 'sphere' }) {
  // This is the line that was fixed: useRef<Mesh>(null!)
  const ref = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2
      ref.current.rotation.y += delta * 0.3
    }
  })

  if (shape === 'box') {
    return (
      <Box ref={ref} position={position} args={[0.8, 0.8, 0.8]}>
        <meshStandardMaterial color={color} roughness={0.5} />
      </Box>
    )
  }

  return (
    <Sphere ref={ref} position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color={color} roughness={0.5} />
    </Sphere>
  )
}

export function Asset3DVisualization() {
  return (
    <div className="h-[250px] w-full rounded-md -mt-4">
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={3} />

        <Shape position={[-1.2, 0.5, 0]} color="#8B5CF6" shape="box" />
        <Shape position={[0, -0.5, 0]} color="#3B82F6" shape="sphere" />
        <Shape position={[1.2, 0.5, 0]} color="#10B981" shape="box" />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  )
}