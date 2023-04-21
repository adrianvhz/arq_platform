import { ExtrudeGeometry, MeshStandardMaterial, Shape } from "three";
import { createWallShape } from "../../common/createWallShape";
import { WALL_THICKNESS, INCREMENT_SCALE as increment_scale } from "./app.settings";

export class Bathroom {
	public length: number;
	public width: number;
	public height: number;

	public handwash: number;
	public toilet: number;
	public cubicleWidth: number;
	public corridor: number;
	public entranceCorridor: number;

	public walls: Walls;

	constructor() {
		this.length = 415;
		this.height = 132.1;

		this.handwash = 0.60 * increment_scale;
		this.toilet = 1.40 * increment_scale; // largo del cubiculo
		this.cubicleWidth = 0.85 * increment_scale; // ancho del baño (cubiculo y lavamanos)
		this.corridor = 1.20 * increment_scale;
		this.entranceCorridor = 1 * increment_scale;

		this.walls = new Walls(this);
	}

	set _handwash(value: number) { // Seria algo como crear todo la clase School una vez y cambiar los parametros con setters segun se requiera por proyecto (maqueta).
		this.handwash = value;
	}

	// set ...
}

class Walls {
	public position: number[];
	public rotation: number[];

	public geometry: ExtrudeGeometry;
	public material: MeshStandardMaterial;

	public entrance: Entrance;

	private _length: number;
	private _height: number;
	private _totalWidth: number;

	private _cubicleWidth: number;

	constructor(bathroom: any) {
		this._length = bathroom.length;
		this._height = bathroom.height;
		this._cubicleWidth = bathroom.cubicleWidth;

		this.position = [0, 132.1, 0];
		this.rotation = [Math.PI / 2, 0, 0];

		this.material = new MeshStandardMaterial({ color: 0x5f6979 });

		this.entrance = new Entrance(bathroom);
	}

	setGeometry(width: number) {
		const shape = createWallShape(
			this._length,
			width,
			WALL_THICKNESS
		);

		const extrudeSettings = {
			steps: 2, // default: 1
			depth: this._height,
			bevelEnabled: false,
		}

		this.geometry = new ExtrudeGeometry(shape, extrudeSettings);
	}

	setCubicles(cubicles: number) {
		const totalWidth = (this._cubicleWidth * cubicles) + ((cubicles + 1) * 3) + (WALL_THICKNESS * 2) + 50;
		this._totalWidth = totalWidth;
		this.setGeometry(totalWidth);
		this.entrance.position[2] = totalWidth - 7.5;
	}
}

class Entrance {
	public position: number[];
	public geometry: ExtrudeGeometry;

	constructor(bathroom: Bathroom) {
		this.position = [(bathroom.length / 2) - (bathroom.entranceCorridor / 2), 0, 0] // z = 220 - 7.5 == 212.5 (el position[2] se cambia automaticamente en bathroom.walls.setCubicles())
		this.setGeometry(132, bathroom.entranceCorridor, 8);
	}

	setGeometry(length: number, width: number, thickness: number) {
		const shape = new Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, length);
		shape.lineTo(width, length);
		shape.lineTo(width, 0);
		shape.lineTo(0, 0);

		this.geometry = new ExtrudeGeometry(shape, { depth: thickness });
	}
}
