export default function Landing({ position, landing }) {
	return (
		<mesh
			position={position}
			rotation={[0, 0, 0]}
		>
			<boxGeometry args={[landing.length,7.5, landing.width]} />
			<meshStandardMaterial />
		</mesh>
	)
}
