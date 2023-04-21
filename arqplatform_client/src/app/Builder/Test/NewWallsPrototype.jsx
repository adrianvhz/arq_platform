import { BackSide, DoubleSide, FrontSide, MathUtils } from "three";

export default function NewWallsPrototype() {
	let height = 2.5 * 50;

	return (
		<group
			position={[0, height / 2, 0]}
			rotation={[0, MathUtils.degToRad(90), 0]}
			onClick={(evt) => {console.log("soy una pared"); console.log(evt);}}
		>
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[8 * 50, height, 10]} />
				<meshPhongMaterial side={DoubleSide} color={0xf5f5f5} />
			</mesh>

			<mesh position={[0, 0, 6.25 * 50]}>
				<boxGeometry args={[8 * 50, height, 10]} />
				<meshPhongMaterial side={DoubleSide} color={0xf5f5f5} />

			</mesh>
			{/* LATERALES */}
			<mesh position={[8 * 50 / 2, 0, 6.25 * 50 / 2]} rotation={[0, MathUtils.degToRad(90), 0]}>
				<boxGeometry args={[6.25 * 50, height, 10]} />
				<meshPhongMaterial side={DoubleSide} color={0xf5f5f5} />
			</mesh>

			<mesh position={[-8 * 50 / 2, 0, 6.25 * 50 / 2]} rotation={[0, MathUtils.degToRad(90), 0]}>
				<boxGeometry args={[6.25 * 50, height, 10]} />
				<meshPhongMaterial side={DoubleSide} color={0xf5f5f5} />
			</mesh>
		</group>
	)
}
