import { createWallSSHHShape } from "../../../common/createWallSSHHShape";
import BathGroup from "./BathGroup";
import CubiculoWall from "./CubiculoWall";

export default function Cubicles({
	amount, bathroom, increment_scale, wall_thickness
}) {
	//////
	const thickness = 3;
	const cubiculo = {
		length: bathroom.toilet,
		height: 125
	}

	const cubiculoShape = createWallSSHHShape(cubiculo.length, cubiculo.height);

	const extrudeSettings = {
		steps: 2,
		depth: thickness,
		bevelEnabled: false
	}
	/////

	let separacion_cubiculos = 0.2; // ligera separacion entre las paredes de los cubiculos, compensacion

	const baths_group = [];

	// let z = -bathroom.cubicleWidth - wall_thickness;
	let z = thickness;

	for (let i = 0; i < amount; i++) {
		baths_group.push({
			position: [0, 0, z]
		});
		z += bathroom.cubicleWidth + thickness;
		// z -= bathroom.cubicleWidth + wall_thickness + 30;
	}
	return (
		<group
			position={[(415 / 2) - ((cubiculo.length * 2) / 2), 0, wall_thickness]}
			// position={[95, 0, -bathroom.pasillo_de_entrada - wall_thickness]}
			// position={[-bathroom.pasillo_de_entrada / 2 - separacion_cubiculos, 0, -bathroom.pasillo_de_entrada - wall_thickness]}
		>
			<CubiculoWall
				position={[0, 0, 0]}
				separacion_cubiculos={separacion_cubiculos}
				cubiculoShape={cubiculoShape}
				extrudeSettings={extrudeSettings}
				cubiculo={cubiculo}
			/>
				{baths_group.map((el, index) => (
					<BathGroup
						key={index}
						position={el.position}
						increment_scale={increment_scale}
						wall_thickness={wall_thickness}
						bathroom={bathroom}
						separacion_cubiculos={separacion_cubiculos}

						cubiculoShape={cubiculoShape}
						extrudeSettings={extrudeSettings}
						cubiculo={cubiculo}
					/>
				))}
		</group>
	)
}
