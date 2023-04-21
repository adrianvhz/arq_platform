import Pabellon from "./components/Pabellon";

export default function Pabellones({
	school,
	view
}) {
	const { classroom, bathroom, terrain, stairs, corridor } = school;

	const pabellones = [];

	var f = 1;

	while (school._remainingClassrooms > 0) {
		var p = 1;
		school.addFloor({ pab_n: p, floor_n: f });
		p++;

		school._remainingClassrooms && school.addFloor({ pab_n: p, floor_n: f });
		school._remainingClassrooms && school.addPeine({ floor_n: f });
		f++;
	}

	// CALCULAR NUMERO DE PABELLONES
	const total_classrooms_length = (school.classrooms.length * classroom.length) + 415;
	const amount_pabellones = total_classrooms_length < school.terrain.length ? 1 : 2;
	

	// PUSH PABELLONES
	for (let p = 1; p <= amount_pabellones; p++) {
		const classrooms = (school.pab[p].floors[0].classrooms.length) + (school.pab[p].floors[0].baths > 0 ? 1 : 0);
		const haveStairs = school.pab[p].floors.length > 1;

		let x = (((classroom.length * classrooms) + (haveStairs ? stairs.width : 0)) / 2);
		
		if (p === 1) {
			school.corridor.setLength(x * 2);
		}

		pabellones.push({
			position: [
				(p === 1 ? school.pab[p].x - x : x + school.pab[p].x),
				school.pab[p].y,
				school.pab[p].z
			],
			rotation: school.pab[p].rotation,
			floors: school.pab[p].floors
		});
	}

	return (
		<group name="Pabellones">
			{pabellones.map((el, index) => (
				<Pabellon
					position={el.position}
					rotation={el.rotation}

					maxClassroomsForPeine={school.maxClassroomsForPeine}
					
					classroom={classroom}
					bathroom={bathroom}
					stairs={stairs}
					corridor={corridor}
					terrain={terrain}
					
					floors={el.floors}
					
					view={view}
					key={index}
				/>
			))}
		</group>
	)
}
















// class PabellonesClass {
// 	remaining_classrooms = amount_classrooms;
// 	offset = classroom.length; // offset en el TOP LEFT del pabellon === 1 classroom length
// 	bathrooms_amount = bathrooms.length;
// 	pabellones = [];

// 	constructor(
// 		// amount_classrooms, classroom, bathroom, stairs, bathrooms, data, terrain, pasillo, increment_scale, wall_thickness
// 	) {
// 		const amount_classrooms = "a";
// 		this.amount_classrooms = amount_classrooms;
// 		this.classroom = classroom;
// 		this.bathroom = bathroom;
// 		this.stairs = stairs;
// 		this.bathrooms = bathrooms;
// 		this.data = data;
// 		this.terrain = terrain;
// 		this.pasillo = pasillo;
// 		this.increment_scale = increment_scale;
// 		this.wall_thickness = wall_thickness;
// 	}

// 	computeMaxClassrooms = ({ have_bathroom = true, have_stairs = false } = {}) => {
// 		let buildable_terrain = terrain.length - offset;
// 		if (have_bathroom) buildable_terrain -= 334.9999938979745; // 334.9999938979745 is bathroom length
// 		if (have_stairs) buildable_terrain -= stairs.width;
// 		return Math.floor(buildable_terrain / classroom.length);
// 	}	

// 	getClassrooms = (obj, amount) => {
// 		let arr = [];
// 		for (let i = 0; i < amount; i++) {
// 			arr.push(obj.shift());
// 		}
// 		return arr;
// 	}

// 	addPeine = ({ floor_n }) => {
// 		const isLeftClassrooms = remaining_classrooms > max_classrooms_peine_for_floor;
// 		let classrooms_for_peine = isLeftClassrooms
// 			? max_classrooms_peine_for_floor
// 			: remaining_classrooms

// 		if (isLeftClassrooms) remaining_classrooms -= max_classrooms_peine_for_floor;
// 		else remaining_classrooms = 0;

// 		// se selecciona el floor por su index
// 		pab[2].floors[floor_n - 1].classrooms_for_peine = this.getClassrooms(classrooms, classrooms_for_peine);
// 	}

// 	getBaths = () => {
// 		if (bathrooms_amount > 0) {
// 			bathrooms_amount--;
// 			return bathrooms.shift().baths; 
// 		}
// 		else return 0
// 	}

// 	addFloor = ({ pab_n, floor_n, baths_n }) => {
// 		const baths = this.getBaths();
// 		const amount =  remaining_classrooms > pab[pab_n].max_classrooms
// 			? pab[pab_n].max_classrooms + (baths ? 0 : 1)
// 			: remaining_classrooms
		
// 		pab[pab_n].floors.push({
// 			floor: floor_n,
// 			classrooms: this.getClassrooms(classrooms, amount),
// 			baths,
// 			// baths: baths_n,
// 			// have_stairs: false
// 		});
// 		remaining_classrooms -= amount;
// 	}
// }





























































































// import Pabellon from "./components/Pabellon";

// export default function Pabellones({
// 	school,
// 	view
// }) {
// 	const { classroom, bathroom, terrain, stairs, corridor } = school;
// 	const { INCREMENT_SCALE, WALL_THICKNESS } = school.constants;
	
// 	const totalClassrooms = school.numberOfClassrooms.getTotal(); 
// 	const bathrooms = school.bathrooms.slice();

// 	let remainingClassrooms = totalClassrooms;
// 	let bathrooms_amount = bathrooms.length;
	
// 	const pabellones = [];

// 	// CALCULAR NUMERO DE PABELLONES
// 	let total_classrooms_length = ((totalClassrooms) * classroom.length) + 415;
// 	let amount_pabellones = total_classrooms_length < terrain.length ? 1 : 2;



// 	// ESTE SE USA
// 	// let x = (((classroom.length * aulas) + escaleras) / 2);


// 	// let x = (((((8 * 50) * 6) + (2.4 * 50)) - (5 * 7.5)) / 2);
// 	// let x = ((((8 * 50) * ("(n_aulas + bathrooms)")) + (2.4 * 50)) - ("(n aulas - 1) * 15cm")) / 2;

// 	let pab = {
// 		// este pabellon se rota
// 		1: {
// 			// x: x,
// 			x: classroom.length,
// 			y: 0,
// 			z: (terrain.length / 2),
// 			rotation: [0, Math.PI, 0],
// 			floors: []
// 		},
// 		2: {
// 			// x: x - classroom.length,
// 			x: -classroom.length,
// 			y: 0,
// 			z: (terrain.length / -2),
// 			floors: []
// 		}
// 	}

// 	// Formula: Tl - 2(p + Cw) / Cl
// 	const maxClassromsPeine = Math.floor((terrain.length - (2 * (corridor.width + classroom.width))) / classroom.length);
// 	const maxClassroomsPeineForFloor = maxClassromsPeine * 3;

// 	// Formula: (MaxClassroomsP1 + MaxClassroomsP2 + 3 * MaxClassroomsPeine) - 1
// 	const max_classrooms_for_floor = pab[1].max_classrooms + pab[2].max_classrooms + maxClassroomsPeineForFloor - 1;


// 	// const max_classrooms_for_floor = computeMaxClassrooms({ have_bathroom: bathrooms[0] });
// 	/* Max classrooms for the first floor (without stairs) */
// 	// let max_classrooms_for_first_floor = (max_classrooms_for_floor * 2) + (max_classrooms_peine_for_floor) - 1;
	


// 	// Si hay mas aulas que maximo de aulas por primer piso, entonces se volvera a calcular el max_classrooms por pabellon.
// 	// if (amount_classrooms > max_classrooms_for_floor) {
// 	// 	pab[1].max_classrooms = computeMaxClassrooms({ have_bathroom: true, have_stairs: true });
// 	// 	if (max_classrooms_for_floor + pab[1].max_classrooms) {
// 	// 		pab[2].max_classrooms = computeMaxClassrooms({ have_bathroom: bathrooms.find(el => el.pab === 2).baths > 0, have_stairs: true });
// 	// 	}
// 	// }

// 	// console.log({ max_classrooms_peine, max_classroom_first_floor: max_classrooms_for_floor });
// 	// console.log({ "max classrooms first pabellon:": pab[1].max_classrooms, "max classrooms second pabellon:": pab[2].max_classrooms });

// 	const getClassrooms = (obj, amount) => {
// 		let arr = [];
// 		for (let i = 0; i < amount; i++) {
// 			arr.push(obj.shift());
// 		}
// 		return arr;
// 	}

// // -------------------------------------------
// 	const classrooms = [];
	
// 	// for (let level of data.levels) {
// 	// 	console.log(level, data.aulas[level])
// 	// 	for (let i = 0; i < data.aulas[level]; i++) {
// 	// 		classrooms.push(level)
// 	// 	}
// 	// }

// 	for (let level of school.levels) {
// 		classrooms.push(...Array(school.numberOfClassrooms[level]).fill(level));

// 		// for (let i = 0; i < school.numberOfClassrooms[level]; i++) {
// 		// 	console.log(level)
// 		// 	classrooms.push(level)
// 		// }
// 	}

// 	const getBaths = () => {
// 		if (bathrooms_amount > 0) {
// 			bathrooms_amount--;
// 			return bathrooms.shift().baths; 
// 		}
// 		else return 0
// 	}

// 	const addPeine = ({ floor_n }) => {
// 		const isLeftClassrooms = remainingClassrooms > maxClassroomsPeineForFloor;
// 		let classrooms_for_peine = isLeftClassrooms
// 			? maxClassroomsPeineForFloor
// 			: remainingClassrooms

// 		if (isLeftClassrooms) remainingClassrooms -= maxClassroomsPeineForFloor;
// 		else remainingClassrooms = 0;

// 		// se selecciona el floor por su index
// 		pab[2].floors[floor_n - 1].classrooms_for_peine = getClassrooms(classrooms, classrooms_for_peine);
// 		return classrooms_for_peine;
// 	}

// 	const addFloor = ({ pab_n, floor_n, baths_n }) => {
// 		const baths = getBaths();
// 		const maxClassrooms = school.computeFloorClassrooms({ haveBathroom: baths });

// 		const amount = remainingClassrooms > maxClassrooms
// 			? maxClassrooms
// 			: remainingClassrooms

// 		pab[pab_n].floors.push({
// 			classrooms: getClassrooms(classrooms, amount),
// 			pab: pab_n,
// 			floor: floor_n,
// 			baths,
// 			maxClassrooms: maxClassrooms
// 		});
// 		remainingClassrooms -= amount;
// 		return amount;
// 	}

// 	if (amount_pabellones === 1) {
// 		const baths = getBaths();
		
// 		pab[1].floors.push({
// 			classrooms: classrooms,
// 			maxClassrooms: school.computeFloorClassrooms({ haveBathroom: baths }),
// 			pab: 1,
// 			floor: 1,
// 			baths: baths
// 		});
// 	} else {
// 		// for (let p = 1, f = 1, r = remaining_classrooms; f < 5; p = p === 1 ? 2 : 1, f++) {
// 			// console.log("floor",f)
// 			// r -= addFloor({ pab_n: p, floor_n: f, baths_n: 1 });
// 			// if (p === 2) {
// 			// 	r -= buildPeine({ floor_n: f });
// 			// } 
// 		// }

// 		// var p = 1;
// 		var f = 1;
// 		while (remainingClassrooms > 0) {
// 			var p = 1;
// 			addFloor({ pab_n: p, floor_n: f, baths_n: 1 });
// 			p++;

// 			addFloor({ pab_n: p, floor_n: f, baths_n: 1 });
// 			addPeine({ floor_n: f });
// 			f++;
// 		}

// 		// // PRIMER PISO
// 		// addFloor({ pab_n: 1, floor_n: 1, baths_n: 6 });
// 		// addFloor({ pab_n: 2, floor_n: 1, baths_n: 3 });

// 		// buildPeine({ floor_n: 1 });

// 		// console.log("remaining classrooms after peine", remaining_classrooms);

// 		// // SEGUNDO PISO
// 		// // (pabellon 1)
// 		// if (remaining_classrooms > 0) {
// 		// 	addFloor({ pab_n: 1, floor_n: 2, baths_n: 1 });
// 		// }

// 		// // (pabellon 2)
// 		// if (remaining_classrooms > 0) {
// 		// 	addFloor({ pab_n: 2, floor_n: 2, baths_n: 0 });
// 		// 	buildPeine({ floor_n: 2 });
// 		// }
		
// 		// // TERCER PISO
// 		// // (pabellon 1)
// 		// if (remaining_classrooms > 0) {
// 		// 	addFloor({ pab_n: 1, floor_n: 3, baths_n: 0 });
// 		// }

// 		// // (pabellon 2)
// 		// if (remaining_classrooms > 0) {
// 		// 	addFloor({ pab_n: 2, floor_n: 3, baths_n: 0 });
// 		// 	buildPeine({ floor_n: 3 });
// 		// }

// 		// // CUARTO PISO
// 		// // (pabellon 1)
// 		// if (remaining_classrooms > 0) {
// 		// 	addFloor({ pab_n: 1, floor_n: 4, baths_n: 3 });
// 		// }

// 		// // (pabellon 2)
// 		// if (remaining_classrooms > 0) {
// 		// 	addFloor({ pab_n: 2, floor_n: 4, baths_n: 0 });
// 		// 	buildPeine({ floor_n: 4 });
// 		// }
// 	}
	
// 	console.log("pab 1 classrooms", pab[1].floors);
// 	console.log("pab 2 classrooms", pab[2].floors);

// 	// PUSH PABELLONES
// 	for (let p = 1; p <= amount_pabellones; p++) {
// 		const classrooms = (pab[p].floors[0].classrooms.length) + (pab[p].floors[0].baths > 0 ? 1 : 0);
// 		const haveStairs = pab[p].floors.length > 1
// 		let x = (((classroom.length * classrooms) + (haveStairs ? stairs.width : 0)) / 2);
		
// 		if (p === 1) {
// 			school.corridor.setLength(x * 2);
// 		}

// 		pabellones.push({
// 			position: [(p === 1 ? pab[p].x - x : x + pab[p].x), pab[p].y, pab[p].z],
// 			rotation: pab[p].rotation,
// 			max_classrooms_for_pab: pab[p].max_classrooms,
// 			floors: pab[p].floors
// 		});
// 	}

// 	return (
// 		<group name="Pabellones">
// 			{pabellones.map((el, index) => (
// 				<Pabellon
// 					position={el.position}
// 					rotation={el.rotation}
					
// 					classroom={classroom}
// 					bathroom={bathroom}
// 					stairs={stairs}
// 					corridor={corridor}
// 					terrain={terrain}
					
// 					max_classrooms_for_pab={el.max_classrooms_for_pab}
// 					baths={el.baths}
// 					floors={el.floors}
// 					wall_thickness={WALL_THICKNESS}
// 					increment_scale={INCREMENT_SCALE}
					
// 					view={view}

// 					key={index}
// 					index={index}
// 				/>
// 			))}
// 		</group>
// 	)
// }

// class PabellonesClass {
// 	remaining_classrooms = amount_classrooms;
// 	offset = classroom.length; // offset en el TOP LEFT del pabellon === 1 classroom length
// 	bathrooms_amount = bathrooms.length;
// 	pabellones = [];

// 	constructor(
// 		// amount_classrooms, classroom, bathroom, stairs, bathrooms, data, terrain, pasillo, increment_scale, wall_thickness
// 	) {
// 		const amount_classrooms = "a";
// 		this.amount_classrooms = amount_classrooms;
// 		this.classroom = classroom;
// 		this.bathroom = bathroom;
// 		this.stairs = stairs;
// 		this.bathrooms = bathrooms;
// 		this.data = data;
// 		this.terrain = terrain;
// 		this.pasillo = pasillo;
// 		this.increment_scale = increment_scale;
// 		this.wall_thickness = wall_thickness;
// 	}

// 	computeMaxClassrooms = ({ have_bathroom = true, have_stairs = false } = {}) => {
// 		let buildable_terrain = terrain.length - offset;
// 		if (have_bathroom) buildable_terrain -= 334.9999938979745; // 334.9999938979745 is bathroom length
// 		if (have_stairs) buildable_terrain -= stairs.width;
// 		return Math.floor(buildable_terrain / classroom.length);
// 	}	

// 	getClassrooms = (obj, amount) => {
// 		let arr = [];
// 		for (let i = 0; i < amount; i++) {
// 			arr.push(obj.shift());
// 		}
// 		return arr;
// 	}

// 	addPeine = ({ floor_n }) => {
// 		const isLeftClassrooms = remaining_classrooms > max_classrooms_peine_for_floor;
// 		let classrooms_for_peine = isLeftClassrooms
// 			? max_classrooms_peine_for_floor
// 			: remaining_classrooms

// 		if (isLeftClassrooms) remaining_classrooms -= max_classrooms_peine_for_floor;
// 		else remaining_classrooms = 0;

// 		// se selecciona el floor por su index
// 		pab[2].floors[floor_n - 1].classrooms_for_peine = this.getClassrooms(classrooms, classrooms_for_peine);
// 	}

// 	getBaths = () => {
// 		if (bathrooms_amount > 0) {
// 			bathrooms_amount--;
// 			return bathrooms.shift().baths; 
// 		}
// 		else return 0
// 	}

// 	addFloor = ({ pab_n, floor_n, baths_n }) => {
// 		const baths = this.getBaths();
// 		const amount =  remaining_classrooms > pab[pab_n].max_classrooms
// 			? pab[pab_n].max_classrooms + (baths ? 0 : 1)
// 			: remaining_classrooms
		
// 		pab[pab_n].floors.push({
// 			floor: floor_n,
// 			classrooms: this.getClassrooms(classrooms, amount),
// 			baths,
// 			// baths: baths_n,
// 			// have_stairs: false
// 		});
// 		remaining_classrooms -= amount;
// 	}
// }
