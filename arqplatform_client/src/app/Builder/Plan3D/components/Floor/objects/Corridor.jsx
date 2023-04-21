import { useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useSelector } from "react-redux";
import { Shape } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Corridor({
	_classroom, _stairs, floor, corridor, baranda, barandaWhenPeine, barandaWhenPeine2, pabLength, havePeine, pab,    classrooms
}) {
	const _railing = useSelector(state => state.project.railing);

	return (
		<group
			position={[415, floor * 140, _classroom.width]}
		>
			{/* Corridor */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<extrudeGeometry args={[corridor, { depth: 7.5, bevelEnabled: false }]} />
				<meshStandardMaterial color={"gray"} />
			</mesh>

			{/* Baranda */}
				{/* si es el pabellon 2 y tiene peine (se parten las barandas) */}
			{pab === 2 && havePeine
				? (
					<group>
						<mesh
							// position={[-_classroom.width - _stairs.width, 0, 120 - 7.5]}
							position={[-_classroom.width - 120, 0, 120 - 7.5]}
						>
							<extrudeGeometry args={[barandaWhenPeine, { depth: 7.5, bevelEnabled: false }]} />
							<meshStandardMaterial/>
						</mesh>

						<mesh // x = 1796.2
							position={[(-pabLength / 2) - (_classroom.width / 2) - 120, 0, 120 - 7.5]}
						>
							<extrudeGeometry args={[barandaWhenPeine2, { depth: 7.5, bevelEnabled: false }]} />
							<meshStandardMaterial/>
						</mesh>
					</group>
				)
				:  _railing
					? (
						<group position={[-250, 52.2, 114]} rotation={[Math.PI / 2, 0, 0]}>
							<Suspense>
								{classrooms.map((el, index) => (
									<Barandas key={index} position={[-406 * index, 0, 0]} />
								))}
							</Suspense>
						</group>
					)
					: (
						<mesh
							position={[0, 0, 120 - 7.5]}
						>
							<extrudeGeometry args={[baranda, { depth: 7.5, bevelEnabled: false }]} />
							<meshStandardMaterial/>
						</mesh>
					)
			}
			

			{/* Cierre 1 */}
			<mesh rotation={[0, Math.PI / -2, 0]}>
				<extrudeGeometry args={[close, { depth: 7.5, bevelEnabled: false }]} />
				<meshStandardMaterial />
			</mesh>
			{/* Cierre 2 */}
			<mesh position={[-pabLength + 7.5, 0, 0]} rotation={[0, Math.PI / -2, 0]}>
				<extrudeGeometry args={[close, { depth: 7.5, bevelEnabled: false }]} />
				<meshStandardMaterial />
			</mesh>
		</group>
	)
}

function Barandas(props) {
	const group = useRef()
	const { nodes, materials } = useLoader(GLTFLoader, "/models/railing_4_rounded/scene.gltf");

	return ( // position={[-250, 52.5, 100]} rotation={[Math.PI / 2, 0, 0]}
		<group position={props.position} scale={[60, 15, 10]} ref={group} {...props} dispose={null}>
			<mesh receiveShadow castShadow geometry={nodes["Object_2"].geometry} material={materials["material_0"]} />
		</group>
	)
}



const close = new Shape();
close.moveTo();
close.lineTo(0, 60);
close.lineTo(120, 60);
close.lineTo(120, 0);
close.closePath();
