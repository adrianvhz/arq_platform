import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import GridData from "../../components/GridData/GridData";
import NewProject from "../../components/NewProject/NewProject";

export const ModulePage = ({ proyecto }) => {
	// const [mutate, setMutate] = useState("init");
	// const { slug } = useParams();

	// const handleMutate = () => {
	// 	setMutate(Math.random());
	// }
	
	// const slug_i = {
	// 	educacion: 1,
	// 	test: 2,
	// 	hospital: 3
	// }

	// const projects = useSelector(state => state.project.projects)?.filter(el => el.type_id === slug_i[slug]);
	// console.log("ModulePage Render, projects:", projects);

	// return (
	// 	<Card sx={{
	// 		width: "100%",
	// 		// height: "100%",
	// 	}}>
	// 		<Grid container p="2rem 2rem 2rem 2rem" spacing={{ xs: 2, sm: 3 }} justifyContent="space-between">
	// 			<Grid item xs={12} sm>
	// 				<h4>CREAR UN DISEÑO</h4>
	// 				<span style={{ fontSize: 14 }}>Puedes crear desde cero o escoger una plantilla de proyecto</span>
	// 			</Grid>
	// 			<Grid item xs={12} sm="auto">
	// 				<NewProject mutate={mutate} setMutate={handleMutate} />
	// 			</Grid>
	// 			<Grid item xs={12} mb=".5rem" mt="2rem">
	// 				<h4>MIS DISEÑOS</h4>
	// 				<span style={{ fontSize: "14px" }}>Revisa los últimos diseños realizados</span>
	// 			</Grid>
				
	// 			<GridData projects={projects} typeProject={proyecto} setMutate={handleMutate} />
	// 		</Grid>
	// 	</Card>
	// )
}
