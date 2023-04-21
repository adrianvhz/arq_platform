import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Bigas } from "./bigas-class";
import { Columns } from "./columns-class";
import { Roof } from "./roof-class";
import { Walls } from "./walls-class";
import { WALL_THICKNESS, INCREMENT_SCALE as increment_scale } from "../../app.settings";

export class Classroom {
	length: number;
	width: number;
	height: number;

	bigas: Bigas;
	columns: Columns;
	walls: Walls;
	roof: Roof;


	constructor() {
		// this.length = (classroom_measurements.muro_horizontal * increment_scale) + (wall_thickness * 2);
		// this.width = (classroom_measurements.muro_vertical * increment_scale) + (wall_thickness * 2);
		this.length = 400 + (WALL_THICKNESS * 2);
		this.width = 312.5 + (WALL_THICKNESS * 2);
		this.height = 110; // 2.2 * increment_scale

		this.bigas = new Bigas(this.getMeasurements());
		this.columns = new Columns(this.getMeasurements());
		this.walls = new Walls(this.getMeasurements());
		this.roof = new Roof(this.getMeasurements(), this.bigas);
	}

	getMeasurements() {
		return {
			length: this.length,
			width: this.width,
			height: this.height
		}
	}
	
	setMeasurements(length: number, width: number, columnLength: number) {
		this.length += length * increment_scale;
		this.width += width * increment_scale;
		this.columns.setLength(columnLength);
	}

	loadWindow() {
		
	}
}
