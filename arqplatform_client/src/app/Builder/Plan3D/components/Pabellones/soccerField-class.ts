import { Color } from "three";
import { WALL_THICKNESS, INCREMENT_SCALE as increment_scale } from "./app.settings";

export class SoccerField {
	length: number;
	width: number;
	position: number[];
	rotation: number[];
	color: Color;

	// constructor(terrain: Terrain) {
	constructor() {
		this.length = 28 * increment_scale; // 44
		this.width = 15 * increment_scale; // 22
		this.position = [0, 0.5, 0]; // [-terrain.length / 7.5, 0, 0];
		this.rotation = [Math.PI / -2, 0, Math.PI / -2];
		this.color = new Color(0xb2b9c3);
	}

	setPosition(terrainLength: number) {
		this.position[0] = -terrainLength / 5;
	}
}
