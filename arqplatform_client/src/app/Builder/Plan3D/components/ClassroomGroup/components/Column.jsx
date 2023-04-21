// import { useEffect, useRef } from "react";
// import { Shape, TextureLoader, RepeatWrapping, CullFaceFrontBack } from "three";
// import { useTexture } from "@react-three/drei";
// import textureImg from "../../../../../../assets/textures/bricksx256.jpg";
// import { useLoader } from "@react-three/fiber";
// import columnImg from "../../../../../../assets/textures/column/base.jpg";
// import columnNormalImg from "../../../../../../assets/textures/column/base.jpg";

export default function Column({ position, rotation, geometry, material }) {
	return (
		<mesh
			position={position} rotation={rotation}
			geometry={geometry} material={material}
		/>
	)
}






// export default function Column({ position, classroom_height, increment_scale }) {
// 	// (0.25)^2
// 	let width = 0.25 * increment_scale;
// 	let length = 0.25 * increment_scale;
// 	let height = classroom_height;

// 	/**
// 	 * @type {{ current: import("three").ExtrudeGeometryOptions }}
// 	*/
// 	let geometry = useRef(null);
// 	let shape = new Shape();
	
// 	let extrudeSettings = {
// 		steps: 8,
// 		depth: height,
// 		bevelEnabled: false
// 	}

// 	// var columnTexture = useLoader(TextureLoader, columnImg);
// 	// columnTexture.repeat.set(.3, .3);
// 	// columnTexture.rotation = Math.PI / 2;
//     // columnTexture.wrapS = columnTexture.wrapT = RepeatWrapping;

// 	// var columnNormalTexture = useLoader(TextureLoader, columnNormalImg);
// 	// columnNormalTexture.repeat.set(.3, .3);
// 	// columnNormalTexture.rotation = Math.PI / 2;
//     // columnNormalTexture.wrapS = columnNormalTexture.wrapT = RepeatWrapping;
	
// 	shape.moveTo(0, 0);
// 	shape.lineTo(0, width);
// 	shape.lineTo(length, width);
// 	shape.lineTo(length, 0);
// 	shape.lineTo(0, 0);
	
// 	let [texture] = useTexture([textureImg]);
// 	texture.wrapS = RepeatWrapping;
// 	texture.wrapT = RepeatWrapping;
//     texture.repeat.set(40, 40);

// 	useEffect(() => {
// 		// esto es lo mismo que multiplicar la escla por el width, length and height
// 		// geometry.current.scale(increment_scale, increment_scale, 1);
// 	})

// 	return (
// 		<mesh
// 			position={position}
// 			rotation={[-Math.PI / 2, 0 , 0]}
// 			// position={position}
// 		>
// 			{/* <extrudeGeometry ref={geometry} args={[shape, extrudeSettings]} /> */}
// 			<boxGeometry args={[12.5, 12.5, 120]} />
// 			<meshStandardMaterial map={texture} />{/* map={columnTexture} normalMap={columnNormalTexture} */}
// 		</mesh>
// 	)
// }
