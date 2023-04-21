import { ExtrudeGeometry, Shape } from "three";
import { WALL_THICKNESS, INCREMENT_SCALE } from "../../app.settings";

export class Door {
	position: number[];
	geometry: ExtrudeGeometry;

	constructor(classroom: any) {
		this.position = [20, -0.2, classroom.width - WALL_THICKNESS];
		this.setGeometry(100, 50);
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