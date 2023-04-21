import { useEffect, useRef } from "react";
import { DoubleSide } from "three";
import { useFrame } from "@react-three/fiber";

export default function HighlightMesh() {
	/** @type {{ current: import("@react-three/fiber").MeshProps }} */
	const ref = useRef(null);

    // useFrame((state, delta) => {
	// 	// ref.current.rotateX(-Math.PI / 2);
	// 	ref.current.position.set(0.5, 0, 0.5);
	// 	// ref.current.
	// });

	useEffect(() => {
		ref.current.position.set(0.5, 0, 0.5);
	})

	return (
		<>
			<mesh
				receiveShadow
				ref={ref}
				name="ground"
			>
				<planeGeometry args={[1, 1]} />
				<meshBasicMaterial side={DoubleSide} transparent={true} />
			</mesh>
		</>
	)
}
