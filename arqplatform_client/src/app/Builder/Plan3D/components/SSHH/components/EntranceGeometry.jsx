import { Shape } from "three";

export default function EntranceGeometry() {
		

	return (
		<extrudeGeometry args={[shape, { depth: 8 }]} />
	)
}
