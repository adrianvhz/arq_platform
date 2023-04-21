import { Color, ExtrudeGeometry, MeshStandardMaterial, Shape } from "three";
import { WALL_THICKNESS, INCREMENT_SCALE } from "./app.settings";

export class Stairs {
	length: number;
	width: number;

	flight: Flight;
	landing: Landing;

	flight1_amount: number;
	flight2_amount: number;

	completeRoof: CompleteRoof;

	constructor() {
		this.length = (1.20 * INCREMENT_SCALE * 2) + (8 * 0.25 * INCREMENT_SCALE);
		this.width = 2.40 * INCREMENT_SCALE;
		this.flight = new Flight();
		this.landing = new Landing();
		this.flight1_amount = 8;
		this.flight2_amount = 8;
		this.completeRoof = new CompleteRoof(this.landing.length, 95);
	}
}



class CompleteRoof {
	public position: number[];
	public rotation: number[];
	public geometry: ExtrudeGeometry;
	public material: MeshStandardMaterial;


	constructor(length: number, width: number) {
		this.position = [-60, 110 + 30, 172.7];
		this.rotation = [Math.PI / 2, 0, 0];
		this.material = new MeshStandardMaterial({ color: new Color("gray").convertSRGBToLinear() });

		this.setGeometry(length, width);
	}

	setGeometry(length: number, width: number) {
		const shape = new Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, width);
		shape.lineTo(length, width);
		shape.lineTo(length, 0);
		shape.lineTo(0, 0);

		const extrudeSettings = {
			steps: 2,
			depth: WALL_THICKNESS, // (grosor)
			bevelEnabled: false
		}

		this.geometry = new ExtrudeGeometry(shape, extrudeSettings);
	}
}



class Flight { // tramo de escalones
	width: number;
	riser: number;
	tread: number

	constructor() {
		this.width = 1.2 * INCREMENT_SCALE;
		this.riser = 0.17 * INCREMENT_SCALE; // contrapaso
		this.tread = 0.25 * INCREMENT_SCALE; // paso
	}
}

class Landing { // descanso
	width: number;
	length: number

	constructor() {
		this.width = 1.2 * INCREMENT_SCALE;
		this.length = 2.4 * INCREMENT_SCALE
	}
}