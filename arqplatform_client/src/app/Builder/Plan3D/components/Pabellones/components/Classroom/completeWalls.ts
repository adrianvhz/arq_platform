import { BoxGeometry } from "three";

export class CompleteWalls {
	position: number[][];
	geometry: BoxGeometry;

	constructor(classroom: any) {
		this.position = [
			[7.5 / 2, classroom.height + ((0.20 * 50) / 2), classroom.width / 2],
			[classroom.length - (7.5 / 2), classroom.height + ((0.20 * 50) / 2), classroom.width / 2]
		];
		this.geometry = new BoxGeometry(7.5, 0.20 * 50, classroom.width - (0.30 * 50 * 2))
	}
}
