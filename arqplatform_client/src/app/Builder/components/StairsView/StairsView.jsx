import { useSelector } from "react-redux";
import Stairs from "../../Plan3D/components/Stairs/Stairs";
import Stairs2D from "../../PlanFloor/components/Stairs2D/Stairs2D";

export default function StairsView({ position, rotation, stairs, floor, n_pabellon, hide_stairs, index, classroom }) {
	if (hide_stairs) return null;

	let view = useSelector(state => state.building.view);
	let view2DModule = useSelector(state => state.building.view2DModule);
	let view3DModule = useSelector(state => state.building.view3DModule);

	let Stairs_OBJ;

	if (view === "3D") {
		if (view3DModule === 1 && floor > 1) return null;
		else {
			Stairs_OBJ = Stairs;
		}
	} else {
		if (view2DModule === 1 && floor > 1) return null;
		else if (view2DModule > 1 && floor === 1) return null;
		else {
			Stairs_OBJ = Stairs2D;
		}
	}

	return (
		<Stairs_OBJ
			position={position}
			rotation={rotation}
			stairs={stairs}
			n_pabellon={n_pabellon}
			classroom={classroom}
			index={index}
		/>
	)
}