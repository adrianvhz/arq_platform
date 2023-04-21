import { useState, useEffect, useRef } from "react";
import { Line, Chart } from "react-chartjs-2";

export default function VersionChart({ costs }) {
	const chartRef = useRef(null);
	const [chartData, setChartData] = useState({ datasets: [] });
	
	useEffect(() => {
		setChartData({
			labels: data.labels,
			datasets: data.datasets.map(dataset => {
				// console.log(dataset);
				// console.log(costs);
				return {
					...dataset,
					data: [
						costs.muros_y_columnas,
						costs.techos,
						costs.puertas_y_ventanas,
						costs.revestimientos,
						costs.banos,
						costs.instalaciones
					],
					backgroundColor: createGradient(chartRef.current.ctx, chartRef.current.chartArea),
				}
			})
		});
	}, []);

	return (
		<Chart ref={chartRef} type="line" data={chartData} options={options} />
		// <Line data={data} options={options} />
	)
}

function createGradient(ctx, area) {
	const gradient = ctx.createLinearGradient(0, 0, 0, area.bottom);
	
	gradient.addColorStop(0.1, "rgba(136, 198, 255, 1)");
	gradient.addColorStop(1, "rgb(255, 255, 255, .4)");

	return gradient;
}

const data = {
	labels: ["Muros", "Techos", "Puertas", "Revest.", "Baños", "Instal."],
	datasets: [
		{
			label: "Costos",
			// data: [0, 2, 6, 2, 17, 2],
			animation: {
				delay: 100
			},
			borderColor: "#1990ff",
			borderWidth: 1.8,
			pointStyle: "rectRounded",
			pointRadius: 4,
			pointHoverRadius: 12
		}
	]
}

const options = {
	plugins: {
		legend: {
			display: false
		}
	},
	fill: true,
	resizeDelay: 300,
	onResize: (chart, newSize) => {
		chart.canvas.parentNode.style.height = newSize.width / 2 + 24 + "px"
	},
	responsive: true,
	maintainAspectRatio: false
}
