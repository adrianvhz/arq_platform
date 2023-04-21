import Step from "./Step";

export default function Flight({ position, rotation, amount, stairs }) {
	let { riser, tread } = stairs.flight;

	let steps = new Array(amount).fill(undefined);

	return (
		<group
			position={position}
			rotation={rotation}
		>
			{steps.map((step, index) => (
				<Step
					key={index}
					position={[0, riser * index, -tread * index]}
					stairs={stairs}
				/>
			))}
		</group>
	)
}
