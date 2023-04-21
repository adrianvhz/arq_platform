import { useSelector } from "react-redux";
import { DoubleSide } from "three";

export default function MeshWallColor({ color, material }) {
	// let colorWall = useSelector(state => state.building.colorWall);

	return (
		<meshStandardMaterial
			// color={new Color(colorWall)}
			color={color}
			side={DoubleSide}
		/>
	)
}
