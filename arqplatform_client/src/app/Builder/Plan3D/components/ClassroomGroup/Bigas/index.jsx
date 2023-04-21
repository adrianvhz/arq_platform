export default function Bigas({ bigas }) {
	return (
		bigas.data.map(el => (
			<Biga
				key={el.id}
				position={el.position}
				rotation={el.rotation}
				geometry={el.geometry}
				material={bigas.material}
			/>
		))
	)
}

function Biga({ position, rotation, geometry, material }) {
	return (
		<mesh
			position={position} rotation={rotation}
			geometry={geometry} material={material}
		/>
			// <boxGeometry args={[width, height, length]} />
			// <meshStandardMaterial color={"gray"} />
		// </mesh>
	)
}
