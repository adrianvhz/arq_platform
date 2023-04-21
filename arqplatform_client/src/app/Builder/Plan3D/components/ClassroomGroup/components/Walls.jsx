import { useSelector } from "react-redux";
import { Base, Subtraction, Geometry } from "@react-three/csg";
// import { createSelector } from "reselect";

export default function Walls({ walls, level }) {
	const color = useSelector(selectColor);

	const material = color
		? walls.material[level]
		: walls.material["noColor"];

	return (
		<group>
			{/* <mesh
				position={walls.position} geometry={walls.geometry}
				rotation={walls.rotation} material={material}
			/> */}
			
			<mesh material={material}>
				<Geometry>
					<Base
						position={walls.position}
						rotation={walls.rotation}
						geometry={walls.geometry}
					/>
					<Subtraction
						position={walls.door.position}
						geometry={walls.door.geometry}
					/>
					<Subtraction
						position={walls.window.position.frontLeft}
						geometry={walls.window.geometry}
					/>
					<Subtraction
						position={walls.window.position.frontRight}
						geometry={walls.window.geometry}
					/>
					<Subtraction
						position={walls.window.position.backLeft}
						geometry={walls.window.geometry}
					/>
					<Subtraction
						position={walls.window.position.backRight}
						geometry={walls.window.geometry}
					/>
				</Geometry>
			</mesh>

			{/* COMPLETE SPACE WALL */}
			<mesh
				position={walls.completeWalls.position[0]}
				geometry={walls.completeWalls.geometry}
				material={material}
			/>
			<mesh
				position={walls.completeWalls.position[1]}
				geometry={walls.completeWalls.geometry}
				material={material}
			/>
		</group>
	)
}

const selectColor = state => state.building.colorForLevel;






{/* <>
			<mesh material={material}>

				<Subtraction>
					<Subtraction a>
						{/* WALLS OBJECT */}
		// 				<Base
		// 					a
		// 					position={walls.position}
		// 					rotation={walls.rotation}
		// 					geometry={walls.geometry}
		// 				/>

		// 				{/* CUT DOOR OBJECT */}
		// 				<Base
		// 					b
		// 					position={walls.door.position}
		// 					geometry={walls.door.geometry}
		// 				/>
		// 			</Subtraction>

		// 			{/* CUT WINDOW OBJECT */}
		// 			<Base
		// 				b
		// 				position={walls.window.position}
		// 				geometry={walls.window.geometry}
		// 			/>
		// 		</Subtraction>
		// 		{/* <MeshWallColor color={color} /> */}
		// 	</mesh>

		// 	{/* COMPLETE SPACE WALL */}
		// 	<mesh
		// 		position={walls.completeWalls.position[0]}
		// 		geometry={walls.completeWalls.geometry}
		// 		material={material}
		// 	/>
		// 	<mesh
		// 		position={walls.completeWalls.position[1]}
		// 		geometry={walls.completeWalls.geometry}
		// 		material={material}
		// 	/>
		// </> */}
