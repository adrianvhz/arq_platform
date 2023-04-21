import WallSSHH from "./components/WallSSHH";
import Cubicles from "./components/Cubicles";
import Pasillo from "./components/Pasillo";
import RoofSSHH from "./components/RoofSSHH";
import { castEvenNum } from "../../../../../../lib/castEvenNumber";
import { INCREMENT_SCALE, WALL_THICKNESS } from "../Pabellones/app.settings";
// import StairsView from "../../../components/StairsView/StairsView";
// import WallsClass from "./components/WallsClass";

export default function SSHH({
	position, bathroom, baths,
	classroom, view,
}) {
	const cubicles = castEvenNum(baths) / 2;

	bathroom.walls.setCubicles(cubicles);

	return (
		<group
			position={position}
		>
			<WallSSHH
				walls={bathroom.walls}
			/>

			{/* 1 metro (para ver la dimension del pasillo) */}
			{/* <mesh position={[167.6, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[50, 50]} />
				<meshBasicMaterial side={DoubleSide} />
			</mesh> */}

			<Cubicles
				bathroom={bathroom}
				amount={cubicles}
				increment_scale={INCREMENT_SCALE}
				wall_thickness={WALL_THICKNESS}
				// total_width={walls.back.length}
			/>

			{/* PASILLO DE ENTRADA */}
			<Pasillo
				args={[bathroom.entranceCorridor, classroom.length]}
				position={[
					0,
					0.3,
					WALL_THICKNESS + ((bathroom.cubicleWidth * cubicles) + ((cubicles + 1) * 3))
				]}
				rotation={[Math.PI / 2, 0, 0]}
				color={0x3d3d3d}
			/>

			{/* PASILLO LEFT */}
			{/* <Pasillo
				args={[walls.sides.length, pasillo]}
				position={[0, 0.01, (-walls.sides.length / 2) - 0.5]}
				rotation={[-Math.PI / 2, 0, 0]}
				color={0x3d3d3d}
			/> */}

			{/* PASILLO RIGTH */}
			{/* <Pasillo
				args={[walls.sides.length, pasillo]}
				position={[inodoro + WALL_THICKNESS + 1, 0.01, (-walls.sides.length / 2) - 0.5]}
				rotation={[-Math.PI / 2, 0, 0]}
				color={0x3d3d3d}
			/> */}

			<RoofSSHH
				position={[0, classroom.height + 30, 0]}
				rotation={[Math.PI / 2, 0,  0]}
				length={classroom.length}
				width={classroom.width}
			/>
		</group>
	)
}
