import { ExtrudeGeometry, Shape } from "three";
import { WALL_THICKNESS, INCREMENT_SCALE } from "../../app.settings";

export class Window {
	position: object;
	geometry: ExtrudeGeometry;

	constructor(classroom: any) {
		this.position = {
			frontLeft: [(415 / 2) - ((0.75 * INCREMENT_SCALE) / 2) - 100, 71, classroom.width - WALL_THICKNESS],
			frontRight: [(415 / 2) - ((0.75 * INCREMENT_SCALE) / 2) + 100, 71, classroom.width - WALL_THICKNESS],
			backLeft: [(415 / 2) - ((0.75 * INCREMENT_SCALE) / 2) - 100, 71, 0],
			backRight: [(415 / 2) - ((0.75 * INCREMENT_SCALE) / 2) + 100, 71, 0]
		}
		this.setGeometry(0.70 * INCREMENT_SCALE, 0.75 * INCREMENT_SCALE)
		// this.position = [150, 30, classroom.width - wall_thickness];
		// this.setGeometry(0.75 * increment_scale, 0.70 * increment_scale)
	}

	setGeometry(length: number, width: number) {
		const shape = new Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, length);
		shape.lineTo(width, length);
		shape.lineTo(width, 0);
		shape.lineTo(0, 0);
	
		this.geometry = new ExtrudeGeometry(shape, { depth: 8 });
	}
}
