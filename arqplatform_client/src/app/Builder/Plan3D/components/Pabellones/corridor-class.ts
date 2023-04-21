import { Color } from "three";
import { INCREMENT_SCALE } from "./app.settings";

export class Corridor {
	length: number;
	width: number;
	position: number[];
	rotation: number[];
	color: Color;

	// pab1: number; // el largo de las aulas mas el baño y escalera (de haber)

	constructor() {
		this.width = 2.4 * INCREMENT_SCALE;
		this.rotation = [Math.PI / -2, 0, Math.PI / 2];
		this.color = new Color(0x4e4e4e);
	}

	setPosition(terrainlength: number, classroomWidth: number) {
		this.position = [0, 0.7, ((terrainlength - this.width) / 2) - classroomWidth];
	}

	setLength(length: number) {
		this.length = length;
	}

	// get length() {
	// 	console.log(this)
	// 	return this.pab1;
	// }
}
