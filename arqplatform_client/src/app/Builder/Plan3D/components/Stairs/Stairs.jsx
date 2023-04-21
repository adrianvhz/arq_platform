import { Color, MathUtils, Shape } from "three";
import Roof from "../ClassroomGroup/components/Roof";
import Flight from "./components/Flight";
import Landing from "./components/Landing";

export default function Stairs({ position, stairs, view }) {
	let landing = {
		x: 0,
		y: 0.25,
		z: stairs.flight.tread * stairs.flight1_amount + 42.5
	}

	let flight = {
		x: 0,
		y: 0,
		z: stairs.flight.tread * stairs.flight1_amount
	}

	return (
		<object3D
			position={position}
		>
			<group
				position={[(stairs.width / 2), 0, stairs.landing.width]}
			>
				{/* compensar pasillo */}
				<Roof
					position={stairs.completeRoof.position}
					rotation={stairs.completeRoof.rotation}
					geometry={stairs.completeRoof.geometry}
					material={stairs.completeRoof.material}
				/>

				{/* <Landing
					position={[landing.x, landing.y, landing.z]} // z = 155.25
					landing={stairs.landing}
				/> */}

				<Flight
					position={[0, 0, flight.z]}
					stairs={stairs}
					amount={stairs.flight1_amount}
				/>
				
				<Landing
					position={[landing.x, landing.y + (stairs.flight.riser * stairs.flight1_amount), -5 - stairs.flight.tread]}
					landing={stairs.landing}	// z   =   landing.z - (stairs.flight.tread * stairs.flight1_amount) - stairs.landing.width
				/>

				<Flight
					position={[0, stairs.flight.riser * stairs.flight1_amount, stairs.flight.tread * 2]}
					rotation={[0, MathUtils.degToRad(180), 0]}
					stairs={stairs}
					amount={stairs.flight2_amount}
				/>
				
				<Landing
					position={[landing.x, landing.y + (stairs.flight.riser * (stairs.flight1_amount + stairs.flight2_amount)), landing.z]} // z = 155.25
					landing={stairs.landing}
				/>

				{/* MURO TRASERO */}
				<mesh position={[0, 70, -56.5]}>
					<boxGeometry args={[stairs.landing.length, 140, 7]} />
					<meshStandardMaterial />
				</mesh>
			</group>
		</object3D>
	)
}

function Barandas() {
	return ( // -60 => 120 / 2 (stairs.width / 2)
		<mesh position={[-60, 140, 387.5]}>
			<extrudeGeometry args={[shape1, { depth: 10, bevelEnabled: false }]} />
			<meshStandardMaterial color={new Color(0xe5e5e5)} />
		</mesh>
	)
}

// Para barandas        // 1.50m de alto
var length = 120; // 2.4 * 50 (stairs landing length)
const shape1 = new Shape();
shape1.moveTo(0, 0);
shape1.lineTo(0, 75);
shape1.lineTo(length, 75);
shape1.lineTo(length, 0);
shape1.lineTo(0, 0);

