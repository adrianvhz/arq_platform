import { useSelector } from "react-redux";
import Side from "./objects/Side";

export default function FloorPeine({ sides, floor, _classroom, floorsLength, view }) {
	const selectedFloor = useSelector(state => state.building["floor" + floor]);

	return (
		<group visible={selectedFloor}>
			{sides.map((side, index) => (
				<Side
					key={index}
					position={side.position}
					classrooms={side.classrooms}
					floor={floor}
					side={side.side}
					_classroom={_classroom}
					floorsLength={floorsLength}
					view={view}
				/>
			))}
		</group>
	)
}
