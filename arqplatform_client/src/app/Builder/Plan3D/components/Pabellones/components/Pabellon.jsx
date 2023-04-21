import ClassroomGroup from "../../ClassroomGroup/ClassroomGroup";
import Entrance from "../../Entrance/Entrance";
import SSHH from "../../SSHH/SSHH";
import Stairs from "../../Stairs/Stairs";
import Classroom2D from "../../../../PlanFloor/components/Classroom2D/Classroom2D";
import Entrance2D from "../../../../PlanFloor/components/Entrance2D/Entrance2D";
import SSHH2D from "../../../../PlanFloor/components/SSHH2D/SSHH2D";
import Stairs2D from "../../../../PlanFloor/components/Stairs2D/Stairs2D";
import Floor from "../../Floor";
import FloorPeine from "../../FloorPeine";
import { prevOddNumber } from "../../../../../../../lib/prevOddNumber";
// import ClassroomView from "../../../../components/ClassroomView/ClassroomView";
// import EntranceView from "../../../../components/EntranceView/EntranceView";
// import SSHHView from "../../../../components/SSHHView/SSHHView";
// import StairsView from "../../../../components/StairsView/StairsView";

export default function Pabellon({
	position, rotation, maxClassroomsForPeine,

	classroom, bathroom, stairs, corridor, terrain,

	floors,

	view
}) {
	const _floors = [];
	const _floorsPeine = [];

	const classroomsSpace = classroom.length * (floors[0].classrooms.length + (floors[0].baths > 0 ? 1 : 0));
	const escaleras = floors.length > 1 ? 120 : 0;

	const buildPeine = ({ classrooms, floor }) => {
		const posX = {								 // - 120 si hay escaleras
			top: (classroom.length * -floors[0].classrooms.length) - escaleras, // * -(n) tiene que ser el numero de aulas del primer piso
			middle: classroom.length - ((classroomsSpace + escaleras - classroom.width) / 2), // (clasroom.length * numero de aulas + baño)
			bottom: classroom.length
		}
		const posY = (floor - 1) * 140;
		const posZ = {
			// top: classroom.length + classroom.width + corridor.width,
			// middle: classroom.width + corridor.width,
			// bottom: classroom.width + corridor.width
			top: classroom.length,
			middle: 0,
			bottom: 0
		}

		const sides = {
			top: [],
			middle: [],
			bottom: []
		}

		var side = "top";
		
		for (let i = 0; i < classrooms.length; i++) {
			sides[side].push({
				// position: [posX[side], posY, posZ[side]],
				position: [0, 0, posZ[side]],
				rotation: [0, side === "top" ? Math.PI / 2 : Math.PI / -2, 0],
				room: view.view === "3D" ? ClassroomGroup : Classroom2D,
				floor: floor,
				level: classrooms[i],
				n: i,
			});

			posZ[side] += classroom.length;
			
			side = side === "top" ?  "middle" : (side === "middle" ? "bottom" : "top");
		}

		if (floor === 1 && classrooms.length) {
			if (sides.top.length > (maxClassroomsForPeine / 2)) {
				const x = prevOddNumber(sides.top.length)

				const index = Math.floor(x / 2);
				const obj = view.view === "3D" ? Entrance : Entrance2D;
				sides.top[index].room = obj;
				// topSideClassrooms.splice(index, 0, { room: obj });
			}
		}

		// peine.push(...sides.top, ...sides.middle, ...sides.bottom);

		_floorsPeine.push({
			sides: [
				{
					side: "top",
					classrooms: sides.top,
					position: [posX.top, posY, classroom.width + corridor.width]
				},
				{
					side: "middle",
					classrooms: sides.middle,
					position: [posX.middle, posY, classroom.width + corridor.width]
				},
				{
					side: "bottom",
					classrooms: sides.bottom,
					position: [posX.bottom, posY, classroom.width + corridor.width]
				}
			],
			floor,
			// classrooms: sides.top.concat(sides.middle, sides.bottom),
			// side,
			// positionX: posX[side],
			// positionY: posY
		});
	}
	
	// const buildFloor = ({ floor, classrooms, baths, classrooms_for_peine, maxClassrooms, pab }) => {
	const buildFloor = (data) => {
		const classrooms = [];
		let bathroom = null;
		let stairs = null;

		let x = 0;
		let y = (data.floor - 1) * 140;
		let z = 0;

		var classroomIndex = 0;
		const isNotLastFloor = data.floor < floors.length;

		const side1 = Math.ceil(data.classrooms.length / 2);
		const side2 = data.classrooms.length - side1;

		/* SIDE 1 */
		for (let i = 0; i < side1; i++) {
			classrooms.push({
				position: [x, y, z],
				floor: data.floor,
				level: data.classrooms[classroomIndex],
				room: view.view === "3D" ? ClassroomGroup : Classroom2D,
				n: classroomIndex,
			});
			x = addClassroomPosition(x);
			classroomIndex++;
		}
		
		/* STAIRS */
		if (floors.length > 1 && (data.classrooms.length > Math.floor(data.maxClassrooms / 2))) {
			x = stairsOffset(x);

			if (data.floor < floors.length) {
				stairs = {
					position: [x, y, z],
					room: view.view === "3D" ? Stairs : Stairs2D,
					extraRoofWidth: isNotLastFloor,
					floor: data.floor,
					// hide_stairs: data.floor >= floors.length
				}
			}
			
			x = addClassroomPosition(x);
		}
		
		/* BATHROOM */
		if (floors[data.floor - 1].baths) {
			bathroom = {
				position: [x, y, z],
				room: view.view === "3D" ? SSHH : SSHH2D,
				baths: data.baths,
				floor: data.floor,
			}

			x = addClassroomPosition(x);
		}

		/* SIDE 2 */
		for (let i = 0; i < side2; i++) {
			classrooms.push({
				position: [x, y, z],
				room: view.view === "3D" ? ClassroomGroup : Classroom2D,
				level: data.classrooms[classroomIndex],
				extraRoofWidth: isNotLastFloor,
				floor: data.floor,
				n: classroomIndex,
			});
			x = addClassroomPosition(x);
			classroomIndex++;
		}

		// BUILD FLOOR PEINE
		if (data.pab === 2 && data.classrooms_for_peine) {
			buildPeine({
				classrooms: data.classrooms_for_peine,
				floor: data.floor
			});
		}

		_floors.push({
			classrooms: classrooms,
			bathroom: bathroom,
			stairs: stairs,
			floor: data.floor,
			pab: data.pab
		});
	}
	
	for (let i = 0; i < floors.length; i++) {
		buildFloor(floors[i]);
	}
	
	console.log("_floors: ", _floors);
	console.log("_floorsPeine:", _floorsPeine);

	return (
		<group
			position={position}
			rotation={rotation}
		>
			{/* Pabellon floors */}
			{_floors.map((floor, index) => (
				<Floor
					key={index}
					classrooms={floor.classrooms}
					bathroom={floor.bathroom}
					stairs={floor.stairs}
					floor={floor.floor}
					view={view}
					haveCorridor={floor.floor < _floors.length}
					havePeine={_floorsPeine[index + 1]}
					_classroom={classroom}
					_bathroom={bathroom}
					_stairs={stairs}
					pab={floor.pab}
				/>
			))}

			{/* Peine Floors */}
			{_floorsPeine.map((floor, index) => (
				<FloorPeine
					key={index}
					sides={floor.sides}
					floor={floor.floor}
					_classroom={classroom}
					floorsLength={_floorsPeine.length}
					view={view}
				/>
			))}
		</group>
	)
}










const addClassroomPosition = (x) => {
	return x - 415;
	// return x - classroom.length;
}

const stairsOffset = (x) => {
	return x + (415 - 120);
	// return x + (classroom.length - stairs.width);
}

























// import { useRef } from "react";
// // import ClassroomView from "../../../../components/ClassroomView/ClassroomView";
// // import EntranceView from "../../../../components/EntranceView/EntranceView";
// // import SSHHView from "../../../../components/SSHHView/SSHHView";
// // import StairsView from "../../../../components/StairsView/StairsView";

// import ClassroomGroup from "../../ClassroomGroup/ClassroomGroup";
// import Entrance from "../../Entrance/Entrance";
// import SSHH from "../../SSHH/SSHH";
// import Stairs from "../../Stairs/Stairs";
// import Classroom2D from "../../../../PlanFloor/components/Classroom2D/Classroom2D";
// import Entrance2D from "../../../../PlanFloor/components/Entrance2D/Entrance2D";
// import SSHH2D from "../../../../PlanFloor/components/SSHH2D/SSHH2D";
// import Stairs2D from "../../../../PlanFloor/components/Stairs2D/Stairs2D";

// export default function Pabellon({
// 	position,
// 	rotation,

// 	classroom,
// 	bathroom,
// 	stairs,
// 	corridor,
// 	terrain,

// 	floors,
// 	index,
	
// 	wall_thickness, increment_scale,

// 	view
// }) {
// 	const extraRoofWidth = 125;
	
// 	const pabellon_group = useRef(null);
// 	let n_pabellon = index + 1;
	
// 	const room = []; // ClassroomView || SSHHView

// 	const addClassroomPosition = (x) => {
// 		return x - classroom.length;
// 	}

// 	const stairsOffset = (x) => {
// 		return x + (classroom.length - stairs.width);
// 	}

// 	// const bathroomOffset = (x) => { // 334.9999938979745 se refiere a bathroom length
// 	// 	return n_pabellon === 1 ? x - (classroom.length - 334.9999938979745) : x + (classroom.length - 334.9999938979745);
// 	// }


// 	/* ESTOS 2 SON IGUALES (wow) */
// 	// console.log(1, (((classroom.length * 6) + 120) / 2) + (classroom.width / 2));
// 	// console.log(2, (((classroom.length * 6) + 120 - classroom.width) / 2))

// 	// console.log(3, 1 - (((classroom.length * 6) + 120) / 2) + (classroom.width / 2))
// 	// console.log(4, 1 - ((((classroom.length * 6) + 120 - classroom.width) / 2)))


// 	const classroomsSpace = classroom.length * (floors[0].classrooms.length + (floors[0].baths > 0 ? 1 : 0));
// 	const escaleras = floors.length > 1 ? 120 : 0;

// 	const buildPeine = ({ classrooms, floor }) => {
// 		let posX = {     								 // - 120 si hay escaleras
// 			top: (classroom.length * -floors[0].classrooms.length) - escaleras, // * -(n) tiene que ser el numero de aulas del primer piso
// 			middle: classroom.length - ((classroomsSpace + escaleras - classroom.width) / 2), // (clasroom.length * numero de aulas + baño)
// 			bottom: classroom.length
// 			// top: 0,
// 			// middle: terrain.length / 2, // (-classroom.width * 2)
// 			// bottom: terrain.length
// 		}

// 		let posY = (floor - 1) * 137;
		
// 		let posZ = {
// 			top: classroom.length + classroom.width + corridor.width,
// 			middle: classroom.width + corridor.width,
// 			bottom: classroom.width + corridor.width
// 		}

// 		const classrooms_tmp = [];
// 		let side = "top";

// 		for (let i = 0; i < classrooms.length; i++) {
// 			classrooms_tmp.push({
// 				position: [posX[side], posY, posZ[side]],
// 				rotation_classroom: [0, side === "top" ? Math.PI / 2 : Math.PI / -2, 0],
// 				// room: ClassroomView,
// 				room: view.view === "3D" ? ClassroomGroup : Classroom2D,
// 				floor: floor,
// 				level: classrooms[i],
// 				side,
// 			});
// 			posZ[side] += classroom.length;
			
// 			side = side === "top" ?  "middle" : (side === "middle" ? "bottom" : "top");
// 		}

// 		if (floor === 1 && classrooms.length) {
// 			const topSideClassrooms = classrooms_tmp.filter(el => el.side === "top");
// 			topSideClassrooms[Math.floor(topSideClassrooms.length / 2)].room = view.view === "3D" ? Entrance : Entrance2D;
// 		}

// 		room.push(...classrooms_tmp);
// 	}

// 	const buildFloor = ({ floor, classrooms, baths, have_stairs, classrooms_for_peine, maxClassrooms }) => {
// 		let x = 0;
// 		let y = (floor - 1) * 137;
// 		let z = 0;

// 		let classroom_i = 0;
// 		let isNotLastFloor = floor < floors.length ? extraRoofWidth : 0

// 		// if (baths || have_stairs) {
// 			let side1 = Math.ceil(classrooms.length / 2);
// 			let side2 = classrooms.length - side1;

// 			/* SIDE 1 */
// 			for (let i = 0; i < side1; i++) {
// 				room.push({
// 					position: [x, y, z],
// 					// room: ClassroomView,
// 					room: view.view === "3D" ? ClassroomGroup : Classroom2D,
// 					level: classrooms[classroom_i],
// 					extraRoofWidth: isNotLastFloor,
// 					// level: classrooms[i].level,
// 					floor: floor
// 				});
// 				x = addClassroomPosition(x);
// 				classroom_i++;
// 			}
			
// 			/* STAIRS */
// 			// if (floors.length > 1) {
// 			// if (floor !== 3 && n_pabellon === 2) {
// 			// if (floor <= floors.length) {
// 			// if (floor <= floors.length - 1) {
// 			if (floors.length > 1 && classrooms.length > Math.floor(maxClassrooms / 2)) {
// 				// min classrooms on the floor to have stairs (or stairs space)
// 				// const minToStairs = 
// 				x = stairsOffset(x);
// 				if (floor < floors.length) {
// 					room.push({
// 						position: [x, y, z],
// 						rotation_classroom: n_pabellon === 1,
// 						// room: ClassroomView,
// 						room: view.view === "3D" ? Stairs : Stairs2D,
// 						n_pabellon: n_pabellon,
// 						extraRoofWidth: isNotLastFloor,
// 						floor: floor,
// 						hide_stairs: floor >= floors.length
// 					});
// 				}
// 				x = addClassroomPosition(x);
// 			}

			
// 			/* BATHROOM */
// 			if (floors[floor - 1].baths) {
// 			// if (floors[0].baths) {
// 				// x = bathroomOffset(x);
// 				room.push({
// 					position: [x, y, z],
// 					// room: ClassroomView,
// 					room: view.view === "3D" ? SSHH : SSHH2D,
// 					bathroom: bathroom,
// 					baths: baths,
// 					floor: floor,
// 					extraRoofWidth: isNotLastFloor,
// 					hide_sshh: !baths,
// 				});
// 				x = addClassroomPosition(x);
// 			}

// 			// side 2
// 			for (let i = 0; i < side2; i++) {
// 				room.push({
// 					position: [x, y, z],
// 					// room: ClassroomView,
// 					room: view.view === "3D" ? ClassroomGroup : Classroom2D,
// 					level: classrooms[classroom_i],
// 					extraRoofWidth: isNotLastFloor,
// 					// level: classrooms[i].level,
// 					floor: floor
// 				});
// 				x = addClassroomPosition(x);
// 				classroom_i++;
// 			}

// 		// BUILD FLOOR PEINE
// 		if (n_pabellon === 2) {
// 			classrooms_for_peine.length && buildPeine({ classrooms: classrooms_for_peine, floor });
// 		}
// 	}

// 	for (let i = 0; i < floors.length; i++) {
// 		buildFloor({
// 			amount: floors[i].amount_classrooms,
// 			floor: floors[i].floor,
// 			classrooms: floors[i].classrooms,
// 			baths: floors[i].baths,
// 			have_stairs: floors[i].have_stairs,
// 			classrooms_for_peine: floors[i].classrooms_for_peine,
// 			maxClassrooms: floors[i].maxClassrooms
// 		});
// 	}

// 	const { bigas, walls, columns, roof } = classroom;

// 	return (
// 		<group
// 			position={position}
// 			rotation={rotation}
// 			ref={pabellon_group}
// 		>
// 			{room.map((el, index) => (
// 				<el.room
// 					key={index}
// 					position={el.position}
// 					rotation={el.rotation_classroom} // pab 1 have rotation. rotation_classroom is for peines classrooms.
// 					// rotation={rotation || el.rotation_classroom} // pab 1 have rotation. rotation_classroom is for peines classrooms.
// 					// classroom={classroom}
// 					bathroom={bathroom}
// 					stairs={stairs}
// 					baths={el.baths}
// 					hide_sshh={el.hide_sshh}
// 					increment_scale={increment_scale}
// 					floor={el.floor}
// 					have_stairs={el.have_stairs}
// 					hide_stairs={el.hide_stairs}
// 					wall_thickness={wall_thickness}
// 					index={index}
// 					n_pabellon={n_pabellon}

// 					level={el.level}
// 					extraRoofWidth={el.extraRoofWidth || 0}

// 					view={view}

// 					// wallShape={wallShape}
// 					// wallExtrudeSettings={wallExtrudeSettings}

// 					classroom={classroom}

// 					bigas={bigas}
// 					walls={walls}
// 					columns={columns}
// 					roof={roof}
// 				/>
// 			))}
// 		</group>
// 	)
// }
