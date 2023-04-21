import { useEffect } from "react"

export default function House() {
	var wallShape = new Shape();
	wallShape.moveTo(0, 0);
	wallShape.lineTo(10, 0);
	wallShape.lineTo(1, .75);
	wallShape.lineTo(0, 1);
	wallShape.lineTo(0, 0);

	var sideWallShape = new Shape();
	sideWallShape.moveTo(0, 0);
	sideWallShape.lineTo(1.4, 0);
	sideWallShape.lineTo(1.4, .75);
	sideWallShape.lineTo(0, .75);
	sideWallShape.lineTo(0, 0);

	/** @type {{ current: import("@react-three/fiber").MeshProps }} */
	var wallB = useRef(null);
	/** @type {{ current: import("@react-three/fiber").MeshProps }} */
	var wallC = useRef(null);
	/** @type {{ current: import("@react-three/fiber").MeshProps }} */
	var wallD = useRef(null);

	var sideWallA = useRef(null);
	var sideWallB = useRef(null);
	useEffect(() => {
		// wallB.current.translateZ(3);
		// wallB.current.rotateY(Math.PI);

		// wallC.current.translateZ(1.2);

		// wallD.current.translateZ(1.4);
		// wallD.current.rotateY(Math.PI);

		// // SIDE WALLS
		// sideWallA.current.rotateY(-Math.PI / 2);
		// sideWallA.current.translateZ(.8);

		// sideWallB.current.rotateY(-Math.PI / 2);
		// sideWallB.current.translateZ(.8);
		// sideWallB.current.translateZ(-1.8);
	}, [])

	return (
		<group>
			<object3D>
				<mesh>
					<extrudeGeometry attach="geometry" args={[wallShape, { steps: 1, depth: .2, bevelEnabled: false, curveSegments: 32 }]} />
					<meshStandardMaterial color={0xa9a9a9} />
				</mesh>
				<mesh
					ref={wallB}>
					<extrudeGeometry attach="geometry" args={[wallShape, { steps: 1, depth: .2, bevelEnabled: false, curveSegments: 32 }]} />
					<meshStandardMaterial color={0xa9a9a9} />
				</mesh>
				<mesh ref={wallC}>
					<extrudeGeometry attach="geometry" args={[wallShape, { steps: 1, depth: .2, bevelEnabled: false, curveSegments: 32 }]} />
					<meshStandardMaterial color={0xa9a9a9} />
				</mesh>
				<mesh ref={wallD}>
					<extrudeGeometry attach="geometry" args={[wallShape, { steps: 1, depth: .2, bevelEnabled: false, curveSegments: 32 }]} />
					<meshStandardMaterial color={0xa9a9a9} />
				</mesh>

				{/* SIDE WALLS */}
				<mesh ref={sideWallA}>
					<extrudeGeometry attach="geometry" args={[sideWallShape, { steps: 1, depth: .2, bevelEnabled: false, curveSegments: 32 }]} />
					<meshStandardMaterial color={0xa9a9a9} />
				</mesh>
				<mesh ref={sideWallB}>
					<extrudeGeometry attach="geometry" args={[sideWallShape, { steps: 1, depth: .2, bevelEnabled: false, curveSegments: 32 }]} />
					<meshStandardMaterial color={0xa9a9a9} />
				</mesh>
			</object3D>
		</group>
	)
}
