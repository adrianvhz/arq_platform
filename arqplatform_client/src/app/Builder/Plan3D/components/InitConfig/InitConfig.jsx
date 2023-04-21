// import { ObjectLoader } from "three";
// import { GizmoHelper, GizmoViewcube, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

// import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import { useThree } from "@react-three/fiber";
import CameraControls from "./CameraControls";
// import { GizmoViewport } from "@react-three/drei";
import "./styles.css";

export default function InitConfig({ view, sky }) {
	const gl = useThree(state => state.gl);
	const scene = useThree(state => state.scene);
	const camera = useThree(state => state.camera);
	const viewport = useThree(state => state.viewport);

	// window.onclick = () => console.log(camera);
	// window.ondblclick = () => console.log(viewport);

	// const exporter = new GLTFExporter();
	// const loader = new GLTFLoader();

	// window.addEventListener("resize", onResizeWindow);

	// function onResizeWindow(evt) {
	// 	camera.aspect = (window.innerWidth - 278) / (window.innerHeight - 80);
	// 	gl.setSize(window.innerWidth - 278, window.innerHeight - 80);
	// }


	// window.ondblclick = () => {
	// 	exporter.parse(scene, (gltf) => {
	// 		const output = JSON.stringify(gltf, null, 2);
	// 		const blobURL = URL.createObjectURL(new Blob([output], { type: "text/plain" }));

	// 		link.setAttribute("href", blobURL);
	// 		link.setAttribute("download", "test.gltf");
	// 		link.click();

	// 		URL.revokeObjectURL(blobURL);
	// 	})
	// }

	const link = document.createElement("a");

	document.getElementById("select-export").onchange = (evt) => {
		const value = evt.target.value;

		if (value === "obj") {
			const exporter = new OBJExporter();
			const data = exporter.parse(scene.getObjectByName("Pabellones"));
			
			const blobURL = URL.createObjectURL(new Blob([data], { type: "text/plain" }));

			link.setAttribute("href", blobURL);
			link.setAttribute("download", "test.obj");
			link.click();

			URL.revokeObjectURL(blobURL);

			evt.target.value = "EXPORTAR";
		} 
		else if (value === "jpeg") {
			gl.render(scene, camera);

			const dataURL = gl.domElement.toDataURL("image/jpeg");

			link.setAttribute("href", dataURL);
			link.setAttribute("download", "canvas.jpeg");
			link.click();

			evt.target.value = "EXPORTAR";
		}
		else if (value === "json") {
			const data = scene.getObjectByName("Pabellones").toJSON();
			const str = JSON.stringify(data);

			link.setAttribute("href", "data:application/json," + str);
			link.setAttribute("download", "canvas.json");
			link.click();

			evt.target.value = "EXPORTAR";
		}
	}


	// document.getElementById("save-jpeg").onclick = function() {
	// 	gl.render(scene, camera);

	// 	/*var resizedCanvas = document.createElement("canvas");
	// 	var resizedContext = resizedCanvas.getContext("2d");

	// 	resizedCanvas.height = "300";
	// 	resizedCanvas.width = "500";

	// 	var canvas = gl.domElement;

	// 	resizedContext.drawImage(canvas, 0, 0, 500, 300);
	// 	var dataURL = resizedCanvas.toDataURL("image/jpeg");
	// 	*/
	// 	const dataURL = gl.domElement.toDataURL("image/jpeg");

	// 	link.setAttribute("href", dataURL);
	// 	link.setAttribute("download", "canvas.jpeg");
	// 	link.click();
	// }
	
	
	// document.getElementById("save-obj").onclick = function() {
	// 	const exporter = new OBJExporter();
	// 	const data = exporter.parse(scene);
		
	// 	const blobURL = URL.createObjectURL(new Blob([data], { type: "text/plain" }));

	// 	link.setAttribute("href", blobURL);
	// 	link.setAttribute("download", "test.obj");
	// 	link.click();

	// 	URL.revokeObjectURL(blobURL);
	// }

	if (view.view === "2D") gl.domElement.classList.add("cursor-cross");
	else gl.domElement.classList.remove("cursor-cross");

	return (
		<>
			<color attach="background" args={[0xebebeb]} />
			
			{view.view === "3D" && (
				<primitive object={sky} />
			)}

			{/* {view === "2D" && (
				<OrthographicCamera
					makeDefault
					manual
					position={[0.0033158862420857344, 3315.741671368019, 0.000004318159471182016]}
					rotation={["-1.5707963254925756", "0.000001000043601318168", "1.5694940634737558", "XYZ"]}
					left={frustumSize * aspect / - 2}
					right={frustumSize * aspect / 2}
					top={frustumSize / 2}
					bottom={frustumSize / - 2}
					zoom={0.23180497402501982}
					near={4}
					far={7000}
				/>
			)} */}

            <ambientLight intensity={0.5} />

			<directionalLight
				args={[0xffffff, 0.3]}
				position={[1000, 500, 2000]}
				// shadow-mapSize={[2048, 2048]}
			>
				{/* <mesh
					scale={[2.5, 2.5, 2.5]}
					onClick={() => {
						ref.current.intensity = ref.current.intensity === 1 ? 0.3 : 1
					}}
				>
					<sphereGeometry args={[5]} />
					<meshStandardMaterial color={"yellow"} emissive={"red"} />
				</mesh> */}
			</directionalLight>

			{/* {view.view === "3D" && (
				<GizmoHelper alignment="bottom-right" margin={[50, 50]} >
					<GizmoViewport
						// color="#8b98a5"
						// textColor="#f5f5f5"
						// strokeColor="#000000"
					/>
				</GizmoHelper>
			)} */}

			<CameraControls view={view.view} />
		</>
	)
}
