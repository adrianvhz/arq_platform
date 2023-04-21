import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef } from 'react';
import { Shape } from "three";

export default function Test() {
	// let loader = new GLTFLoader();

	// loader.load("/assets/gltf/window.glb", function(gltf) {
	// 	console.log(gltf)
	// })

	let shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, 20);
	shape.lineTo(60, 20);
	shape.lineTo(60, 0);
	shape.lineTo(0, 0);

    let ref = useRef(null);

	useEffect(() => {
		ref.current.translate(-30, 0, -4);
	})

	return (
		<>
			<mesh rotation={[0, Math.PI, 0]}>
				<extrudeGeometry args={[shape, { depth: 8, bevelThickness: 1 }]} ref={ref} />
				<meshStandardMaterial />
			</mesh>
			<mesh position={[-100, 100, 0]} rotation={[0, Math.PI, 0]}>
				<boxGeometry args={[40, 40, 8]} />
				<meshStandardMaterial wireframe />
			</mesh>
		</>
	)
}
