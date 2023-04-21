import { Color, Shape } from "three";

export default function Entrance({
	position,
	rotation,
	view,

	classroom
}) {
		const shape = new Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, classroom.width);
		shape.lineTo(classroom.length, classroom.width);
		shape.lineTo(classroom.length, 0);
		shape.lineTo(0, 0);

		const extrudeSettings = {
			steps: 2,
			depth: 7.5, // (grosor)
			bevelEnabled: false
		}
	return (
		<object3D
			position={position}
			rotation={rotation}
		>
			{view.roof
				? (
					<mesh // 110 + 30
						position={[0, 140, 0]}
						rotation={classroom.roof.rotation}
						// geometry={roof.geometry}
						material={classroom.roof.material}
					>
						<extrudeGeometry args={[shape, extrudeSettings]} />
					</mesh>
				)
				: null
			}
		</object3D>
	)
}

// pasillo
const position = [0, (2.2 * 50) + 30, (6.25 * 50) + 15];
// barandas
const position1 = [0, position[1], position[2] + 120] // corridor - width de muro de baranda

function Corridor(props) {
	const color = new Color(0xe5e5e5);

	return (
		<group>
			<mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
				<extrudeGeometry args={[shape, extrudeSettings]} />
				<meshStandardMaterial color={new Color("gray")} />
			</mesh>

			<mesh position={position1}>
				<extrudeGeometry args={[shape1, { depth: 10, bevelEnabled: false }]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</group>
	)
}






// Para pasillo
// el pasillo mide 2.4m (120)
const shape = new Shape();
shape.moveTo(0, 0);
shape.lineTo(0, 120);
shape.lineTo(415, 120);
shape.lineTo(415, 0);
shape.lineTo(0, 0);

const extrudeSettings = {
	steps: 2,
	depth: 7.5,
	bevelEnabled: false
}


// Para barandas        // 1.50m de alto
const shape1 = new Shape();
shape1.moveTo(0, 0);
shape1.lineTo(0, 75);
shape1.lineTo(415, 75);
shape1.lineTo(415, 0);
shape1.lineTo(0, 0);


// Para cerrar barandas
const shape2 = new Shape();
shape2.moveTo(0, 0);
shape2.lineTo(0, 75);
shape2.lineTo(120, 75);
shape2.lineTo(120, 0);
shape2.lineTo(0, 0);
