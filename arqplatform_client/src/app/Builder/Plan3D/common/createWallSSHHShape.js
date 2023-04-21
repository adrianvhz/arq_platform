import { Shape } from "three";

export const createWallSSHHShape = (length, height) => {
	let shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, height);
	shape.lineTo(length, height);
	shape.lineTo(length, 0);
	shape.lineTo(0, 0);

	return shape;
}
