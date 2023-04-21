import { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import Pabellones from "./components/Pabellones/Pabellones";
import InitConfig from "./components/InitConfig/InitConfig";
import Pasillo from "./components/Pasillo/Pasillo";
import Terrain from "./components/Terrain/Terrain";
import SoccerField2D from "../PlanFloor/components/SoccerField2D/SoccerField2D";
import SoccerField from "./components/SoccerField/SoccerField";
import { setView3DFloor } from "../../../redux/building/buildingSlice";
// import { OrbitControls } from "@react-three/drei";
// import wallPath from "../../../assets/textures/wall.png"
// import SoccerFieldView from "../components/SoccerFieldView/SoccerFieldView";
// import TerrainView from "../components/TerrainView/TerrainView";
// import Stairs from "./components/Stairs/Stairs";
// import SSHH from "./components/SSHH/SSHH";
// import ClassroomGroup from "./components/ClassroomGroup/ClassroomGroup";
// import Test from "../Test/Test";
// import CameraControls from "./components/InitConfig/CameraControls";
// import { Classroom } from "./components/Pabellones/components/Classroom/classrooms-class";

export default function Plan3D({
	state,
	view,
	school,
	aspect
}) {
	const dispatch = useDispatch();

	console.log(school)
	console.log("number of classrooms", school.numberOfClassrooms.getTotal()); // amount_classrooms

	

	// let amount_pabellones = Math.ceil(((amount_classrooms + amount_bathrooms) * classroom_length) / (terrain_width * classroom_add_scale));

	// initial classroomsBySide
	// let classroomsBySide = Math.ceil(amount_classrooms / (amount_pabellones * 2));

	// console.log("result_data", result_data); console.log("classroom_measurements", classroom_measurements); console.log("construction_info", construction_info);
	// console.log("classrooms", amount_classrooms); console.log("classroom_length", classroom_length); console.log("classroom_width", classroom_width); console.log("amount_pabellones", amount_pabellones);

	// console.log("CLASSROOM_LENGTH:", classroom_length); console.log("TERRENO:", terrain_length);



	// let orthographic = new OrthographicCamera();
	// orthographic.position.set(700.0833006726812, 3240.991418099096, 0.9116933195872228);
	// orthographic.rotation.set("-1.5705150260514118", "0.21274036703194613", "1.5694640280967271", "XYZ");
	// orthographic.top = 428.5;
	// orthographic.left = -507;
	// orthographic.right = 507;
	// orthographic.bottom = -428.5;
	// orthographic.far = 7000;

	// let perspective = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 4, 7000);
	// perspective.fov = 65;
	// perspective.aspect = window.innerWidth / window.innerHeight;
	// perspective.position.set(3202.3188734998785, 858.758291437268, -42.78855655034773);
	// perspective.rotation.set("-1.6205812315008037", "1.3084828063007592", "1.6223414925263104", "XYZ");
	// perspective.far = 7000;
	// perspective.near = 4


	// Reset floors show state
	useEffect(() => {
		return () => dispatch(setView3DFloor({ floor: 3 }));
	}, []);

	return view.view === "3D"
		? <SceneX school={school} view={view} />
		: <FloorPlanX school={school} view={view} />
}

// escena principal
function SceneX({ view, school }) {
	const { terrain, soccerField, corridor } = school;

	return (
		<Canvas
			camera={{
				fov: 60, // 65
				aspect: window.innerWidth / window.innerHeight,
				// position: [3202.3188734998785, 858.758291437268, -42.78855655034773],
				position: [terrain.length, (terrain.length / 2) - 500, 0],
				rotation: ["-1.6205812315008037", "1.3084828063007592", "1.6223414925263104", "XYZ"],
				far: 7000, // 3200
				near: 5,
			}}
			gl={{
				toneMappingExposure: 0.6
			}}
			frameloop="demand"
		>
			<InitConfig view={view} sky={school.sky} />

			{/* Lines Helper */}
			{/* <mesh>
				<boxGeometry args={[.5, 5, terrain.length]} />
				<meshStandardMaterial color="red" />
			</mesh>
			<mesh position={[(-terrain.length / 2) + 316.2494995995994, 0, 0]}>
				<boxGeometry args={[.5, 5, terrain.length]} />
				<meshStandardMaterial color="red" />
			</mesh>
			<mesh position={[(terrain.length / 2) - 316.2494995995994, 0, 0]}>
				<boxGeometry args={[.5, 5, terrain.length]} />
				<meshStandardMaterial color="red" />
			</mesh> */}

			<Pabellones
				school={school}
				view={view}
			/>

			<SoccerField
				position={soccerField.position} // [-terrain.width / 7.5, 0, 0]
				rotation={soccerField.rotation} // [-Math.PI / 2, 0, Math.PI / 2]
				length={soccerField.length}
				width={soccerField.width}
				color={soccerField.color}
			/>

			{/* <Pasillo
				position={corridor.position}
				rotation={corridor.rotation}
				length={corridor}
				width={corridor.width}
				color={corridor.color}
			/> */}

			<Terrain
				position={terrain.position}
				rotation={terrain.rotation}
				width={terrain.length}
				length={terrain.length}
				color={terrain.color}
			/>
		</Canvas>
	)
}

function FloorPlanX({
	view,
	aspect: as,
	school
}) {
	const { terrain, soccerField, corridor } = school;

	return (
		<Canvas
			orthographic
			camera={{
				position: [1, 500, 0],
				zoom: 0.192,
				near: 2,
				far: 5000
				// position: [0.0033158862420857344, 3315.741671368019, 0.000004318159471182016],
				// zoom: 0.23180497402501982,
			}}
			frameloop="demand"
		>
			<InitConfig view={view} />

			<Pabellones
				school={school}
				view={view}
			/>

			<SoccerField2D
				position={soccerField.position} // [-terrain.width / 7.5, 0, 0]
				rotation={soccerField.rotation} // [-Math.PI / 2, 0, Math.PI / 2]
				length={soccerField.length}
				width={soccerField.width}
				color={soccerField.color}
			/>

			{/* <Terrain2D
				width={terrain.width}
				length={terrain.length}
			/> */}
			
			{/* <gridHelper args={[terrain.length + 500, 40, new Color(0x3b414d), new Color(0xcbccd0)]} /> */}
		</Canvas>
	)
}










// function Scene({
// 	amount_classrooms, bathrooms, data, increment_scale, wall_thickness, view,
// 	// classroom, bathroom, pasillo, terrain, soccer_field, stairs,
// 	school
// }) {
// 	const { terrain, soccerField, corridor } = school;

// 	return (
// 		<Canvas
// 			camera={{
// 				fov: 60, // 65
// 				aspect: window.innerWidth / window.innerHeight,
// 				position: [3202.3188734998785, 858.758291437268, -42.78855655034773],
// 				rotation: ["-1.6205812315008037", "1.3084828063007592", "1.6223414925263104", "XYZ"],
// 				far: 8000, // 3200
// 				near: 5
// 			}}
// 		>
// 			<color attach="background" args={["#e6e6e6"]} />

// 			<ambientLight intensity={0.2} />

// 			<directionalLight
// 				args={[0xffffff, 0.5]}
// 				position={[10, 19, 50]}
// 				// position={[10, 19, 0]}
// 				// castShadow
// 				shadow-mapSize={[2048, 2048]}
// 			/>
// 			<OrbitControls
// 				rotateSpeed={0.5}
// 				zoomSpeed={1}
// 				panSpeed={0.5}
// 				enableRotate
// 				minZoom={0.17066106572499624}
// 			/>

// 			{/* <InitConfig /> */}
			
// 			<Pabellones
// 				// amount_classrooms={amount_classrooms}
// 				// classroom={classroom}
// 				// bathroom={bathroom}
// 				// bathrooms={bathrooms}
// 				// data={data}
// 				// stairs={stairs}
// 				// terrain={terrain}
// 				// pasillo={pasillo}
// 				// increment_scale={increment_scale}
// 				// wall_thickness={wall_thickness}
// 				// view={view}


// 				amount_classrooms={amount_classrooms}
// 				bathrooms={bathrooms}
// 				data={data}
// 				increment_scale={increment_scale}
// 				wall_thickness={wall_thickness}
// 				view={view}

// 				school={school}
// 			/>

// 			<SoccerField
// 				position={soccerField.position} // [-terrain.width / 7.5, 0, 0]
// 				rotation={soccerField.rotation} // [-Math.PI / 2, 0, Math.PI / 2]
// 				length={soccerField.length}
// 				width={soccerField.width}
// 				color={soccerField.color}
// 			/>

// 			<Pasillo
// 				position={corridor.position} // [0, 0, (terrain.width / 2) - classroom.width - (pasillo.width / 2)]
// 				rotation={corridor.rotation}
// 				length={corridor}
// 				width={corridor.width}
// 				color={corridor.color}
// 			/>

// 			<Terrain
// 				position={terrain.position}
// 				rotation={terrain.rotation}
// 				width={terrain.length}
// 				length={terrain.length}
// 				color={terrain.color}
// 			/>
// 			{/* <gridHelper position={[0, -1, 0]} args={[terrain.width + 3348, 20, "black", "gray"]} /> */}
// 		</Canvas>
// 	)
// }

// function FloorPlan({
// 	amount_classrooms,
// 	bathrooms,
// 	data,
// 	increment_scale,
// 	wall_thickness,
// 	view, aspect: aspe,

// 	// bathroom,
// 	// classroom,
// 	// stairs,
// 	// pasillo,
// 	// terrain,
// 	// soccer_field,

// 	school
// }) {
// 	console.log(school)
// 	const { terrain, classroom, bathroom, stairs, soccerField, corridor } = school;

// 	// let frustumSize = 857;
// 	let frustumSize = 857;
// 	let aspect = 500 / 700;

// 	return (
// 		<Canvas
// 			orthographic
// 			camera={{
// 				position: [0.0033158862420857344, 3315.741671368019, 0.000004318159471182016],
// 				rotation: ["-1.5707963254925756", "0.000001000043601318168", "1.5694940634737558", "XYZ"],
// 				// manual: true,
// 				left: frustumSize * aspect / - 2,
// 				right: frustumSize * aspect / 2,
// 				top: frustumSize / 2,
// 				bottom: frustumSize / - 2,
// 				zoom: 0.15180497402501982,
// 				near: 4,
// 				far: 7000
// 			}}
// 		>
// 			{/* <InitConfig /> */}

// 			<color attach="background" args={["#e6e6e6"]} />
// 			<ambientLight intensity={0.2} />
// 			<directionalLight
// 				args={[0xffffff, 0.5]}
// 				position={[10, 19, 50]}
// 				shadow-mapSize={[2048, 2048]}
// 			/>
// 			<OrbitControls
// 				rotateSpeed={0.5}
// 				zoomSpeed={1}
// 				panSpeed={0.5}
// 				enableRotate={false}
// 				// minZoom={0.17066106572499624}
// 			/>
			
// 			<Pabellones
// 				// amount_classrooms={amount_classrooms}
// 				// classroom={classroom}
// 				// bathroom={bathroom}
// 				// bathrooms={bathrooms}
// 				// data={data}
// 				// stairs={stairs}
// 				// terrain={terrain}
// 				// pasillo={corridor}
// 				// increment_scale={increment_scale}
// 				// wall_thickness={wall_thickness}
// 				// view={view}

// 				amount_classrooms={amount_classrooms}
// 				bathrooms={bathrooms}
// 				data={data}
// 				increment_scale={increment_scale}
// 				wall_thickness={wall_thickness}
// 				view={view}

// 				school={school}
// 			/>

// 			<SoccerField2D
// 				terrain={terrain}
// 				amount_classrooms={amount_classrooms}
// 				classroom={classroom}
// 				soccer_field={soccerField}
// 				increment_scale={increment_scale}
// 				color={0x9f9f9f}
// 				view={view}
// 			/>

// 			{/* <Pasillo
// 				args={[pasillo.width, terrain.width - 200]}
// 				position={[0, 0, (terrain.width / 2) - classroom.width - (pasillo.width / 2)]}
// 				// position={[-terrain.width / 2, 0, (terrain.width / 2) - classroom.width]}
// 				rotation={[Math.PI / 2, 0, Math.PI / 2]}
// 				color={0xa8a8a8}
// 			/> */}

// 			<Terrain2D
// 				width={terrain.width}
// 				length={terrain.length}
// 			/>
			
// 		</Canvas>
// 	)
// }















{/* CANVAS ANT$S */

/* <Canvas
	camera={{
		fov: 60, // 65
		aspect: window.innerWidth / window.innerHeight,
		position: [3202.3188734998785, 858.758291437268, -42.78855655034773],
		rotation: ["-1.6205812315008037", "1.3084828063007592", "1.6223414925263104", "XYZ"],
		far: 8000, // 3200
		near: 5
	}}
>
	<InitConfig />
	
	<Pabellones
		amount_classrooms={amount_classrooms}
		classroom={classroom}
		bathroom={bathroom}
		bathrooms={bathrooms}
		data={data}
		stairs={stairs}
		terrain={terrain}
		pasillo={pasillo}
		increment_scale={increment_scale}
		wall_thickness={wall_thickness}
	/>

	{/* <Stairs index={0} position={[0, 3, 0]} stairs={stairs} /> */}

	{/* <Test /> */}

	{/* <SSHH
		position={[0, 0, 50]}
		baths={4}
		increment_scale={50}
		wall_thickness={wall_thickness}
		bathroom={bathroom}
		floor={1}
	/> */}
	
	{/* <ClassroomGroup
		classroom={classroom}
		increment_scale={50}
		// rotation={[0, MathUtils.degToRad(180), 0]}
		wall_thickness={wall_thickness}
	/> */}

	// <SoccerFieldView
	// 	terrain={terrain}
	// 	amount_classrooms={amount_classrooms}
	// 	classroom={classroom}
	// 	soccer_field={soccer_field}
	// 	increment_scale={increment_scale}
	// 	color={0x9f9f9f}
	// />

	// <Pasillo
	// 	args={[pasillo.width, terrain.width - 200]}
	// 	position={[0, 0, (terrain.width / 2) - classroom.width - (pasillo.width / 2)]}
	// 	// position={[-terrain.width / 2, 0, (terrain.width / 2) - classroom.width]}
	// 	rotation={[Math.PI / 2, 0, Math.PI / 2]}
	// 	color={0xa8a8a8}
	// />

	// <TerrainView
	// 	width={terrain.width}
	// 	length={terrain.length}
	// />
	// {/* <gridHelper position={[0, -1, 0]} args={[terrain.width + 3348, 20, "black", "gray"]} /> */}
// </Canvas>