import { MathUtils } from "three";
import Pabellon from "./components/Pabellon";

export default function Pabellones({
	amount_classrooms, classroom, bathroom, stairs, baths_amount, data, terrain, increment_scale, wall_thickness
}) {
	let pabellones = [];
	let remaining_classrooms = amount_classrooms;
	let pasillo = 2.4 * 50;
	let offset = classroom.length; // offset en el TOP LEFT del pabellon === 1 classroom length

	// maximo numero de aulas por el largo del terreno
	const computeMaxClassrooms = ({ have_bathroom, have_stairs } = {}) => {
		let buildable_terrain = terrain.width - offset;
		if (have_bathroom) buildable_terrain -= 334.9999938979745; // 334.9999938979745 is bathroom length
		if (have_stairs) buildable_terrain -= stairs.width;
		return Math.floor(buildable_terrain / classroom.length);
	}

	// CALCULAR NUMERO DE PABELLONES                // +1 es por el offset.
	let total_classrooms_length = ((amount_classrooms + 1) * classroom.length) + 334.9999938979745; // 334.9999938979745 is bathroom length
	let amount_pabellones = total_classrooms_length < terrain.width ? 1 : 2;

	let pab = {
		1: { // (classroom.length * 2) es el offset en la parte superior del pabellon.
			x: -terrain.width / 2 + (classroom.length * 2),
			y: 0,
			z: terrain.width / 2,
			rotation: [0, MathUtils.degToRad(-180), 0],
			baths: baths_amount.pab1,
			max_classrooms: computeMaxClassrooms({ have_bathroom: true, have_stairs: false }),
			floors: []
		},
		2: { // (classroom.length) es el offset en la parte superior del pabellon. NOTE: No se multiplica x2 porque este pabellon no ha sido rotado como el primero.
			// x: terrain.width / 2 - (classroom.length * 2),
			x: terrain.width / 2 - (classroom.length * 1.5), // 1.5 es para que sea el (largo + (largo / 2))  |  2
			y: 0,
			z: -terrain.width / 2,
			baths: baths_amount.pab2,
			max_classrooms: computeMaxClassrooms({ have_bathroom: baths_amount.find(el => el.pab === 2).baths > 0, have_stairs: false }),
			floors: []
		}
	}

	// pab[2].classrooms_for_peine = 

	// Formula: Tl - 2(p + Cw) / Cl
	let max_classrooms_peine = Math.floor((terrain.width - (2 * (pasillo + classroom.width))) / classroom.length); // +1 (forzar un aula más en peine)
	// Formula: (MaxClassroomsP1 + MaxClassroomsP2 + 3 * MaxClassroomsPeine) - 1
	let max_classrooms_for_floor = pab[1].max_classrooms + pab[2].max_classrooms + (3 * max_classrooms_peine) - 1;
	

	// Si hay mas aulas que maximo de aulas por primer piso, entonces se volvera a calcular el max_classrooms por pabellon.
	if (amount_classrooms > max_classrooms_for_floor) {
		pab[1].max_classrooms = computeMaxClassrooms({ have_bathroom: true, have_stairs: true });
		if (max_classrooms_for_floor + pab[1].max_classrooms) {
			pab[2].max_classrooms = computeMaxClassrooms({ have_bathroom: baths_amount.find(el => el.pab === 2).baths > 0, have_stairs: true });
		}
	}

	console.log({ max_classrooms_peine, max_classroom_first_floor: max_classrooms_for_floor });
	console.log({ "max classrooms first pabellon:": pab[1].max_classrooms, "max classrooms second pabellon:": pab[2].max_classrooms });

	const getClassrooms = (obj, amount) => {
		let arr = [];
		for (let i = 0; i < amount; i++) {
			arr.push(obj.shift());
		}
		return arr;
	}

// ------------------------------------------- //
	let classrooms = [];
	
	for (let level of data.levels) {
		console.log(level, data.aulas[level])
		for (let i = 0; i < data.aulas[level]; i++) {
			classrooms.push(level)
		}
	}
	console.log(classrooms)

	if (amount_pabellones === 1) {
		pab[1].floors.push({
			floor: 1,
			classrooms: classrooms,
			baths: 5
		});
	} else {
		// primer piso
		pab[1].floors.push({
			floor: 1,
			classrooms: getClassrooms(classrooms, 5), // pab[1].max_classrooms
			baths: 5,
			// have_stairs: false
		});
		remaining_classrooms -= 5;
		
		let a = remaining_classrooms > 5 ? 5 : remaining_classrooms;
		pab[2].floors.push({
			floor: 1,
			classrooms: getClassrooms(classrooms, a),
			baths: 3,
			// have_stairs: true
		});
		remaining_classrooms -= a;


		// PEINE primer piso
		let totalSidesPeine = max_classrooms_peine * 3;
		let classrooms_for_peine;

		if (remaining_classrooms > totalSidesPeine) {
			classrooms_for_peine = totalSidesPeine;
			remaining_classrooms -= totalSidesPeine;
		} else {
			classrooms_for_peine = remaining_classrooms;
			remaining_classrooms = 0;
		}
		pab[2].floors[0].classrooms_for_peine = getClassrooms(classrooms, classrooms_for_peine);
		// END PEINE primer piso

		console.log("remaining classrooms after peine", remaining_classrooms);

		// segundo piso
		if (remaining_classrooms > 0) {
			let b = remaining_classrooms > 5 ? 5 : remaining_classrooms;
			pab[1].floors.push({
				floor: 2,
				classrooms: getClassrooms(classrooms, b),
				baths: 0,
				// have_stairs: false
			});
			remaining_classrooms -= b;
		}

		if (remaining_classrooms > 0) {
			let c = remaining_classrooms > 5 ? 5 : remaining_classrooms;
			pab[2].floors.push({
				floor: 2,
				classrooms: getClassrooms(classrooms, c),
				baths: 4,
				// have_stairs: false
			});
			remaining_classrooms -= c;
		}

		// PEINE segundo piso
		let totalSidesPeine2 = max_classrooms_peine * 3;
		let classrooms_for_peine2;

		if (remaining_classrooms > totalSidesPeine2) {
			classrooms_for_peine2 = totalSidesPeine2;
			remaining_classrooms -= totalSidesPeine2;
		} else {
			classrooms_for_peine2 = remaining_classrooms;
			remaining_classrooms = 0;
		}

		// floors[1] porque es el index, serie el piso 2
		if (pab[2].floors[1]) pab[2].floors[1].classrooms_for_peine = getClassrooms(classrooms, classrooms_for_peine2);
		// END PEINE segundo piso

		
		// tercer piso
		if (remaining_classrooms > 0) {
			let d = remaining_classrooms > 5 ? 5 : remaining_classrooms;
			pab[1].floors.push({
				floor: 3,
				classrooms: getClassrooms(classrooms, d),
				baths: 0,
				have_stairs: false
			});
			remaining_classrooms -= d;
		}

		if (remaining_classrooms > 0) {
			let e = remaining_classrooms > 5 ? 5 : remaining_classrooms;
			pab[2].floors.push({
				floor: 3,
				classrooms: getClassrooms(classrooms, e),
				baths: 0,
				have_stairs: false
			});
			remaining_classrooms -= e;
		}
		// end tercer piso

		// PEINE tercer piso
		let totalSidesPeine3 = max_classrooms_peine * 3;
		let classrooms_for_peine3;

		if (remaining_classrooms > totalSidesPeine3) {
			classrooms_for_peine3 = totalSidesPeine3;
			remaining_classrooms -= totalSidesPeine3;
		} else {
			classrooms_for_peine3 = remaining_classrooms;
			remaining_classrooms = 0;
		}

		// floors[2] porque es el index, serie el piso 3
		if (pab[2].floors[2]) pab[2].floors[2].classrooms_for_peine = getClassrooms(classrooms, classrooms_for_peine3);
		// END PEINE tercer piso
		
	}

// ------------------------------------------- //



	// let num_aula = 1;
	
	// let pab_current = 1;
	// let floor_current = 1;

	// let classrooms_tmp = [];

	// for (let i = 1; i <= amount_pabellones; i++) {
	// 	for (let i = 0; i < pab[i].floors; i++) {

	// 	}
	// }

	// for (let i = 0; i < classrooms.length; i++) {
		
	// }

	console.log("pab 1 classrooms", pab[1].floors);
	console.log("pab 2 classrooms", pab[2].floors);





	// Se uso una clase porque las propiedades necesitan de sus datos entre si.
	// class AmountsPab {
	// 	constructor(p) {
	// 		this.side1;
	// 		this.side2;
	// 		p === 1 ? this.forPab1() : this.forPab2();
	// 	}

	// 	forPab1() {
	// 		this.side1 = Math.ceil(pab[1].max_classrooms / 2);
	// 		this.side2 = pab[1].max_classrooms - this.side1;

	// 		remaining_classrooms -= pab[1].max_classrooms;
	// 	}

	// 	forPab2() {
	// 		let b = remaining_classrooms <= pab[2].max_classrooms ? remaining_classrooms : pab[2].max_classrooms;
	// 		this.side1 = Math.ceil(b / 2);
	// 		this.side2 = b - this.side1;
			
	// 		remaining_classrooms -= this.side1 + this.side2;
	// 	}
	// }
	// END CLASS




	// PUSH PABELLONES
	for (let p = 1; p <= amount_pabellones; p++) {
		// let topSide;
		// let bottomSide;

		// // 1 PABELLON
		// if (amount_pabellones === 1) {
		// 	topSide = Math.ceil(remaining_classrooms / 2);
		// 	bottomSide = remaining_classrooms - topSide;

		// 	remaining_classrooms = 0;
		// }

		// // 2 PABELLONES
		// else {
		// 	let amountsPab = new AmountsPab(p);

		// 	topSide = amountsPab.side1;
		// 	bottomSide = amountsPab.side2;
		// }
		
		pabellones.push({
			position: [pab[p].x, pab[p].y, pab[p].z],
			rotation: pab[p].rotation,
			max_classrooms_for_pab: pab[p].max_classrooms,
			floors: pab[p].floors
			// amountSide1: topSide,
			// amountSide2: bottomSide,
			// baths: pab[p].baths,
		});

		// remaining_classrooms -= max_classrooms_per_pabellon;
	}

	// let totalSidesPeine = max_classrooms_peine * 3;
	// let classrooms_for_peine;

	// if (remaining_classrooms > totalSidesPeine) {
	// 	classrooms_for_peine = totalSidesPeine;
	// 	remaining_classrooms -= totalSidesPeine;
	// } else {
	// 	classrooms_for_peine = remaining_classrooms;
	// 	remaining_classrooms = 0;
	// }

	// console.log("remaining classrooms for second floor", remaining_classrooms);

	// if (remaining_classrooms > 0) {
	// 	let amount_high_floors = Math.ceil(remaining_classrooms / pab[1].max_classrooms);
	// 	pab[1].floors_above = Math.ceil(amount_high_floors / 2);
	// 	pab[2].floors_above = amount_high_floors - pab[1].floors_above;
	// }

	return (
		pabellones.map((el, index) => (
			<Pabellon
				key={index}
				position={el.position}
				rotation={el.rotation}
				classroom={classroom}
				bathroom={bathroom}
				stairs={stairs}
				pasillo={pasillo}
				terrain={terrain}
				classrooms_for_peine={pab[2].classrooms_for_peine}
				classrooms_for_peine2={pab[2].classrooms_for_peine2}
				max_classrooms_for_pab={el.max_classrooms_for_pab}
				baths={el.baths}
				floors={el.floors}
				wall_thickness={wall_thickness}
				increment_scale={increment_scale}
				index={index}
			/>

			// <Pabellon
			// 	key={index}
			// 	position={el.position}
			// 	rotation={el.rotation}
			// 	amountSide1={el.amountSide1}
			// 	amountSide2={el.amountSide2}
			// 	classroom={classroom}
			// 	bathroom={bathroom}
			// 	stairs={stairs}
			// 	increment_scale={increment_scale}
			// 	terrain={terrain}
			// 	classrooms_for_peine={classrooms_for_peine}
			// 	floors_above={pab[index + 1].floors_above}
			// 	index={index}
			// 	baths={el.baths}
			// 	pasillo={pasillo}
			// 	wall_thickness={wall_thickness}
			// />
		))
	)
}
