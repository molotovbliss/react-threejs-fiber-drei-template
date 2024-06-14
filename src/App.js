//import * as THREE from 'three'
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
	PerspectiveCamera,
	ContactShadows,
	OrbitControls,
	TorusKnot,
	Cloud,
	Plane,
	Box
} from '@react-three/drei';

import './styles.css';

const Scene = () => {
	const boxRef = useRef();
	const tRef = useRef();
	useFrame(() => {
		boxRef.current.rotation.y += 0.022;
		boxRef.current.rotation.x += 0.002;
		boxRef.current.rotation.z += 0.003;
		tRef.current.rotation.y += 0.002;
		tRef.current.rotation.x += 0.002;
		tRef.current.rotation.z += 0.003;
	});
	return (
		<group>
			<Box
				args={[100, 15, 10]}
				castShadow
				position={[0, 10, 0]}
				ref={boxRef}>
				<meshStandardMaterial
					attach="material"
					color="purple"
					metalness={0.1}
					roughtness={1.0}
					emissive={0.5}
				/>
			</Box>

			<Plane
				receiveShadow
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, -3, 0]}
				args={[1500, 1500]}>
				<meshStandardMaterial attach="material" color="tan" />
			</Plane>

			<mesh position={[0, 0, -20]} ref={boxRef}>
				<boxGeometry args={[20, 20, 10]} receiveShadow />
				<meshStandardMaterial
					attach="material"
					metalness={1.0}
					roughness={0.1}
					emissive={0.51}
				/>
			</mesh>

			<TorusKnot
				ref={tRef}
				castShadow
				scale={5}
				args={[1.5, 0.42, 128, 12]}
				position={[12, 12, 12]}>
				<meshStandardMaterial
					attach="material"
					metalness={0.85}
					roughness={0.05}
					color="#00ff69"
					emissive={0}
				/>
			</TorusKnot>
			<Cloud
				position={[10, 25, 10]}
				segments={80}
				width={20}
				depth={0.23}
				depthTest={0}
				color="#00ff69"
			/>
			<Cloud
				position={[-10, 15, 0]}
				segments={40}
				width={10}
				depth={0.25}
				depthTest={0}
				color="#000000"
			/>
		</group>
	);
};

export default function App() {
	return (
		<Canvas
			shadows
			camera={{ position: [13, 2, 15], fov: 80 }}>
			<directionalLight
				intensity={1.0}
				castShadow
				shadow-mapSize-height={512}
				shadow-mapSize-width={512}
			/>

			<fog attach="fog" args={['black', 0, 175]} />
			<ambientLight intensity={0.2} />

			{/* <pointLight position={[5, 5, 5]} color="#00ff69" /> */}
			{/* <Environment ground={-0.5} preset="dawn" far={10} near={100} /> */}

			{/* <React.Suspense fallback={null}> */}

			<ContactShadows
				resolution={1024}
				position={[-1, 0, 3]}
				scale={33}
				blur={2}
				opacity={1}
				rotation={[Math.PI / 3, 0, 0]}
				far={34}
			/>

			<OrbitControls />
			<PerspectiveCamera position={[50, 40, 50]} resolution={255} />

			<Scene />
		</Canvas>
	);
}
