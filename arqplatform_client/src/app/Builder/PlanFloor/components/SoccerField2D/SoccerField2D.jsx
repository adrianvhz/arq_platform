import { Shape, Color, BufferGeometry } from "three";
import { Text } from "@react-three/drei";
import { useSelector } from "react-redux";
// import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function SoccerField2D({ position, rotation, length, width }) {
	console.log(position, rotation, length, width)
	const floor = useSelector(state => state.building.floor1);

	const half_width = width / 2;
	const half_length = length / 2;

	const shape = new Shape();
	shape.moveTo(-half_length, -half_width);
	shape.lineTo(half_length, -half_width);
	shape.lineTo(half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.closePath();

	const vertice = new Shape();
	vertice.moveTo(0, 0);
	vertice.lineTo(30, 0);
	vertice.lineTo(30, 10);
	// vertice.lineTo(0, 10);
	// vertice.lineTo(0, 20);
	// vertice.lineTo(30, 20);
	// vertice.lineTo(30, 10);
	vertice.closePath();


	const geo = new BufferGeometry().setFromPoints(vertice.getPoints());

	return (
		<group
			position={position}
			rotation={rotation}
			visible={floor}
		>
			<mesh>
				<planeGeometry
					args={[length, width]}
				/>
				<meshStandardMaterial
					wireframe
				/>
			</mesh>

			<line
			>
				<shapeGeometry args={[shape]} />
				<lineBasicMaterial
					color={new Color(0x000000)}
				/>
			</line>

			{/* vertices */}
			<mesh position={[half_length, 0, 0]}>
				<planeGeometry args={[40, 150]} />
				<meshStandardMaterial color="gray" />
			</mesh>

			<mesh position={[-half_length, 0, 1]}>
				<planeGeometry args={[40, 150]} />
				<meshStandardMaterial color="gray" />
			</mesh>

			<Text
				position={[0, 10, 3]}
				rotation={[Math.PI, Math.PI, 0]}
				color={0x000000}
				// font={InterBold}
				anchorX="center"
				anchorY="middle"
				fontSize={70}
				children={"Multicancha\n      420m²"}
			/>
		</group>
	)
}
