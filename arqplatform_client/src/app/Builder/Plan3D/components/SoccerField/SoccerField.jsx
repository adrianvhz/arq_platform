import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// import { TextureLoader } from "three";


export default function SoccerField({ position, rotation, length, width, color }) {
	// const terrainTexture = useLoader(TextureLoader, "/textures/terrain.jpg");

	// var z = 0;

	// if (amount_classrooms <= 5) {
	// 	z = (terrain.width / 2) - (WIDTH / 2) - classroom.width - (1.80 * increment_scale);
	// } else {
	// 	z = (terrain.width / 2) - (WIDTH / 2) - classroom.width - (2.40 * increment_scale);
	// }

	return (
		<BaskquetBallCourt position={position} rotation={[0, Math.PI / 2, 0]} />
		// <mesh
		// 	position={position}  // x = (-terrain.width / 2) + (LENGTH / 2) + classroom.length
		// 	rotation={rotation}
		// >
		// 	<planeGeometry
		// 		args={[length, width]}
		// 	/>
		// 	<meshStandardMaterial color={color} />
		// </mesh>
	)
}

function BaskquetBallCourt({ position, rotation }) {
	const { nodes, materials } = useLoader(GLTFLoader, "/models/basketball_court/scene.gltf");

	return (
		<group position={position} rotation={rotation} scale={[45, 45, 45]}>
			<mesh geometry={nodes["Object_4"].geometry} material={materials["SimpleCity_Texture"]} />
		</group>
	)
}

useLoader.preload(GLTFLoader, "/models/basketball_court/scene.gltf");
