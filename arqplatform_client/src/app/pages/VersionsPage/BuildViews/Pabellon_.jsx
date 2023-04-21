import { useRef } from "react";
import { MathUtils } from "three";
import ClassroomGroup from "../../../Builder/Plan3D/components/ClassroomGroup/ClassroomGroup";
import Entrance from "../../../Builder/Plan3D/components/Entrance/Entrance";
import SSHH from "../../../Builder/Plan3D/components/SSHH/SSHH";
import Stairs from "../../../Builder/Plan3D/components/Stairs/Stairs";
import Classroom2D from "../../../Builder/PlanFloor/components/Classroom2D/Classroom2D";
import SSHH2D from "../../../Builder/PlanFloor/components/SSHH2D/SSHH2D";

export default function Pabellon_({ position, vista, rotation, classroom, bathroom, stairs, pasillo, terrain, floors, index, wall_thickness, increment_scale }) {
	let pabellon_group = useRef(null);
	let n_pabellon = index + 1;

	let oRoom = [];

	const addClassroomPosition = (x) => {
		return n_pabellon === 1 ? x + classroom.length : x - classroom.length;
	}

	const stairsOffset = (x) => {
		return n_pabellon === 1 ? x - (classroom.length - 120) : x + (classroom.length - 120);
	}

	const bathroomOffset = (x) => {
		return n_pabellon === 1 ? x - (classroom.length - 334.9999938979745) : x + (classroom.length - 334.9999938979745);
	}

	const buildPeine = (classrooms_for_peine, floor) => {
		let posX = {
			top: (-terrain.width) + (classroom.width * 3),
			middle: (-terrain.width / 2)  + (classroom.width * 3), // (-classroom.width * 2)
			bottom: classroom.length
		}

		let posY = (floor - 1) * 137;
		
		let posZ = {
			top: classroom.length + classroom.width + pasillo,
			middle: classroom.width + pasillo,
			bottom: classroom.width + pasillo
		}

		let side = "top";

		for (let i = 0; i < classrooms_for_peine.length; i++) {
			oRoom.push({
				position: [posX[side], posY, posZ[side]],
				rotation_classroom: [0, MathUtils.degToRad(side === "top" ? 90 : -90), 0],
				room: vista === "2D" ? Classroom2D : ClassroomGroup,
				floor: floor,
				level: classrooms_for_peine[i]
			});
			posZ[side] += classroom.length;
			
			side = side === "top" ?  "middle" : (side === "middle" ? "bottom" : "top");
		}

		if (floor === 1 && classrooms_for_peine.length) {
			oRoom[oRoom.length - 6].room = Entrance
		}
	}

	const buildFloor = ({ floor, classrooms, baths, have_stairs, classrooms_for_peine }) => {
		let x = 0;
		let y = (floor - 1) * 137;
		let z = 0;

		let classroom_i = 0;
		let side1 = Math.ceil(classrooms.length / 2);
		let side2 = classrooms.length - side1;

		// side 1
		for (let i = 0; i < side1; i++) {
			oRoom.push({
				position: [x, y, z],
				room: vista === "2D" ? Classroom2D : ClassroomGroup,
				level: classrooms[classroom_i],
				// level: classrooms[i].level,
				floor: floor
			});
			x = addClassroomPosition(x);
			classroom_i++;
		}

		// stairs
		if (floors.length > 1) {
			x = stairsOffset(x);
			oRoom.push({
				position: [x, y, z],
				room: Stairs,
				n_pabellon: n_pabellon,
				floor: floor,
				hide_stairs: floor >= floors.length
			});
			x = addClassroomPosition(x);
		}

		// bathroom
		if (floors[0].baths) {
			x = bathroomOffset(x);
			oRoom.push({
				position: [x, y, z],
				room: vista === "2D" ? SSHH2D : SSHH,
				bathroom: bathroom,
				baths: baths,
				floor: floor,
				hide_sshh: !baths
			});
			x = addClassroomPosition(x);
		}

		// side 2
		for (let i = 0; i < side2; i++) {
			oRoom.push({
				position: [x, y, z],
				room: vista === "2D" ? Classroom2D : ClassroomGroup,
				level: classrooms[classroom_i],
				// level: classrooms[i].level,
				floor: floor
			});
			x = addClassroomPosition(x);
			classroom_i++;
		}

		// BUILD FLOOR PEINE
		if (n_pabellon === 2) {
			buildPeine(classrooms_for_peine, floor);
		}
	}

	for (let i = 0; i < floors.length; i++) {
		buildFloor({
			amount: floors[i].amount_classrooms,
			floor: floors[i].floor,
			classrooms: floors[i].classrooms,
			baths: floors[i].baths,
			have_stairs: floors[i].have_stairs,
			classrooms_for_peine: floors[i].classrooms_for_peine
		});
	}

	return (
		<group
			position={position}
			ref={pabellon_group}
		>
			{oRoom.map((el, index) => (
				<el.room
					key={index}
					position={el.position}
					rotation={rotation || el.rotation_classroom} // pab 1 have rotation. rotation_classroom is for peines classrooms.
					classroom={classroom}
					bathroom={bathroom}
					stairs={stairs}
					baths={el.baths}
					hide_sshh={el.hide_sshh}
					increment_scale={increment_scale}
					floor={el.floor}
					have_stairs={el.have_stairs}
					hide_stairs={el.hide_stairs}
					wall_thickness={wall_thickness}
					index={index}
					n_pabellon={n_pabellon}

					level={el.level}
				/>
			))}
		</group>
	)
}
