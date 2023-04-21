import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Chart } from "chart.js/auto";
import VersionChart from "../Charts/VersionChart";
import ComparisonChart from "../Charts/ComparisonChart";

export default function Dashboard({ project, costs }) {
	if (!project || !costs) return <></>; // initial load not null
	console.log(project)
	console.log(costs);
	if (project.length - 1 !== costs.calculatedCosts.length) return <></>;

	const versions = project.filter(el => el.parent_id !== 0);

	return (
		<>
			{project?.filter(el => el.parent_id !== 0).map((el, index) => (
				<Grid xs={12} md={6} xl={4} key={el.id}>{/* lg={4} */}
					<Card>
						<CardHeader
							title={
								<Typography
									variant="subtitle1"
									sx={{
										boxShadow: "0 2px 5px 1px rgb(64 60 67 / 18%)",
										fontWeight: 400,
										fontSize: "1.05rem",
										backgroundColor: "#c1c1c1",
										width: "100%",
										p: "3px 7px",
										borderRadius: "4px",
										color: "#ffffff",
										textAlign: "center"
									}}
								>
									{el.name}
								</Typography>
							}
						/>
						<CardContent sx={{ p: 1, pt: 0, position: "relative", ":hover": { cursor: "crosshair"}, "&:last-child": { pb: 1 } }}>
							<VersionChart costs={costs.calculatedCosts[index]} />
						</CardContent>
					</Card>
				</Grid>
			))}

			{/* comparacion de costos */}
			<Grid xs={12} sm>
				<Grid container>{/* El spacing={} se hereda del Grid de mas alto nivel */}
					<Grid xs={12}>
						<Paper
							variant="outlined"
							sx={{ padding: "6px 0", textAlign: "center", boxShadow: "0 2px 5px 1px rgb(64 60 67 / 16%)" }}
						>
							<Typography fontWeight={500}>COMPARACION DE COSTOS</Typography>
						</Paper>
					</Grid>
					<Grid xs={12}>
						<Card>
							<CardContent sx={{ px: 1.5, pt: 2, position: "relative", ":last-child": { paddingBottom: "8px" } }}>
								<ComparisonChart
									versions={versions}
									costs={costs.calculatedCosts}
								/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}
