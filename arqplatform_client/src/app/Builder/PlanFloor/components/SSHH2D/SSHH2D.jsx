import { BufferGeometry, Shape } from "three";
import { Text } from "@react-three/drei";
import { WALL_THICKNESS } from "../../../Plan3D/components/Pabellones/app.settings";
// import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function SSHH2D({ position, bathroom, classroom, baths, view, floor }) {
	// if (view.view2DModule === 1 && floor > 1) return null;
	// else if (view.view2DModule > 1 && floor === 1) return null; //

	const width = 220;

	// const points = [];
	// points.push( new Vector3( - 10, 0, 0 ) );
	// points.push( new Vector3( 0, 10, 0 ) );
	// points.push( new Vector3( 10, 0, 0 ) );

	// const geometry = new BufferGeometry().setFromPoints( points );



	const trackShape = new Shape();
	trackShape.moveTo(167.5, 0); // (415 / 2) - (80 / 2)
	trackShape.lineTo(0, 0);
	trackShape.lineTo(0, width);
	trackShape.lineTo(classroom.length, width);
	trackShape.lineTo(classroom.length, 0);
	trackShape.lineTo(247.5, 0); // (415 / 2) + (80 / 2)
	// cerrar
	trackShape.lineTo(247.5, 22.5);


	// trackShape.closePath();

	// curvas
	// trackShape.moveTo( 40, 40 );
	// trackShape.lineTo( 40, 160 );
	// trackShape.absarc( 60, 160, 20, Math.PI, 0, false );
	// trackShape.lineTo( 80, 40 );

	const geometry = new BufferGeometry().setFromPoints(trackShape.getPoints());
	// const geometry = new ShapeGeometry(trackShape);

	const points = createSquareShape(width - (WALL_THICKNESS * 6), classroom.length - (WALL_THICKNESS * 6));

	return (
		<group
			position={position}
		>
			<line
				position={[0, 0, width]}
				rotation={[-Math.PI / 2, 0, 0]}
				geometry={geometry}				
			>
				<lineBasicMaterial
					color={0x383838}
				/>
			</line>

			<line
				position={[WALL_THICKNESS * 3, 0, width - (WALL_THICKNESS * 3)]}
				rotation={[-Math.PI / 2, 0, 0]}
				geometry={new BufferGeometry().setFromPoints(points)}
			>
				<lineBasicMaterial
					color={0x383838}
				/>
			</line>

			<Text
				position={[200, 1, 118]}
				rotation={[Math.PI / -2, 0, 0]}
				color="black"
				// font={InterBold}
				anchorX="center"
				anchorY="middle"
				fontSize={55}
				children={"SSHH"}
			/>
		</group>
	)
}

const createSquareShape = (width, length) => {
	const squareShape = new Shape();
	// squareShape.moveTo(20, 20);
	squareShape.moveTo((length / 2) - 40, -22.5); // 80
	squareShape.lineTo((length / 2) - 40, 0);
	squareShape.lineTo(0, 0);
	squareShape.lineTo(0, width);
	squareShape.lineTo(length, width);
	squareShape.lineTo(length, 0);
	squareShape.lineTo((length / 2) + 40, 0);
	// squareShape.lineTo(0, 20);


	// squareShape.closePath();
	return squareShape.getPoints();
}
