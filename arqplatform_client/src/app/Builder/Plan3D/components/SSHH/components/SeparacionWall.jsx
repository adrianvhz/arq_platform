import { Color, DoubleSide } from "three";
import { createWallSSHHShape } from "../../../common/createWallSSHHShape";

export default function SeparacionWall({
	position, rotation, bathroom, wall_thickness
}) {
	let separacion = {
		length: bathroom.cubicleWidth,
		height: 125
	}

	let separacionShape = createWallSSHHShape(separacion.length, separacion.height);

	let extrudeSettings = {
		steps: 2, // default: 1
		depth: 3, // default: 1
		bevelEnabled: false
	}

	return ( // pared de separacion vertical
		<mesh
			position={position}
			rotation={rotation}
		>
			<extrudeGeometry
				args={[separacionShape, extrudeSettings]}
			/>
			<meshStandardMaterial
				color={new Color(0xfffaf0)}
				side={DoubleSide}
			/>
		</mesh>
	)
}
