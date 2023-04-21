import { Base, Geometry, Subtraction } from "@react-three/csg";
// import EntranceGeometry from "./EntranceGeometry";

export default function WallSSH({ walls }) {
	return (
		// <mesh
		// 	position={walls.position} geometry={walls.geometry}
		// 	rotation={walls.rotation} material={walls.material}
		// />

		<mesh material={walls.material}>
			<Geometry>
				<Base
					position={walls.position}
					rotation={walls.rotation}
					geometry={walls.geometry}
				/>
				<Subtraction
					position={walls.entrance.position} // restar el 7.5 del width del muro
					geometry={walls.entrance.geometry}
				/>
			</Geometry>
		</mesh>
	)
}
