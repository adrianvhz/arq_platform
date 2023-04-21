import { createWallSSHHShape } from "../../../common/createWallSSHHShape";

export default class WallsClass {
	/* private bathroom = {} */
	
	// paredes del frente (2 hacen la pared frontal)
	front;

	// 2 paredes laterales
	sides;

	// back wall - 1 de cierre trasero
	back;

	constructor(bathroom, baths_amount, wall_thickness) {
		this.setMeasures(bathroom, baths_amount, wall_thickness);
		this.setPosition(bathroom, wall_thickness);
		this.setShape(wall_thickness);
	}

	setMeasures({ lavamanos, pasillo, inodoro, pasillo_de_entrada, ancho_de_cubiculo }, baths_amount, wall_thickness) {
		this.front = {
			length: lavamanos + pasillo + inodoro - (pasillo_de_entrada / 2) + wall_thickness + 0.200006105005, // 2.7 m | 135 u
			height: 125,
			rotation: {
				// 1: [0, Math.PI , 0]
			}
		}

		this.sides = { 										// (baths_amount + 1) porque cada cubiculo tiene 2 paredes que aumentan el grosor x2
			length: (baths_amount * ancho_de_cubiculo) + ((wall_thickness + 0.200006105005) * (baths_amount + 1)) + pasillo_de_entrada + 0.200006105005,
			height: 125,
			rotation: {
				1: [0, Math.PI / 2, 0],
				2: [0, Math.PI / 2, 0]
			}
		}

		this.back = {
			length: (this.front.length * 2) + pasillo_de_entrada, // 6.4 m | 320 u      // + pasillo_de_entrada es por el + 1 metro de puerta (entrada). 
			// length: (((lavamanos + pasillo + inodoro) * 2) + (wall_thickness * 2)) + 0.200006105005, 
			height: 125,
			rotation: {
				// 1: [0, Math.PI, 0]
			} // coment and F5
		}

		// console.log("front length", this.front.length)
		// console.log("back length", this.back.length)
	}

	setPosition({ pasillo_de_entrada }, wall_thickness) {
		this.front.position = {
			1: [0, 0, 0], // FRONT LEFT  // x -this.front.length - pasillo_de_entrada - wall_thickness
			2: [this.front.length + pasillo_de_entrada, 0, 0], // FRONT RIGHT  // x -wall_thickness - 0.200006105005
		}

		this.sides.position = {
			1: [0.075, 0, 0], // SIDE LEFT  // x -pasillo_de_entrada - this.front.length - wall_thickness + 8
			2: [(this.front.length * 2) + pasillo_de_entrada - wall_thickness - 0.3, 0, 0] // SIDE RIGHT
		}

		this.back.position = {
			1: [0, 0, -this.sides.length - wall_thickness] // x -wall_thickness - pasillo_de_entrada - this.front.length  |    z -this.sides.length - wall_thickness
		}
	}

	setShape(wall_thickness) {
		this.front.shape = createWallSSHHShape(this.front.length - 0.200006105005, this.front.height);
		this.sides.shape = createWallSSHHShape(this.sides.length - 0.200006105005, this.sides.height);
		this.back.shape = createWallSSHHShape(this.back.length - 0.200006105005, this.back.height);
		// this.back.shape = createWallSSHHShape(this.back.length + (wall_thickness * 2), this.back.height);
	}
}
