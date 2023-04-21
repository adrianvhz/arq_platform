import { useSelector } from "react-redux";
import Terrain from "../../Plan3D/components/Terrain/Terrain";
import Terrain2D from "../../PlanFloor/components/Terrain2D/Terrain2D";

export default function TerrainView({ width, length }) {
	let view = useSelector(state => state.building.view);
	let Terrain_OBJ = view === "3D" ? Terrain : Terrain2D;

	return <Terrain_OBJ
		width={width}
		length={length}
	/>
}
