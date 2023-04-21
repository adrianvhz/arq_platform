import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import TableProjects from "../../components/GridData/TableProjects";
import Paper from "@mui/material/Paper";
import Breadcrumb from "./Misc/Breadcrumb";
import SelectSlot from "./Misc/SelectSlot";
import { getProjectsCosts } from "../../../services/projectsService";
import Dashboard from "./views/Dashboard";
import CostsTables from "./views/CostsTables";

export function CostsPage() {
	const [costs, setCosts] = useState(null);
	const [slot, setSlot] = useState("dashboard");

	const params = useParams();
	const projectID = Number(params.id);

	const projects = useSelector(state => state.project.projects);
	const project = projects?.filter(el => el.id === projectID || el.parent_id === projectID);

	const handleCosts = (costs) => {
		setCosts(costs);
	}

	const handleSlot = (slot) => () => {
		setSlot(slot);
	}

	useEffect(() => {
		if (project) {
			getProjectsCosts(projectID).then(
				({ data }) => handleCosts({ costsCategories: data.costsCategories, calculatedCosts: data.calculatedCosts }),
				(err) => console.log(err)
			)
		}

		return handleSlot("dashboard");
	}, [projects, projectID]);

	return (
		<Grid container spacing={{ xs: 1.5, sm: 2 }}>
			<Grid
				xs={12}
				sx={{
					display: "inline-flex",
					justifyContent: "space-between",
					flexDirection: { xs: "column", sm: "row" },
					gap: "12px"
				}}
			>
				<Breadcrumb />
				<Typography variant="h6" fontWeight={600} textAlign="center">MODELO FINANCIERO INTEGRADO</Typography>
				<SelectSlot slot={slot} handleSlot={handleSlot} />
			</Grid>
			
			<Grid xs={12}>
				<TableProjects projects={project} initialExpand />
			</Grid>

			{/* <Views project={project} /> */}
			{slot === "dashboard"
				? <Dashboard project={project} costs={costs} />
				: <CostsTables project={project} costs={costs} handleCosts={handleCosts} />
			}
		</Grid>
	)
}
