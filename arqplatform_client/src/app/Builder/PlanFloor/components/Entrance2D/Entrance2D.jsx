import { BufferGeometry, Shape, Vector3 } from "three";
import { Text } from "@react-three/drei";
// import { WALL_THICKNESS } from "../../../Plan3D/components/Pabellones/app.settings";
// import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function Entrance2D({ position, rotation, classroom, view }) {
	const shape = new Shape();
	shape.moveTo(0, -120);
	shape.lineTo(0, 120);
	
	shape.lineTo(320, -120);
	shape.lineTo(320, 120);

	// shape.closePath();
	// shape.lineTo(length, width);
	// shape.lineTo(length, 0);
	// shape.lineTo(0, 0);


	const points = [];
	points.push( new Vector3( -2, 0, 0 ) );
	points.push( new Vector3( 0, 2, 0 ) );
	points.push( new Vector3( 0, 0, 0 ) );
	points.push( new Vector3( 2, 0, 0 ) );
	const geometry = new BufferGeometry().setFromPoints(shape.getPoints());
	
	return (
		<group
			position={position}
			rotation={[Math.PI / -2, 0, rotation[1]]}
		>
			<lineSegments
				position={[47.5, 0, 0]}
				geometry={geometry}
			>
				<lineBasicMaterial
					color={0x000000}
				/>
			</lineSegments>
			
			<Text
				position={[207.5, -175, 3]}
				rotation={[0, 0, Math.PI / 2]}
				color="black"
				// font={InterBold}
				anchorX="center"
				anchorY="middle"
				fontSize={65}
				children={"Acceso Principal"}
			/>
		</group>
	)
}
