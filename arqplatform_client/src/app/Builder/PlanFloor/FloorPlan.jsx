import { Camera, PerspectiveCamera, Vector3, OrthographicCamera, MOUSE, CameraHelper, Euler } from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Sky, Shadow, TransformControls, MapControls, GizmoHelper, GizmoViewport, GizmoViewcube } from "@react-three/drei";
import HighlightMesh from "./components/HighlightMesh";
import PlaneMesh from "./components/PlaneMesh";
import { useEffect, useRef } from "react";
import Environment from "./components/Environment";
import Terrain from "../Plan3D/components/Terrain/Terrain";

export default function FloorPlan() {
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	var frustumSize = 600;
	// var minPan = new Vector3(-2, -2, -2);
	var minPan = new Vector3(-30, -30, -30);
	var maxPan = new Vector3(50, 50, 50);
	// var maxPan = new Vector3(2, 2, 2);
	var _v = new Vector3();

	// var camera = new OrthographicCamera(0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 150, 1000); // args: [45, window.innerWidth / window.innerHeight, 0.1, 1000], position: [0, 8, 0], zoom: 5
	var orto_camera = new OrthographicCamera(SCREEN_WIDTH / -33, SCREEN_WIDTH / 33, SCREEN_HEIGHT / 33, SCREEN_HEIGHT / -33, 1, 1000);
	orto_camera.far = 5000;
	orto_camera.position.set(0, 5, 0);
	// camera.zoom = 15;
	// var cameraHelper = new CameraHelper(camera);
	// cameraHelper.position.set(0, 5, 0);
	// camera.position.z = 5;


	return (
		<>
			{/* <div style={{position: "absolute"}}>
				Description
			</div> */}
			<Canvas
				camera={{
					args: [45, window.innerWidth / window.innerHeight, 0.1, 1000],
					fov: 65, // 60
					aspect: window.innerWidth / window.innerHeight,
					position: [3202.3188734998785, 858.758291437268, -42.78855655034773],
					rotation: new Euler("-1.6205812315008037", "1.3084828063007592", "1.6223414925263104", "XYZ"),
					far: 9000,
					near: 3
				}}
				style={{cursor: "crosshair"}}
			>
				{/* <Sky distance={450000} sunPosition={[1, 0, 1]} inclination={0.5} azimuth={0.25}  />
				<ambientLight intensity={.3} /> */}
				{/* <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} /> */}
				<Shadow
					color="red"
					scale={[8, 8, 8]}
					colorStop={0.5}
					opacity={1}
					fog={false}
				/>
				
				{/* <gridHelper args={[100, 50]} position={[0, 1, 0]} /> */}

				<OrbitControls
					// enableRotate={false}
					// onChange={(evt) => {
					// 	_v.copy(evt.target.target)
					// 	evt.target.target.clamp(minPan, maxPan);
					// 	_v.sub(evt.target.target);
					// 	camera.position.sub(_v);
					// }}
					// mouseButtons={{
					// 	LEFT: MOUSE.RIGHT,
					// 	RIGHT: MOUSE.LEFT
					// }}
					// zoomSpeed={2}
					// minZoom={3}
					// maxZoom={6}
				/>
			</Canvas>
		</>
	)
}