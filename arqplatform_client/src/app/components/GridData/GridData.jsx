import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import moment from "moment";
import TableProjects from "./TableProjects";

const GridData = ({ projects, typeProject }) => {
	const [projectsFiltrados, setProjectsFiltrados] = useState(null);
	const [fechaInicio, setFechaInicio] = useState("");
	const [fechaFin, setFechaFin] = useState("");

	const options = (value) => {
		switch (value) {
			case "0":
				setProjectsFiltrados(projectsFiltrados)
				break;
			case "10":
				setProjectsFiltrados(projectsFiltrados.slice(0, 10));
				break;
			case "50":
				setProjectsFiltrados(projectsFiltrados.slice(0, 50));
				break;
			case "100":
				setProjectsFiltrados(projectsFiltrados.slice(0, 100));
				break;
			default:
				console.log("error")
				break;
		}
	}

	const searchFilter = (value) => {
		const filter = [];

		projects.filter(project => project.parent_id === 0).forEach(project => {
			if (project.name.toLowerCase().includes(value.toLowerCase())) {
				filter.push(project);
				filter.push(...projects.filter(el => el.parent_id === project.id));
			}
		});

		setProjectsFiltrados(filter);
	}

	//filtro por rango de fechas
	const dateRangeFilter = () => {
		const filter = projects.filter(item => {
			let date = toMs(moment(item.createdAt).format("DD/MM/YYYY"));
			return date >= toMs(fechaInicio) && date <= toMs(fechaFin);
		})
		setProjectsFiltrados(filter);
	}

	useEffect(() => {
		if (fechaInicio && fechaFin) dateRangeFilter();
		else {
			if (projects?.length) setProjectsFiltrados(projects);
		}
	}, [fechaInicio, fechaFin, projects]);

	return (
		<Grid xs={12}>
			<Grid container spacing={2}>
				<Grid xs={12} sm={6} lg={4}>
					<label>Buscar</label>
					<input type="text" placeholder="Escribe aquí" style={{ width: "100%" }} onChange={(evt) => searchFilter(evt.target.value)} />
				</Grid>
				<Grid xs={12} sm={6} lg={3}>
					<label>Desde</label>
					<input type="date" style={{ width: "100%" }}
						onChange={({ target: { value } }) => setFechaInicio(value && moment(value).format("DD/MM/YYYY"))}
					/>

				</Grid>
				<Grid xs={12} sm={6} lg={3}>
					<label>Hasta</label>
					<input type="date" style={{ width: "100%" }}
						onChange={({ target: { value } }) => setFechaFin(value && moment(value).format("DD/MM/YYYY"))}
					/>
				</Grid>
				<Grid xs={12} sm={6} lg={2}>
					<label>Mostrar</label>
					<select style={{ width: "100%" }} onChange={(evt) => options(evt.target.value)}>
						<option value="0">Todos</option>
						<option value="10">10</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</Grid>
				
				<Grid xs={12}>
					<TableProjects
						projects={projectsFiltrados}
						typeProject={typeProject}
						projectsLoaded={projects !== null}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

function toMs(dateStr) {
	let parts = dateStr.split("/")
	return dateStr === "" ? 0 : new Date(parts[2], parts[1] - 1, parts[0]).getTime();
}

export default GridData;
