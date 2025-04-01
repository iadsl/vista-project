// src/Orb.js
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Orb = ({ position, area, onClick, color = 'dodgerblue' }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false); 
 

  useFrame((state, delta) => {
    if (meshRef.current) {
       meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const handleClick = (event) => {
    event.stopPropagation(); 
    setClicked(true); 
    onClick(area.name); 
   
    setTimeout(() => setClicked(false), 300);
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer'; 
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto'; 
  };

  const sphereColor = clicked ? 'red' : hovered ? 'lightblue' : color;
  const scale = hovered ? 1.2 : 1; 

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={scale}
    >
      <sphereGeometry args={[0.5, 32, 32]} /> 
      <meshStandardMaterial
        color={sphereColor}
        roughness={0.5}
        metalness={0.3}
        emissive={hovered ? sphereColor : 'black'} 
        emissiveIntensity={hovered ? 0.5 : 0}
       />
    </mesh>
  );
};

export default Orb;