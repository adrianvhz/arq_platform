import { Shape, BufferGeometry } from "three";
// import { Text } from "@react-three/drei";
// import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function Stairs2D({ position, rotation, stairs, n_pabellon, index }) {
	let half_width = stairs.width / 2;
	let half_length = stairs.length / 2;

	let shape = new Shape();
	shape.moveTo(-half_length, -half_width);
	shape.lineTo(half_length, -half_width);
	shape.lineTo(half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.closePath();

	// let shape = new Shape();
	// shape.moveTo(0, 0);
	// shape.lineTo(0, stairs.width);
	// shape.lineTo(stairs.length, stairs.width);
	// shape.lineTo(stairs.length, 0);
	// shape.closePath();

	return (
		<object3D
			position={position}
			rotation={rotation}
		>
			<group
				// position={[stairs.width / 2, 0, stairs.width]}
				// rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
				position={[stairs.width / 2, 0, 0]} 
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
			>
				{/* <line>
					<shapeGeometry
						args={[shape]}
					/>
					<lineBasicMaterial
						color={0x383838}
					/>
				</line> */}

				<lineSegments geometry={geometry}>
					<lineBasicMaterial color={0x000000} />
				</lineSegments>

				{/* <Text
					position={[0, 0, 3]}
					color="black"
					// font={InterBold}
					anchorX="center"
					anchorY="middle"
					fontSize={35}
					children={"ESCALERAS"}
				/> */}
			</group>
		</object3D>
	)
}

const shape = new Shape();
shape.moveTo(0, 0);
shape.lineTo(200, 0);

shape.lineTo(0, 60);
shape.lineTo(0, -60);

shape.lineTo(25, 60);
shape.lineTo(25, -60);

shape.lineTo(50, 60);
shape.lineTo(50, -60);

shape.lineTo(75, 60);
shape.lineTo(75, -60);

shape.lineTo(100, 60);
shape.lineTo(100, -60);

shape.lineTo(125, 60);
shape.lineTo(125, -60);

shape.lineTo(150, 60);
shape.lineTo(150, -60);

shape.lineTo(175, 60);
shape.lineTo(175, -60);

shape.lineTo(200, 60);
shape.lineTo(200, -60);

const geometry = new BufferGeometry();
geometry.setFromPoints(shape.getPoints());
