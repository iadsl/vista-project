
import React, { useState, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Orb from './Orb';


const communityAreas = [
  { id: 1, name: "Rogers Park" },
  { id: 2, name: "West Ridge" },
  { id: 3, name: "Uptown" },
  { id: 4, name: "Lincoln Square" },
  { id: 5, name: "North Center" },
  { id: 6, name: "Lake View" },
  { id: 7, name: "Lincoln Park" },
  { id: 8, name: "Near North Side" },
  { id: 9, name: "Edison Park" },
  { id: 10, name: "Norwood Park" },
  { id: 11, name: "Jefferson Park" },
  { id: 12, name: "Forest Glen" },
  { id: 13, name: "North Park" },
  { id: 14, name: "Albany Park" },
  { id: 15, name: "Portage Park" },
  { id: 16, name: "Irving Park" },
  { id: 17, name: "Dunning" },
  { id: 18, name: "Montclare" },
  { id: 19, name: "Belmont Cragin" },
  { id: 20, name: "Hermosa" },
  { id: 21, name: "Avondale" },
  { id: 22, name: "Logan Square" },
  { id: 23, name: "Humboldt Park" },
  { id: 24, name: "West Town" },
  { id: 25, name: "Austin" },
  { id: 26, name: "West Garfield Park" },
  { id: 27, name: "East Garfield Park" },
  { id: 28, name: "Near West Side" },
  { id: 29, name: "North Lawndale" },
  { id: 30, name: "South Lawndale" },
  { id: 31, name: "Lower West Side" },
  { id: 32, name: "Loop" },
  { id: 33, name: "Near South Side" },
  { id: 34, name: "Armour Square" },
  { id: 35, name: "Douglas" },
  { id: 36, name: "Oakland" },
  { id: 37, name: "Fuller Park" },
  { id: 38, name: "Grand Boulevard" },
  { id: 39, name: "Kenwood" },
  { id: 40, name: "Washington Park" },
  { id: 41, name: "Hyde Park" },
  { id: 42, name: "Woodlawn" },
  { id: 43, name: "South Shore" },
  { id: 44, name: "Chatham" },
  { id: 45, name: "Avalon Park" },
  { id: 46, name: "South Chicago" },
  { id: 47, name: "Burnside" },
  { id: 48, name: "Calumet Heights" },
  { id: 49, name: "Roseland" },
  { id: 50, name: "Pullman" },
  { id: 51, name: "South Deering" },
  { id: 52, name: "East Side" },
  { id: 53, name: "West Pullman" },
  { id: 54, name: "Riverdale" },
  { id: 55, name: "Hegewisch" },
  { id: 56, name: "Garfield Ridge" },
  { id: 57, name: "Archer Heights" },
  { id: 58, name: "Brighton Park" },
  { id: 59, name: "McKinley Park" },
  { id: 60, name: "Bridgeport" },
  { id: 61, name: "New City" },
  { id: 62, name: "West Elsdon" },
  { id: 63, name: "Gage Park" },
  { id: 64, name: "Clearing" },
  { id: 65, name: "West Lawn" },
  { id: 66, name: "Chicago Lawn" },
  { id: 67, name: "West Englewood" },
  { id: 68, name: "Englewood" },
  { id: 69, name: "Greater Grand Crossing" },
  { id: 70, name: "Ashburn" },
  { id: 71, name: "Auburn Gresham" },
  { id: 72, name: "Beverly" },
  { id: 73, name: "Washington Heights" },
  { id: 74, name: "Mount Greenwood" },
  { id: 75, name: "Morgan Park" },
  { id: 76, name: "O'Hare" },
  { id: 77, name: "Edgewater" }
];


const generatePositions = (count, radius = 10) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    // Spherical distribution
    const phi = Math.acos(-1 + (2 * i) / count); // Distribute points somewhat evenly
    const theta = Math.sqrt(count * Math.PI) * phi;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    // Add some randomness to prevent perfect alignment
    const randomFactor = 0.5;
    positions.push(
      new THREE.Vector3(
        x + (Math.random() - 0.5) * randomFactor,
        y + (Math.random() - 0.5) * randomFactor,
        z + (Math.random() - 0.5) * randomFactor
      )
    );

    // Alternative: Simple Cube distribution
    // const x = (Math.random() - 0.5) * radius * 2;
    // const y = (Math.random() - 0.5) * radius * 2;
    // const z = (Math.random() - 0.5) * radius * 2;
    // positions.push(new THREE.Vector3(x, y, z));
  }
  return positions;
};

const Lines = ({ positions, color = 'white', lineWidth = 0.5 }) => {
  // Create lines connecting all points (can be performance intensive for many points)
  // A simpler approach might connect each point to the center (0,0,0)
  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const lineVertices = [];

    // Connect every point to every other point (N*(N-1)/2 lines)
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        lineVertices.push(...positions[i].toArray(), ...positions[j].toArray());
      }
    }

   

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));
    return geometry;
  }, [positions]);

  if (!linesGeometry) return null;

  return (
    <lineSegments geometry={linesGeometry}>
      <lineBasicMaterial color={color} linewidth={lineWidth} transparent opacity={0.4} />
    </lineSegments>
  );
};


const Glow = ({ position,  color = '#6099ff' }) => {
  return (
    <sprite position={position}>
      <spriteMaterial
        attach="material"
        map={new THREE.TextureLoader().load('/glow.png')}
        transparent
        opacity={0.4}
        color={color}
      />
    </sprite>
  );
};


const Background = () => {
  return (
    <>
      <color attach="background" args={['#030817']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

const ChicagoOrbsVisualization = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null); 

  // Generate positions only once
  const orbPositions = useMemo(
    () => generatePositions(communityAreas.length, 10), 
    [] 
  );

  const handleOrbClick = (name) => {
    setSelectedArea(name);
  };

  
  const textDisplayStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    fontSize: '16px',
    fontFamily: 'sans-serif',
    zIndex: 100, 
    pointerEvents: 'none', 
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#030817' }}>
      {selectedArea && (
        <div style={textDisplayStyle}>
          Selected: {selectedArea}
        </div>
      )}
      
      {hoveredArea && !selectedArea && (
        <div style={{...textDisplayStyle, top: '70px'}}>
          Hovering: {hoveredArea}
        </div>
       )} 

      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <Background />

       
        <ambientLight intensity={0.8} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#ffffff" />
        <pointLight position={[-15, -15, -15]} intensity={1.5} color="#c0e0ff" />
        <directionalLight position={[0, 10, 5]} intensity={1} color="#eeeeff" />
        <hemisphereLight skyColor="#93c5fd" groundColor="#3730a3" intensity={0.7} />

       
        <Environment preset="city" />

        
        <Glow position={[0, 0, 0]} size={20} color="#4070f4" />

        
        <Suspense fallback={null}>
          {communityAreas.map((area, index) => (
            <Orb
              key={area.id}
              position={orbPositions[index]}
              area={area}
              onClick={handleOrbClick}
              color={`hsl(${210 + (index / communityAreas.length) * 140}, 80%, 65%)`}
               onHover={setHoveredArea} 
            />
          ))}
          
          <Lines positions={orbPositions} color="#ffffff" />
        </Suspense>

        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ChicagoOrbsVisualization;