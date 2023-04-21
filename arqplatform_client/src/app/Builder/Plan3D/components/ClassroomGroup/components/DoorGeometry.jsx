import { Color, DoubleSide, Shape } from "three";

export default function DoorGeometry() {
	let width = 50;
	let length = 100;

	const shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, length);
	shape.lineTo(width, length);
	shape.lineTo(width, 0);
	shape.lineTo(0, 0);

	return <extrudeGeometry args={[shape, { depth: 7.5 }]} />
}


// return (
// 	// <mesh position={[0, 0, 327.9]}>
// 	// <mesh position={[20, 0, 320]}>
// 		<extrudeGeometry args={[shape, { depth: 8 }]} />
// 		// <meshStandardMaterial color={new Color(0xdeb887)} side={DoubleSide} />
// 	// </mesh>
// )
