import { useSelector } from "react-redux";
import { Shape, DoubleSide, Color } from "three";

export default function RoofSSHH({ position, rotation, length, width }) {
	let roof = useSelector(selectRoof);

	let thickness = 7.5;

	const shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, width);
	shape.lineTo(length, width);
	shape.lineTo(length, 0);
	shape.lineTo(0, 0);

	const extrudeSettings = {
		steps: 2,
		depth: thickness, // (grosor)
		bevelEnabled: false
	}

	return (
		<mesh
			position={position}
			rotation={rotation} 
			visible={roof}
		>
			<extrudeGeometry
				args={[shape, extrudeSettings]}
			/>
			<meshStandardMaterial
				color={new Color(0x56626f)}
				side={DoubleSide}
			/>
		</mesh>
	)
}

const selectRoof = state => state.building.roof;







// import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { Shape, Vector2, MathUtils, DoubleSide, BackSide, Color } from "three";

// export default function RoofSSHH({ position, retroceder }) {
// 	let roof = useSelector(state => state.building.roof);
// 	// increment_scale prop === la misma que escala de la pared (Wall). TODO: Hacerlo dinamica (global context)
// 	// let extra_roof = 50;
// 	let thickness = 3

// 	var shape, length, width;
// 	var pts = [];

// 	// length = 4 + (extra_roof * 2);
// 	length = 334; // 320
// 	width = retroceder + (40); // 200
	
// 	pts.push(new Vector2(0, 0));
// 	pts.push(new Vector2(0, width));
// 	pts.push(new Vector2(length, width));
// 	pts.push(new Vector2(length, 0));
// 	pts.push(new Vector2(0, 0));
// 	// pts.map(pt => pt.multiplyScalar(1));
// 	shape = new Shape(pts);

// 	var extrudeSettings = {
// 		steps: 2,
// 		depth: thickness, // (grosor)
// 		bevelEnabled: true,
// 		bevelSegments: 2,
// 		bevelThickness: 4, // default: 0.2
// 		// bevelSize: 0.1 // default: bevelThickness - 0.1
// 	}

// 	useEffect(() => {
// 		// geom.current.rotateX(MathUtils.degToRad(90));
// 		// geom.current.scale(1, 1, 1.3)
// 	});

// 	if (!roof) return null;

// 	return (
// 		<mesh
// 			// position={[-extra_roof, (2.5 * 50) + 5.7, -166]}
// 			// position={[0, (2.5 * 50) + 7.3, -retroceder - 7.5]} // -166
// 			position={[0, (2.5 * 50), 0]}
// 			rotation={[Math.PI / 2, 0,  0]} 
// 			scale={[1, 1.15, 1]}
// 		>
// 			<extrudeGeometry
// 				args={[shape, extrudeSettings]}
// 			/>
// 			<meshStandardMaterial
// 				color={new Color(0x56626f)}
// 				side={DoubleSide}
// 			/>
// 		</mesh>
// 	)
// }

