import { useSelector } from "react-redux";
import Entrance from "../../Plan3D/components/Entrance/Entrance";
import Entrance2D from "../../PlanFloor/components/Entrance2D/Entrance2D";

export default function EntranceView({ position, rotation, classroom, wall_thickness }) {
	let view = useSelector(state => state.building.view);
	let view2DModule = useSelector(state => state.building.view2DModule);

	let Classroom_OBJ = view === "3D" ? Entrance : Entrance2D;

	if (view === "2D" && view2DModule > 1) return null;

	return <Classroom_OBJ
		position={position}
		rotation={rotation}
		classroom={classroom}
		wall_thickness={wall_thickness}
	/>
}
