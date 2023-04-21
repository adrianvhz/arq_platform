import { Classroom } from "./components/Classroom/classrooms-class";
import { Bathroom } from "./bathroom-class";
import { SoccerField } from "./soccerField-class";
import { Stairs } from "./stairs-class";
import { Terrain } from "./terrain-class";
import { Corridor } from "./corridor-class";
import { Levels } from "./levels-class";
import { getSky } from "./getSky";

export class School {
	public classroom: Classroom;
	public bathroom: Bathroom;
	public terrain: Terrain;
	public stairs: Stairs;
	public soccerField: SoccerField;
	public corridor: Corridor;

	public zone: string
	public type: string;

	public numberOfClassrooms: Levels;
	public numberOfStudents: Levels;

	public levels: string[];

	public totalStudents: number;

	public maxCapacity: number;

	public partialArea: number;
	public totalArea: number;
	public circulationArea: number;
	
	public generalArea: number;
	public floors: number;

	public sky: any;

	// amount of classrooms and bathrooms del school.
	public _classrooms: any;
	public _bathrooms: any;

	public classrooms: any;
	public bathrooms: any; // momentaneo - cambiar manera, nombre o algo... pensando



	private maxClassroomsForPeine: number;
	private maxClassroomsPeineForFloor: number;

	private _remainingClassrooms: number;
	
	public pab: any;

	constructor() { // Seria algo como crear todo la clase School una vez y cambiar los parametros con setters segun se requiera por proyecto (maqueta).
		this.classroom = new Classroom();
		this.terrain = new Terrain();
		this.bathroom = new Bathroom();
		this.stairs = new Stairs();
		this.soccerField = new SoccerField();
		this.corridor = new Corridor();
		
		this.sky = getSky();
	}

	setMaxCapacity(value: number) {
		this.maxCapacity = value;
	}

	setPartialArea(area: number) {
		this.partialArea = area;
	}

	setTotalArea(area: number) {
		this.totalArea = area;
	}

	setCirculationArea(area: number) {
		this.circulationArea = area;
	}

	setGeneralArea(area: number) {
		this.generalArea = area;
		this.terrain.setLength(area);
		this.corridor.setPosition(this.terrain.length, this.classroom.width);
		this.soccerField.setPosition(this.terrain.length);
	}

	setNumberOfClassrooms(inicial: number, primaria: number, secundaria: number) {
		this.numberOfClassrooms = new Levels(inicial, primaria, secundaria);
	}

	setNumberOfStudents(inicial: number, primaria: number, secundaria: number) {
		this.numberOfStudents = new Levels(inicial, primaria, secundaria);
	}

	setLevels(levels: string[]) {
		this.levels = levels;
	}

	setType(type: string) {
		this.type = type;
	}

	setZone(zone: string) {
		this.zone = zone;
	}

	setProjectData(state: any) {
		this.setLevels(state.level);
		this.setType(state.sublevel);
		this.setZone(state.zone);
		this.setMaxCapacity(state.build_data.result_data.aforo_maximo);
		this.setPartialArea(state.build_data.result_data.area_parcial);
		this.setTotalArea(state.build_data.result_data.area_total);
		this.setCirculationArea(state.build_data.result_data.circulacion);
		this.setGeneralArea(state.build_data.construction_info.area_general);
		this.setNumberOfStudents(
			state.aforo.aforoInicial,
			state.aforo.aforoPrimaria,
			state.aforo.aforoSecundaria
		);
		this.setNumberOfClassrooms(
			state.aforo.aulaInicial,
			state.aforo.aulaPrimaria,
			state.aforo.aulaSecundaria
		);


		// ESTE SE USA
		// let x = (((classroom.length * aulas) + escaleras) / 2);
		this.pab = {
			1: {
				x: this.classroom.length,
				y: 0,
				z: (this.terrain.length / 2),
				rotation: [0, Math.PI, 0],
				floors: []
			},
			2: {
				x: -this.classroom.length,
				y: 0,
				z: (this.terrain.length / -2),
				floors: []
			}
		}

		this.setClassrooms();
		this.setBathrooms();
		this.setMaxClassroomsPeine();
	}

	setClassrooms() {
		const classrooms = [] as any;

		for (let level of this.levels) {
			classrooms.push(...Array(this.numberOfClassrooms[level]).fill(level));
		}

		this.classrooms = classrooms;
		this._classrooms = classrooms.slice();
		this._remainingClassrooms = classrooms.length;
	}

	setBathrooms() {
		const amountBaths = {
			inicial: Math.ceil(this.numberOfStudents.inicial / 25),
			primaria: Math.ceil(this.numberOfStudents.primaria / 60),
			secundaria: Math.ceil(this.numberOfStudents.secundaria / 60)
		}
	
		const bathrooms = [] as any[];

		for (let level of this.levels) {
			while (amountBaths[level] > 0) {
				const baths = amountBaths[level] >= 6
					? 6
					: amountBaths[level]

				bathrooms.push({
					level,
					baths
				});
				amountBaths[level] -= baths
			}
		}

		this.bathrooms = bathrooms;
		this._bathrooms = bathrooms;
	}












	setMaxClassroomsPeine() {
		const maxClassroomsForPeine = Math.floor((this.terrain.length - (2 * (this.corridor.width + this.classroom.width))) / this.classroom.length);
		const maxClassroomsPeineForFloor = maxClassroomsForPeine * 3;

		this.maxClassroomsForPeine = maxClassroomsForPeine;
		this.maxClassroomsPeineForFloor = maxClassroomsPeineForFloor;
	}
	
	computeFloorClassrooms ({ haveBathroom = true, haveStairs = false }) {
		let buildableTerrain = this.terrain.length;
		if (haveBathroom) buildableTerrain -= this.classroom.length;
		if (haveStairs) buildableTerrain -= this.stairs.width;

		return Math.floor(buildableTerrain / this.classroom.length);
	}




	getBaths() {
		if (this._bathrooms.length > 0) {
			return this._bathrooms.shift().baths; 
		}
		else return 0
	}

	getClassrooms(amount: number) {
		const arr = [] as any;
		for (let i = 0; i < amount; i++) {
			arr.push(this._classrooms.shift());
		}

		return arr;
	}

	addFloor({ pab_n, floor_n }) {
		const baths = this.getBaths();
		const maxClassrooms = this.computeFloorClassrooms({ haveBathroom: baths });

		const amount = this._remainingClassrooms > maxClassrooms
			? maxClassrooms
			: this._remainingClassrooms

		this.pab[pab_n].floors.push({
			classrooms: this.getClassrooms(amount),
			pab: pab_n,
			floor: floor_n,
			baths,
			maxClassrooms: maxClassrooms
		});
		this._remainingClassrooms -= amount;
	}

	addPeine({ floor_n }) {
		const isLeftClassrooms = this._remainingClassrooms > this.maxClassroomsPeineForFloor;

		const classrooms = isLeftClassrooms
			? this.maxClassroomsPeineForFloor
			: this._remainingClassrooms

		if (isLeftClassrooms) this._remainingClassrooms -= this.maxClassroomsPeineForFloor;
		else this._remainingClassrooms = 0;
		// se selecciona el floor por su index
		this.pab[2].floors[floor_n - 1].classrooms_for_peine = this.getClassrooms(classrooms);
	}

}



// class Builder {
// 	constructor() {
		
// 	}
// }
