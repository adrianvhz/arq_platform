export default function Lavamanos({ position, bathroom }) {
	let { lavamanos } = bathroom;

	return (
		<mesh
			position={position}
		>
			<boxGeometry args={[lavamanos, 5, lavamanos]} />
			<meshStandardMaterial/>
		</mesh>

		//  lavamanos 2
		// <mesh
		// 	position={[-158, 20, -18]}
		// >
		// 	<boxGeometry args={[30, 30, 0.60 * increment_scale]} />
		// 	<meshStandardMaterial side={DoubleSide} />
		// </mesh>
	)
}
