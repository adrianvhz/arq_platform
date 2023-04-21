import { Color } from "three";
import { INCREMENT_SCALE } from "./app.settings";

export class Terrain {
	length: number;
	width: number
	position: number[];
	rotation: number[];
	color: Color;

	constructor() {
		this.position = [0, -0.1, 0];
		this.rotation = [-Math.PI / 2, 0, 0];
		this.color = new Color(0xa2a6b1);
		// this.color = new Color(0xf5f5f5);
	}

	setLength(areaGeneral: number) {
		this.length = (areaGeneral **0.5) * INCREMENT_SCALE;
		this.width = this.length;
	}
}
