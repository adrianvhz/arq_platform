import { BackSide, DoubleSide, Shape } from "three";

export default function Step({ position, stairs }) {
	let { width, riser, tread } = stairs.flight;

	let shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, riser);
	shape.lineTo(width, riser);
	shape.lineTo(width, 0);
	shape.lineTo(0, 0);

	return (
		<mesh position={position}>
			{/* <boxGeometry args={[width, riser, tread]} /> */}
			<extrudeGeometry args={[shape, { bevelEnabled: false, depth: tread }]} />
			<meshStandardMaterial />
		</mesh>
	)
}
