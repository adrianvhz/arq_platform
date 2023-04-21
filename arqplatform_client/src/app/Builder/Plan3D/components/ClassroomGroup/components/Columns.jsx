import Column from "./Column";

export default function Columns({ columns }) {
	return (
		columns.positions.map((position, index) => (
			<Column
				key={index}
				position={position}
				rotation={columns.rotation}
				geometry={columns.geometry}
				material={columns.material}
			/>
		))
	)
}
