import { Color, Shape } from "three";
import { Text } from "@react-three/drei";
import { WALL_THICKNESS } from "../../../Plan3D/components/Pabellones/app.settings";
// import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function Classroom2D({ position, rotation, classroom, view, floor }) {
	// if (view.view2DModule === 1 && floor > 1) return null;
	// else if (view.view2DModule > 1 && floor === 1) return null; // este hace que las aulas del piso 1 no se muestren cuando la vista 2d esta en view2dModule > 1

	const shape1 = new Shape();
	shape1.moveTo(0, 0);
	shape1.lineTo(0, classroom.width);
	shape1.lineTo(classroom.length, classroom.width);
	shape1.lineTo(classroom.length, 0);
	shape1.closePath();

	const shape2 = new Shape();
	shape2.moveTo(0, 0);
	shape2.lineTo(0, classroom.width - (WALL_THICKNESS * 6));
	shape2.lineTo(classroom.length - (WALL_THICKNESS * 6), classroom.width - (WALL_THICKNESS * 6));
	shape2.lineTo(classroom.length - (WALL_THICKNESS * 6), 0);
	shape2.closePath();

	const length = 30;
	const positionC = length / 2;
	const offset = positionC + 3;

	return (
		<group
			position={position}
			rotation={rotation}
		>
			<line
				position={[0, 0, classroom.width]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<shapeGeometry
					args={[shape1]}
				/>
				<lineBasicMaterial linewidth={2}
					color={new Color(0x383838)}
				/>
			</line>

			<line
				position={[WALL_THICKNESS * 3, 0, classroom.width - (WALL_THICKNESS * 3)]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<shapeGeometry
					args={[shape2]}
				/>
				<lineBasicMaterial
					color={new Color(0x383838)}
				/>
			</line>

			{/**
			 * Posicion real = 18; (36 / 2);
			 * Posicion para dar un espacio = 21 (momentaneo);
			 */}
			{/* Top left */}
			<mesh position={[classroom.length - offset, 0, positionC]}> 
				<boxGeometry args={[length, 1, length]} />
				<pointsMaterial color={0x000000} />
			</mesh>

			{/* Top right */}
			<mesh position={[classroom.length - offset, 0, classroom.width - positionC]}>
				<boxGeometry args={[length, 1, length]} />
				<pointsMaterial color={0x000000} />
			</mesh>

			{/* Bottom left */}
			<mesh position={[offset, 0, positionC]}>
				<boxGeometry args={[length, 1, length]} />
				<pointsMaterial color={0x000000} />
			</mesh>

			{/* Bottom right */}
			<mesh position={[offset, 0, classroom.width - positionC]}>
				<boxGeometry args={[length, 1, length]} />
				<pointsMaterial color={0x000000} />
			</mesh>

			{/* de los centros */}
			<mesh position={[classroom.length / 2, 0, positionC]}>
				<boxGeometry args={[length, 1, length]} />
				<pointsMaterial color={0x000000} />
			</mesh>

			<mesh position={[classroom.length / 2, 0, classroom.width - positionC]}>
				<boxGeometry args={[length, 1, length]} />
				<pointsMaterial color={0x000000} />
			</mesh>

			{/* <mesh
				position={[0, 0, ((50 * 6.25) + (WALL_THICKNESS * 2))]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<shapeGeometry
					args={[shape]}
					ref={fillGeom}
				/>
				<meshBasicMaterial
					color={0xb2b2b2}	
				/>
			</mesh> */}

			<Text
				position={[200, 1, 162]}
				rotation={[-Math.PI / 2, 0, 0]}
				color="black"
				// font={InterBold}
				anchorX="center"
				anchorY="middle"
				fontSize={55}
				children={"   SALA\nCLASES"}
			/>
		</group>
	)
}
