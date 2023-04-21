import { Bar } from "react-chartjs-2";

export default function ComparisonChart({ versions, costs }) {
	const datas = costs.map(el => [
		el.muros_y_columnas,
		el.techos,
		el.puertas_y_ventanas,
		el.revestimientos,
		el.banos,
		el.instalaciones
	]);
	const colors = [
		"rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)",
		"rgba(127, 188, 127, 1)", "rgba(255, 205, 86, 1)",
		"rgba(255, 159, 64, 1)"
	];
	const backgroudColor = [
		"rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)",
		"rgba(127, 188, 127, 0.5)", "rgba(255, 205, 86, 0.5)",
		"rgba(255, 159, 64, 0.5)"
	];

	const data = {
		labels: ["Muros", "Techos", "Puertas", "Revest.", "Baños", "Instal."],
		datasets: versions.map((el, i) => ({
			// label: `V${i+1}`,
			label: el.name,
			data: datas[i],
			borderColor: colors[i],
			backgroundColor: backgroudColor[i]
		}))
	}

	return (
		<Bar options={options} data={data}  />
	)
}

const options = {
	responsive: true,
	maintainAspectRatio: false,
	onResize: (chart, newSize) => {
		chart.canvas.parentNode.style.height = newSize.width / 2 + 80 + "px" // +16 si no tiene legend // +56 (anterior)
	},
	plugins: {
		legend: {
			position: "bottom",
		}
	}
}
