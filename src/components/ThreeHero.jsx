import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Geometries = () => {
    const groupRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.cos(t / 2) / 10 + 0.25, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.sin(t / 4) / 10, 0.1);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.sin(t / 4) / 20, 0.1);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, (-5 + Math.sin(t)) / 5, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main Abstract Shape - Icosahedron */}
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <mesh position={[0, 0, 0]} castShadow receiveShadow>
                    <icosahedronGeometry args={[2.5, 0]} />
                    <meshStandardMaterial
                        color="#FFA500" // Cor Primária
                        roughness={0}
                        metalness={1}
                        emissive="#FFA500"
                        emissiveIntensity={0.2}
                        wireframe
                    />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <icosahedronGeometry args={[2.48, 0]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>
            </Float>

            {/* Orbiting Particles */}
            <Float speed={4} rotationIntensity={2} floatIntensity={1}>
                <mesh position={[3, 2, -1]}>
                    <octahedronGeometry args={[0.5]} />
                    <meshStandardMaterial color="#FFFFFF" metalness={1} roughness={0} />
                </mesh>
            </Float>
            <Float speed={3} rotationIntensity={3} floatIntensity={1.5}>
                <mesh position={[-3, -1, 1]}>
                    <boxGeometry args={[0.4, 0.4, 0.4]} />
                    <meshStandardMaterial color="#FFA500" metalness={1} roughness={0} emissive="#FFA500" emissiveIntensity={0.5} />
                </mesh>
            </Float>
        </group>
    );
};

const ThreeHero = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#FFA500" />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <Geometries />
            </Canvas>
        </div>
    );
};

export default ThreeHero;
