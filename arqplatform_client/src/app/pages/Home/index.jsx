import { useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import NewProject from "../../components/NewProject/NewProject";
import GridData from "../../components/GridData/GridData";

export function Home({ proyecto, school }) {
	const projects = useSelector(state => state.project.projects);
	
	return (
		<Card sx={{ borderRadius: "5px"}}>
			<Grid container spacing={{ xs: 2, sm: 3 }} p="2rem" justifyContent="space-between">
				<Grid xs={12} sm>
					<h4 style={{ fontWeight: 500 }}>CREAR UN DISEÑO</h4>
					<span style={{ fontSize: 13 }}>Puedes crear desde cero o escoger una plantilla de proyecto</span>
				</Grid>
				<Grid xs={12} sm="auto">
					<NewProject school={school} />
				</Grid>
				<Grid xs={12} mb=".5rem" mt="1.5rem">
					<h4 style={{ fontWeight: 500 }}>MIS DISEÑOS</h4>
					<span style={{ fontSize: 13 }}>Revisa los últimos diseños realizados</span>
				</Grid>
				
				<GridData projects={projects} typeProject={proyecto} />
			</Grid>
		</Card>
	)
}


/**
 * HOME with type projects cards
 */

// import { Link as RouterLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Skeleton from "@mui/material/Skeleton";
// import ModalTest from "../../views/Modal";

// export const Home = () => {
// 	const plantillas = useSelector(state => state.project.typeProjects);

//     return (
// 		<Grid
// 			container
// 			sx={{
// 				height: {
// 					xs: "unset",
// 					md: "600px"
// 				},
// 				py: "1.5rem"
// 			}}
// 			justifyContent="space-evenly"
// 			alignItems="center"
// 			spacing={4}
// 		>
// 			{/* {(plantillas || ["a", "b", "c"]).map(plantilla => (
// 				<Grid
// 					key={plantilla.id || plantilla}
// 					item
// 					sx={{
// 						"& > :not(style)": {
// 							textDecoration: "none"
// 						}
// 					}}
// 				>
// 					<Link
// 						component={RouterLink}
// 						color="inherit"
// 						to={`/proyecto/${plantilla.slug}`}
// 						sx={{ mt: 2 }}
// 					>
// 						{plantillas
// 							? <Plantilla name={plantilla.name} />
// 							: <Skeleton variant="rectangular" width={350} height={200} sx={{ borderRadius: "20px" }} />
// 						}
// 					</Link>
// 				</Grid>
// 			))} */}

// 				<Grid
// 					item
// 					sx={{
// 						"& > :not(style)": {
// 							textDecoration: "none"
// 						}
// 					}}
// 				>
// 					<Link
// 						component={RouterLink}
// 						color="inherit"
// 						to={`/proyecto/educacion`}
// 						sx={{ mt: 2 }}
// 					>
// 						<Plantilla name="COLEGIOS" />
// 					</Link>
// 				</Grid>
// 		</Grid>
//     )
// }

// const Plantilla = ({ name }) => {
// 	return (
// 		<Paper
// 			sx={{
// 				cursor: "pointer",
// 				display: "flex",
// 				justifyContent: "center",
// 				alignItems: "center",
// 				fontSize: "2rem",
// 				width: 350,
// 				height: 200,
// 				borderRadius: "20px",
// 				boxShadow: "3px 2px 4px 4px rgb(64 60 67 / 16%)"
// 				// boxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
// 				// WebkitBoxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)"
// 			}}
// 		>
// 			<span>{name.toUpperCase()}</span>
// 		</Paper>
// 	)
// }
