import { Suspense, useRef } from "react"
import { useSelector } from "react-redux";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Walls from "./components/Walls";
import Columns from "./components/Columns";
import Roof from "./components/Roof";
import Bigas from "./Bigas";

const selectWindow = state => state.project.window;
const selectDoor = state => state.project.door;

export default function ClassroomGroup({
	position, rotation, level, classroom, index, view
}) {
	const _window = useSelector(selectWindow);
	const _door = useSelector(selectDoor);

	return (
		<group
			position={position}
			rotation={rotation}
			userData={"classroom"}
		>
			<Walls
				walls={classroom.walls}
				level={level}
				index={index}
			/>

			<Columns
				columns={classroom.columns}
			/>

			{/* classroom lights */}
			{/* {classrooms_lights && (
				<pointLight
					args={[0xffffff, 1, 245]}
					position={[207, 118, 155]}
					// castShadow
					// shadow-mapSize={[2048, 2048]}
				>
					<mesh>
						<sphereGeometry args={[2]} />
						<meshStandardMaterial color={0xdba908} emissive={0x917005} />
					</mesh>

				</pointLight>
			)} */}

			<Bigas bigas={classroom.bigas} />

			{_window && (
				<>
					{/* FRONT */}
					<WindowSliding x={106.3} z={329.5} />
					<WindowSliding x={306.1} z={329.5} />

					{/* BACK */}
					{/* <Window x={106.3} z={10} />
					<Window x={306.1} z={10} /> */}
				</>
			)}

			{_door && (
				<Door />
			)}

			<Roof
				position={classroom.roof.position}
				rotation={classroom.roof.rotation}
				geometry={classroom.roof.geometry}
				material={classroom.roof.material}
			/>
		</group>
	)
}

function WoodWindow() {
	const { nodes, materials } = useLoader(GLTFLoader, "/models/window.glb");

	console.log(nodes);
	console.log(materials);

	return (
		<group position={[107.5, 88.5, 0]} rotation={[0, 0, 0]} scale={[23.7, 22.2, 22]}>
			<mesh geometry={nodes["defaultMaterial"].geometry} material={materials["Ridge"]} />
			<mesh geometry={nodes["defaultMaterial_1"].geometry} material={materials["glass"]} />
			<mesh geometry={nodes["defaultMaterial_2"].geometry} material={materials["Frame_Up"]} />
			<mesh geometry={nodes["defaultMaterial_3"].geometry} material={materials["lambert1"]} />
		</group>
	)
}

function WindowWithDecoration() {
	const { nodes, materials } = useLoader(GLTFLoader, "/models/rotar/scene.gltf");

	console.log(nodes);
	console.log(materials);

	return (
		<group position={[106.75, 85.8, 0]} rotation={[Math.PI / -2, Math.PI / -2, 0]} scale={[14.9, 10, 9.6]}>
			<mesh geometry={nodes["Object_2"].geometry} material={materials["glass"]} />
			<mesh geometry={nodes["Object_3"].geometry} material={materials["darkwood"]} />
			<mesh geometry={nodes["Object_4"].geometry} material={materials["frostedglass"]} />
		</group>
	)
}

function WindowShop() {
	const { nodes, materials } = useLoader(GLTFLoader, "/models/shop_window/scene.gltf");

	return (
		<group position={[109, 70, 0]} rotation={[Math.PI / -2, 0, 0]} scale={[0.13, 0.15, 0.185]}>
			<mesh geometry={nodes["Object_2"].geometry} material={materials["Frame_in"]} />
			<mesh geometry={nodes["Object_3"].geometry} material={materials["Frame_out"]} />
			<mesh geometry={nodes["Object_4"].geometry} material={materials["Glass"]} />
		</group>
	)
}

function WindowSliding({ x, z }) {
	const { nodes, materials } = useLoader(GLTFLoader, "/models/sliding_window/scene.gltf");
	const group = useRef();

	return (
		<group
			ref={group}
			position={[x, 69.1, z]}
			rotation={[Math.PI / -2, 0, 0]}
			scale={[0.48, 0.48, 0.48]}
		>
			<mesh geometry={nodes["Object_4"].geometry} material={materials["Material_35"]} />
			<mesh geometry={nodes["Object_8"].geometry} material={materials["2_-_Default"]} />
			<mesh geometry={nodes["Object_9"].geometry} material={materials["3_-_Default"]} />
			<mesh geometry={nodes["Object_11"].geometry} material={materials["5_-_Default"]} />
			<mesh geometry={nodes["Object_12"].geometry} material={materials["standard_alumini"]} />
			<mesh geometry={nodes["Object_13"].geometry} material={materials["Material_46"]} />
			<mesh geometry={nodes["Object_16"].geometry} material={materials["5_-_Default"]} />
			<mesh geometry={nodes["Object_17"].geometry} material={materials["Material_57"]} />
			<mesh geometry={nodes["Object_18"].geometry} material={materials["standard_alumini"]} />
		</group>
	)
}


function Door() {
	const { nodes, materials } = useLoader(GLTFLoader, "/models/wood_door/scene.gltf");
	const group = useRef();

	return (
		<group
			ref={group}
			position={[18.5, 0, 326.7]}
			rotation={[0, Math.PI, 0]}
			scale={[58, 52, 52]}
			dispose={null}
		>
			<mesh geometry={nodes["Object_8"].geometry} material={materials["DOR0001_Wood"]} />
			<mesh geometry={nodes["Object_9"].geometry} material={materials["DOR0001_Metal_Handle_Plate"]} />
			<mesh geometry={nodes["Object_10"].geometry} material={materials["DOR0001_Metal_Screw"]} />
			<mesh geometry={nodes["Object_12"].geometry} material={materials["DOR0001_Plastic_Fram"]} />
			<mesh geometry={nodes["Object_13"].geometry} material={materials["DOR0001_Rubber_Kit"]} />

			<mesh geometry={nodes["Object_15"].geometry} material={materials["DOR0001_Metal_Face_Plate"]} />
		</group>
	)
}

function WindowDouble(props) {
	const group = useRef()
	const { nodes, materials } = useLoader(GLTFLoader, "/models/double_window/scene.gltf");

	return (
		<group position={[342, 86, 228]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={[22, 22, 22]} ref={group} {...props} dispose={null}>
			{/* <mesh receiveShadow castShadow geometry={nodes["kitchen042_Material044_0"].geometry} material={materials['Material.044']} /> */}
			<mesh receiveShadow castShadow geometry={nodes["kitchen043_Material045_0"].geometry} material={materials['Material.045']} />
			<mesh receiveShadow castShadow geometry={nodes["kitchen044_Material064_0"].geometry} material={materials['Material.064']} />
			<mesh receiveShadow castShadow geometry={nodes["kitchen052_Material064_0"].geometry} material={materials['Material.064']} />
		</group>
	)
}
