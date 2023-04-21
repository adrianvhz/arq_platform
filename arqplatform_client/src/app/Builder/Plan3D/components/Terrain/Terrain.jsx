// import { TextureLoader } from "three"
// import { useLoader } from "@react-three/fiber"

export default function Terrain({ position, rotation, width, length, color }) {
	return (
		<mesh
			position={[position[0], position[1] - 12.5, position[2]]}
			rotation={rotation}
		>
			{/* <planeGeometry
				args={[width, length]}
			/> */}

			<boxGeometry args={[width, length, 25]} />

			<meshStandardMaterial
				color={color}
			/>
		</mesh>
		
		// <directionalLight
		// 	args={[0xffffff, 0.5]}
		// 	position={[0, 0, 500]}
		// 	// shadow-mapSize={[2048, 2048]}
		// >
		// 	<mesh>
		// 		<boxGeometry args={[20, 20, 20]} />
		// 		<meshStandardMaterial />
		// 	</mesh>
		// </directionalLight>
		
		// <GradientTexture stops={[0, 0.8, 1]} colors={['#b7afaa', '#c3bcb8', '#cec9c6']} size={100} />
	)
}
