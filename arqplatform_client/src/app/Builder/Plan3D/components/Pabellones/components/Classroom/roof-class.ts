import {
	MeshStandardMaterial,
	Shape,
	Color,
	ExtrudeGeometry,
} from "three";
import { WALL_THICKNESS } from "../../app.settings";

export class Roof {
	private _length: number;
	private _width: number;

	public position: number[];
	public rotation: number[];

	public geometry: ExtrudeGeometry;
	public material: MeshStandardMaterial;

	constructor(classroom: any, bigas: any) {
		this._length = classroom.length - 30;
		this._width = classroom.width - 30;

		this.position = [15, classroom.height + bigas.horizontal.height, 15]; // x = 15 ; y = 15  es por que se reduce - 30 a los lados del roof
		this.rotation = [Math.PI / 2, 0, 0];
		// this.material = new MeshStandardMaterial({ color: new Color(0x56626f).convertSRGBToLinear() });
		this.material = new MeshStandardMaterial({
			color: new Color(0x556067).convertSRGBToLinear()
		});

		this.setGeometry();
	}

	setExtraRoof() { // o algo asi... (ver)

	}

	setGeometry() {
		const shape = new Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, this._width);
		shape.lineTo(this._length, this._width);
		shape.lineTo(this._length, 0);
		shape.lineTo(0, 0);

		const extrudeSettings = {
			steps: 2,
			depth: WALL_THICKNESS, // (grosor)
			bevelEnabled: false
		}

		this.geometry = new ExtrudeGeometry(shape, extrudeSettings);
	}

	// const roof = useSelector(state => state.building.roof);
	// const [xNormal, y, z] = position;
}
