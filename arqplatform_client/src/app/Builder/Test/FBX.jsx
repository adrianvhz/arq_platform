import { useFBX } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useRef } from "react"
import { Suspense } from "react";
import { DoubleSide } from "three";
import window_fbx from "../../../../assets/fbx/win.fbx";
import window_fbx_texture from "../../../../assets/textures/window_normal.png";

export default function FBX() {
	let fbx = useLoader(FBXLoader, window_fbx);
	

	return (
		<mesh scale={[1, 1, 1]} position={[1, -400, 1]}>
			<primitive object={fbx} dispose={null} />
		</mesh>
	)
}