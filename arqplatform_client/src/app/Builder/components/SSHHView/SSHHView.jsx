import { useSelector } from "react-redux";
import SSHH from "../../Plan3D/components/SSHH/SSHH";
import SSHH2D from "../../PlanFloor/components/SSHH2D/SSHH2D";

export default function SSHHView({
	position, rotation, bathroom, baths, classroom, wall_thickness, increment_scale, floor, hide_sshh, index, n_pabellon, extraRoofWidth
}) {
	if (hide_sshh) return null;

	let view = useSelector(state => state.building.view);
	let view3DModule = useSelector(state => state.building.view3DModule);
	let view2DModule = useSelector(state => state.building.view2DModule);

	let SSHH_OBJ;

	if (baths === null) return null;

	if (view === "3D") {
		if (view3DModule === 1 && floor > 1) return null;
		else {
			SSHH_OBJ = SSHH;
		}
	} else {
		if (view2DModule === 1 && floor > 1) return null;
		else if (view2DModule > 1 && floor === 1) return null;
		else {
			SSHH_OBJ = SSHH2D;
		}
	}

	return <SSHH_OBJ
		position={position}
		rotation={rotation}
		bathroom={bathroom}
		baths={baths}
		classroom={classroom}
		wall_thickness={wall_thickness}
		increment_scale={increment_scale}
		index={index}
		n_pabellon={n_pabellon}
		extraRoofWidth={extraRoofWidth}
	/>
}
