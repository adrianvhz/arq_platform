import { useRef } from "react";
import { DoubleSide, FrontSide, BackSide } from "three";
import { useFrame } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";

export default function PlaneMesh() {
	/** @type {{ current: import("@react-three/fiber").MeshProps }} */
	const ref = useRef(null);

    // useFrame((state, delta) => {
	// 	ref.current.rotateX(-Math.PI / 2);
	// });
	
	return (
		<>
			<mesh
				receiveShadow
				ref={ref}
				name="ground"
			>
				<planeGeometry args={[20, 20]} />
				<meshBasicMaterial side={BackSide} visible={false} />
			</mesh>
		</>
	)
}
