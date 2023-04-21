import { MeshStandardMaterial, ExtrudeGeometry, Shape } from "three";
import { WALL_THICKNESS, INCREMENT_SCALE as increment_scale } from "../../app.settings";

export class Columns {
	private _length: number;
	private _height: number;
	public positions: number[][];
	public rotation: number[];
	public material: MeshStandardMaterial;
	public geometry: ExtrudeGeometry;
	// wall_thickness = 7.5;

	constructor(classroom: any) {
		// (0.30)^2
		this._length = 0.30 * increment_scale;
		this._height = 2.2 * increment_scale;

		// // (0.30)^2
		// this._length = classroom.columns.length;
		// this._width = classroom.columns.width;
		// this._height = classroom.columns.height;

		this.rotation = [-Math.PI / 2, 0, 0];
		this.material = new MeshStandardMaterial(); // shadowSide={CullFaceFrontBack} map={columnTexture} normalMap={columnNormalTexture}
		
		this.setGeometry();
		this.setPositions(classroom);
	}

	setLength(length: number) {
		this._length = length * increment_scale;
	}

	setGeometry() {
		const shape = new Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, this._length);
		shape.lineTo(this._length, this._length);
		shape.lineTo(this._length, 0);
		shape.lineTo(0, 0);

		const extrudeSettings = {
			steps: 8,
			depth: this._height,
			bevelEnabled: false
		}

		this.geometry = new ExtrudeGeometry(shape, extrudeSettings);
	}

	setPositions(classroom: any) {
		const pos = {
			x: [
				0.8, // (avoid flicker)
				(classroom.length / 2) - WALL_THICKNESS,
				classroom.length - 15.8, // (avoid flicker)

				// 0,
				// (classroom.length / 2) - wall_thickness,
				// classroom.length - 15,
			],
			y: 0,
			z: {
				front: classroom.width - 0.8, // (avoid flicker) // VERTICAL
				back: 15.8 // (avoid flicker) // VERTICAL

				// let zPosFront = classroom.width; // VERTICAL
				// let zPosBack = 15; // VERTICAL
			}
		}
		
		// Positions
		this.positions = [  // x = horizontal | z = vertical
			[pos.x[0], pos.y, pos.z.front], // front-LEFT column
			[pos.x[1], pos.y, pos.z.front], // front-MIDDLE column
			[pos.x[2], pos.y, pos.z.front], // front-RIGHT column

			[pos.x[0], pos.y, pos.z.back], // back-RIGHT column
			[pos.x[1], pos.y, pos.z.back], // back-MIDDLE column
			[pos.x[2], pos.y, pos.z.back], // back-LEFT column
		];
	}
}
