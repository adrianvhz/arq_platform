import { BoxGeometry, Color, MeshStandardMaterial } from "three";
import { WALL_THICKNESS, INCREMENT_SCALE as increment_scale } from "../../app.settings";

export class Bigas {
	public offset: number;
	public horizontal: any;
	public vertical: any;
	public material: MeshStandardMaterial;
	public data: any[];

	constructor(classroom: any) {
		this.offset = WALL_THICKNESS;

		this.horizontal = {
			width: 0.30 * increment_scale,
			height: 0.60 * increment_scale
		}

		this.vertical = {
			width: 0.30 * increment_scale,
			height: 0.40 * increment_scale
		}

		this.material = new MeshStandardMaterial({ color: new Color(0x404040).convertSRGBToLinear() });

		this.setBigas(classroom);
	}

	setBigas(classroom: any) {
		const config = {
			pos: {
				horizontal: {
					x: classroom.length / 2,
					y: classroom.height + this.horizontal.height / 2,
					z: 1
				},
				vertical: {
					x: 1,
					y: classroom.height + this.vertical.height,
					z: classroom.width / 2
				}
			},
			geometry: {
				horizontal: new BoxGeometry(this.horizontal.width, this.horizontal.height, classroom.length),
				vertical: new BoxGeometry(this.vertical.width, this.vertical.height, classroom.width)
			},
			rotation: {
				horizontal: [0, Math.PI / 2, 0],
				vertical: [0, 0, 0]
			}
		}

		this.data = [
			// HORIZONTALES
			{
				id: 0,
				position: [config.pos.horizontal.x, config.pos.horizontal.y, this.offset],
				rotation: config.rotation.horizontal,
				geometry: config.geometry.horizontal
				// width: classroom.bigas.horizontal.width,
				// height: classroom.bigas.horizontal.height,
				// length: classroom.length
			},
			{
				id: 1,
				position: [config.pos.horizontal.x, config.pos.horizontal.y, classroom.width - this.offset],
				rotation: config.rotation.horizontal,
				geometry: config.geometry.horizontal
				// width: classroom.bigas.horizontal.width,
				// height: classroom.bigas.horizontal.height,
				// length: classroom.length
			},

			// VERTICALES
			{
				id: 2,
				position: [this.offset, config.pos.vertical.y, config.pos.vertical.z],
				rotation: config.rotation.vertical,
				geometry: config.geometry.vertical
				// width: classroom.bigas.vertical.width,
				// height: classroom.bigas.vertical.height,
				// length: classroom.width
			},
			{
				id: 3,
				position: [classroom.length / 2, config.pos.vertical.y - 0.3, config.pos.vertical.z],
				rotation: config.rotation.vertical,
				geometry: config.geometry.vertical
				// width: classroom.bigas.vertical.width,
				// height: classroom.bigas.vertical.height,
				// length: classroom.width
			},
			{
				id: 4,
				position: [classroom.length - this.offset, config.pos.vertical.y, config.pos.vertical.z],
				rotation: config.rotation.vertical,
				geometry: config.geometry.vertical
				// width: classroom.bigas.vertical.width,
				// height: classroom.bigas.vertical.height,
				// length: classroom.width
			}
		]
	}

}
