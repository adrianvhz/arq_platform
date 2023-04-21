import { Color, DoubleSide, ExtrudeGeometry, MeshStandardMaterial } from "three";
import { createWallShape } from "../../../../common/createWallShape";
import { Door } from "./door-class";
import { Window } from "./window-class";
import { CompleteWalls } from "./completeWalls";
import { WALL_THICKNESS, INCREMENT_SCALE as increment_scale } from "../../app.settings";

export class Walls {
	position: number[];
	rotation: number[];

	geometry: ExtrudeGeometry;
	material: any;

	door: Door;
	window: Window;
	completeWalls: CompleteWalls;

	constructor(classroom: any) {
		this.position = [0, 0, classroom.width];
		this.rotation = [Math.PI / - 2, 0, 0];

		this.material = {
			inicial: new MeshStandardMaterial({ color: new Color(0x847a67).convertSRGBToLinear() }),
			primaria: new MeshStandardMaterial({ color: new Color(0x6c7aab).convertSRGBToLinear() }),
			secundaria: new MeshStandardMaterial({ color: new Color(0x8d9a75).convertSRGBToLinear() }),
			noColor: new MeshStandardMaterial()
		}

		this.window = new Window(classroom);
		this.door = new Door(classroom);
		this.completeWalls = new CompleteWalls(classroom);

		this.setGeometry(classroom.length, classroom.width, classroom.height);
	}

	setGeometry(length: number, width: number, height: number) {
		const shape = createWallShape(length, width, WALL_THICKNESS);
		const extrudeSettings = {
			steps: 2, // default: 1
			depth: height,
			bevelEnabled: false,
			bevelSegments: 3, // esto no afecta el grosor, default: 3
			bevelThickness: 0.2, // default: 0.2
			// bevelSize: 0.1 // default: bevelThickness - 0.1
		}

		this.geometry = new ExtrudeGeometry(shape, extrudeSettings);
	}
}
