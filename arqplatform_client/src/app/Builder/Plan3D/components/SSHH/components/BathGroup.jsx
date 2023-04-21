import CubiculoWall from "./CubiculoWall";
import SeparacionWall from "./SeparacionWall";
// import Lavamanos from "./Lavamanos";

export default function BathGroup({
	position, bathroom, increment_scale, wall_thickness, separacion_cubiculos,
	cubiculoShape, extrudeSettings, cubiculo
}) {
	// let common_z = (bathroom.lavamanos / 2) + wall_thickness + (bathroom.ancho_de_cubiculo - bathroom.lavamanos) / 2;

	let common_z = -bathroom.ancho_de_cubiculo / 2;

	// let lavamanos_pos = {
	// 	left: [
	// 		// (-bathroom.lavamanos / 2) - bathroom.corridor - bathroom.inodoro,
	// 		(-bathroom.handwash / 2),
	// 		0,
	// 		common_z
	// 	],
	// 	rigth: [
	// 		(bathroom.handwash / 2) + bathroom.corridor + bathroom.toilet + 0.5,
	// 		0,
	// 		common_z
	// 	]
	// }

	return (
		<group position={position}>
			<SeparacionWall
				position={[cubiculo.length + 1.5, 0, 0]}
				rotation={[0, Math.PI / -2, 0]}
				bathroom={bathroom}
				wall_thickness={wall_thickness}
				increment_scale={increment_scale}
			/>
			<CubiculoWall
				position={[0, 0, bathroom.cubicleWidth]}
				separacion_cubiculos={separacion_cubiculos}
				cubiculoShape={cubiculoShape}
				extrudeSettings={extrudeSettings}
				cubiculo={cubiculo}
			/>


			{/* <Lavamanos
				position={lavamanos_pos.left}
				bathroom={bathroom}
			/>
			
			<Lavamanos
				position={lavamanos_pos.rigth}
				bathroom={bathroom}
			/> */}
		</group>
	)
}