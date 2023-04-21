import { Color, DoubleSide, Shape } from "three";

export default function WindowGeometry() {
    let width = 0.75 * 50;
	let height = 0.70 * 50;

	const shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, height);
	shape.lineTo(width, height);
	shape.lineTo(width, 0);
    shape.lineTo(0, 0);

	return (
		<extrudeGeometry args={[shape, { depth: 8 }]} />
	)
}
