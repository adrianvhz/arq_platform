import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Shape } from "three";
import Corridor from "./objects/Corridor";

export default function Floor({
	classrooms, bathroom, stairs, floor, haveCorridor, havePeine, _classroom, _bathroom, _stairs, view, pab
}) {
	const selectedFloor = useSelector(state => state.building["floor" + floor]);
	const ref = useRef();

	const pabLength = (415 * (classrooms.length + getBathroom(bathroom))) + getStairs(stairs);

	const corridor = new Shape();
	corridor.moveTo(0, 0);
	corridor.lineTo(0, 120);
	corridor.lineTo(-pabLength, 120);
	corridor.lineTo(-pabLength, 0);
	corridor.closePath();

	const baranda = new Shape();
	baranda.moveTo(0, 0);
	baranda.lineTo(0, 60);
	baranda.lineTo(-pabLength, 60);
	baranda.lineTo(-pabLength, 0);
	baranda.closePath();

	
	const barandaWhenPeine1 = new Shape();
	barandaWhenPeine1.moveTo(0, 0);
	barandaWhenPeine1.lineTo(0, 60); // se le quita el ancho de un aula (la del medio (para ops math))
	barandaWhenPeine1.lineTo(((-pabLength + _classroom.width) / 2) + (_classroom.width + (120)), 60); // -(pabLength - ((_classroom.width + _stairs.width) * 3)) / 2
	barandaWhenPeine1.lineTo(((-pabLength + _classroom.width) / 2) + (_classroom.width + (120)), 0);
	barandaWhenPeine1.closePath();

	const barandaWhenPeine2 = new Shape();
	barandaWhenPeine2.moveTo(0, 0);
	barandaWhenPeine2.lineTo(0, 60); // se le quita el ancho de un aula (la del medio (para ops math))
	barandaWhenPeine2.lineTo(((-pabLength + _classroom.width) / 2) + (_classroom.width + (120 * 2)), 60); // -(pabLength - ((_classroom.width + _stairs.width) * 3)) / 2
	barandaWhenPeine2.lineTo(((-pabLength + _classroom.width) / 2) + (_classroom.width + (120 * 2)), 0);
	barandaWhenPeine2.closePath();

	useEffect(() => {
		// console.log(ref.current.children)
		// ref.current.remove(...ref.current.children.filter(el => el.userData !== "classroom"));
		// ref.current.add();




		// console.log(ref.current.children);
		// const classrooms = ref.curre/nt.children;
		
		// ref.current.visible = false;
		// console.log(ref.current);


		// for (let classroom of classrooms) {
			// classroom.visible = false;
			// classrooms.add
		// }

		// for (var child of ref.current.children) {
		// 	console.log(child.getObjectByProperty("a", "asd"));
		// }
	}, []);

	return (	// visible={!(selectedFloor === 1 && floor > 1)}
		<group ref={ref} visible={selectedFloor}>
			{classrooms.map(classroom => (
				// <ClassroomGroup
				<classroom.room
					key={classroom.n}
					position={classroom.position}
					level={classroom.level}
					classroom={_classroom}
					view={view}
				/>
			))}

			{bathroom && (
				// <SSHH
				<bathroom.room
					position={bathroom.position}
					baths={bathroom.baths}
					bathroom={_bathroom}
					classroom={_classroom}
					view={view}
				/>
			)}
			
			{stairs && (
				// <Stairs
				<stairs.room
					position={stairs.position}
					floor={stairs.floor}
					stairs={_stairs}
					view={view}
				/>
			)}

			{haveCorridor && view.view === "3D" && (
				<Corridor
					_classroom={_classroom}
					_stairs={_stairs}
					floor={floor}
					corridor={corridor}
					baranda={baranda}
					barandaWhenPeine={barandaWhenPeine1}
					barandaWhenPeine2={barandaWhenPeine2}
					pabLength={pabLength}
					havePeine={havePeine}
					pab={pab}

					// buscar otra manera
					classrooms={classrooms}
				/>
			)}
		</group>
	)
}

const getBathroom = (bathroom) => Number(!!bathroom);
const getStairs = (stairs) => stairs ? 120 : 0; 

