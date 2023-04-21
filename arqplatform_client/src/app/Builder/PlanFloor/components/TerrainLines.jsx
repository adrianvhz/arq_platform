import { useEffect, useRef } from "react";
import { Shape } from "three";

export default function TerrainLines({ width, length }) {
	/** @type {{ current: import("three").BufferGeometry }} */
	let ref = useRef(null);

	let vertices = [
		0, 0, 0,
		0, 100, 0,
		100, 100, 0,
		100, 0, 0,
		0, 0, 0
	];

	let half_width = width / 2;
	let half_length = length / 2;

	// 400x400
	let shape = new Shape();
	shape.moveTo(-half_length, -half_width);
	shape.lineTo(half_length, -half_width);
	shape.lineTo(half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.closePath();
		
		
	useEffect(() => {
		// ref.current.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3))
	}, [])

	return (
		<line
			ref={obj}
			rotation={[-Math.PI / 2, 0, 0]}
		>
			{/* <bufferGeometry ref={ref} /> */}
			<shapeGeometry args={[shape]} ref={geom} />
			<lineBasicMaterial
				color={"black"}
			/>
		</line>
	)
}
