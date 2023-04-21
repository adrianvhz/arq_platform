import { useSelector } from "react-redux";

export default function Roof({ position, rotation, geometry, material }) {
	const show = useSelector(selectRoof);

	return (
		<mesh
			position={position}
			rotation={rotation}
			geometry={geometry}
			material={material}
			visible={show}
		/>
	)
}

const selectRoof = state => state.building.roof;
