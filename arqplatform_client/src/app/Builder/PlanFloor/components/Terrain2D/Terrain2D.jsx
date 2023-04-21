import { Color, Shape } from "three";

export default function Terrain2D({ width, length }) {
	let half_width = width / 2;
	let half_length = length / 2;

	let shape = new Shape();
	shape.moveTo(-half_length, -half_width);
	shape.lineTo(half_length, -half_width);
	shape.lineTo(half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.closePath();

	return (
		<line
			rotation={[-Math.PI / 2, 0, 0]}
		>
			<shapeGeometry
				args={[shape]}
			/>
			<lineBasicMaterial
				color={new Color(0x3e3e3e)}
			/>
		</line>
	)
}
