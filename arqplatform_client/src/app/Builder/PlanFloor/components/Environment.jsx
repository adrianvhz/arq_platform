import { useEffect } from "react";
import { Color } from "three";
import { Canvas, useThree } from "@react-three/fiber";

export default function Environment() {
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		// scene.background = new Color(0xfdf9fb);
	}, [camera]);
	return null;
}
