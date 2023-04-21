export default function Pasillo({ position, rotation, length, width, color }) {
	return (
		<mesh
			position={position}
			rotation={rotation}
		>
			<planeGeometry args={[width, length.length]} />
			<meshStandardMaterial
				color={color}
			/>
		</mesh>
	)
}
