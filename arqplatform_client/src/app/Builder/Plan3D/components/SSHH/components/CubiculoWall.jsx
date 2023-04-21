import { DoubleSide, Color } from "three";
import { createWallSSHHShape } from "../../../common/createWallSSHHShape";

export default function CubiculoWall({
	position, separacion_cubiculos, cubiculo,
	cubiculoShape, extrudeSettings
}) {
	return (
		<group
			position={position}
		>
			{/* LEFT */}
			<mesh>
				<extrudeGeometry
					args={[cubiculoShape, extrudeSettings]}
				/>
				<meshStandardMaterial color={new Color(0xfffaf0)} />
			</mesh>

			{/* RIGHT */}
			<mesh
				position={[cubiculo.length + separacion_cubiculos, 0, 0]}
			>
				<extrudeGeometry
					args={[cubiculoShape, extrudeSettings]}
				/>
				<meshStandardMaterial color={new Color(0xfffaf0)} />
			</mesh>

		</group>
	)
}
