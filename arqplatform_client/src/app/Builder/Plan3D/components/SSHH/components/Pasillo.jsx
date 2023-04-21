import { Shape, Color, DoubleSide } from "three";

export default function Pasillo({ args, position, rotation, color }) {
	let [width, length] = args;

	let shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, width);
	shape.lineTo(length, width);
	shape.lineTo(length, 0);
	shape.lineTo(0, 0);

	return (
		<mesh
			position={position}
			rotation={rotation}
		>
			{/* <planeGeometry
				args={args}
			/> */}
			<shapeGeometry args={[shape]} />
			<meshStandardMaterial
				side={DoubleSide}
				color={new Color(color)}
			/>
		</mesh>
	)
}
