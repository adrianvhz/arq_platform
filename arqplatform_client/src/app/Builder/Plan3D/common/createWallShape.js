import { Path, Shape, Vector2 } from "three";

/**
 * 
 * @param {number} length
 * @param {number} width 
 * @param {number} wall_thickness 
 * @returns {Shape} A new shape.
 */
export const createWallShape = (length, width, wall_thickness) => {
	let shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, width);
	shape.lineTo(length, width);
	shape.lineTo(length, 0);
	shape.closePath();

	let hole = new Path();
	hole.moveTo(wall_thickness, wall_thickness);
	hole.lineTo(length - wall_thickness, wall_thickness);
	hole.lineTo(length - wall_thickness, width - wall_thickness);
	hole.lineTo(wall_thickness, width - wall_thickness);
	hole.closePath();

	shape.holes.push(hole);

	return shape;


	// let pts = [];
	
	// pts.push(new Vector2(0, 0));
	// pts.push(new Vector2(0, width));
	// pts.push(new Vector2(length, width));
	// pts.push(new Vector2(length, 0));
	// pts.push(new Vector2(0, 0));

	// pts.push(new Vector2(wall_thickness, wall_thickness));
	// pts.push(new Vector2(length - wall_thickness, wall_thickness));
	// pts.push(new Vector2(length - wall_thickness, width - wall_thickness));
	// pts.push(new Vector2(wall_thickness, width - wall_thickness));
	// pts.push(new Vector2(wall_thickness, wall_thickness));

	// return new Shape(pts);
}
