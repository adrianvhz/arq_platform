import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import TableCosts from "../TableCosts";

export default function CostsTables({ project, costs, handleCosts }) {
	if (!project) return <></>;
	if (project.length - 1 !== costs.calculatedCosts.length) return <></>;
 	
	// por el orden de obtencion de las versiones!
	return (
		<>
			{project?.
				filter(el => el.parent_id !== 0).
				map((el, i) => (
					<VersionTable
						key={el.id}
						el={el}
						costsCategories={costs.costsCategories[i]}
						calculatedCosts={costs.calculatedCosts[i]}
						i={i}
						handleCosts={handleCosts}
					/>
				))
			}
		</>
	)
}


function VersionTable({ el, costsCategories, calculatedCosts, handleCosts }) {
	const [loading, setLoading] = useState(false);
	
	const area_total = JSON.parse(el.build_data).result_data.area_total;

	const total_structure = (calculatedCosts.muros_y_columnas + calculatedCosts.techos) * area_total;
	const total_finishes = (calculatedCosts.puertas_y_ventanas + calculatedCosts.revestimientos + calculatedCosts.banos) * area_total;
	const total_installations = calculatedCosts.instalaciones * area_total;
	
	const rows = [
		createData("Costo total de la estructura del edificio", `S/${formatNumber(total_structure)}`),
		createData("Costo total de los acabados", `S/${formatNumber(total_finishes)}`),
		createData("Costo total de las instalaciones eléctricas y sanitarias", `S/${formatNumber(total_installations)}`),
		// createData("COSTO TOTAL DE CONSTRUCCION", `S/${formatNumber(total_structure + total_finishes + total_installations)}`)
	];
	
	const handleToggleLoading = () => setLoading(prev => !prev);

	return (
		<Grid
			xs={12}
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "7px"
			}}
		>
			<TableCosts
				project={el}
				categories={costsCategories}
				calculatedCosts={calculatedCosts}
				handleCosts={handleCosts}
				handleToggleLoading={handleToggleLoading}
			/>

			<div style={{ paddingBottom: "9px" }}>
				<StyledPaper>{el.name}</StyledPaper>
			</div>

			<TableContainer component={Paper}>
				<Table
					sx={{
						minWidth: 300,
					}}
					size="small"
				>
					<TableHead>
						<TableRow sx={{ ".MuiTableCell-root": { fontSize: "1rem" } }}>
							<TableCell scope="col" sx={{ padding: { xs: "6px 10px", sm: "6px 16px" } }}>TIPO</TableCell>
							<TableCell></TableCell>
							<TableCell align="right" sx={{ minWidth: 111, padding: { xs: "6px 10px", sm: "6px 16px" } }}>COSTO TOTAL</TableCell>
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							".MuiTableRow-root .MuiTableCell-root": { fontSize: "0.94rem" },
							".MuiTableRow-root:last-child td, .MuiTableRow-root:last-child th": { border: 0 },
							"& th, td": {
								padding: {
									xs: "6px 10px",
									sm: "6px 16px"
								}
							}
						}}
					>
						{/* <TableRow>
							<TableCell component="th" sx={{ fontWeight: 500 }} scope="row">
								ÁREA CONSTRUIDA
							</TableCell>
							<TableCell align="right" sx={{ pl: 0 }}>
								{formatNumber(area_total)}m<sup>2</sup>
							</TableCell>
						</TableRow>

						{rows.map(row => (
							<TableRow key={row.type} hover>
								<TableCell component="th" scope="row">
									{row.type}
								</TableCell>
								<TableCell align="right" sx={{ pl: 0 }}>
									{loading
										? (
											<div style={{ display: "flex", justifyContent: "end" }}>
												<Skeleton sx={{ width: { xs: "100%", md: "50%" } }} /> 
											</div>
										)
										: row.totalCost
									}
								</TableCell>
							</TableRow>
						))} */}

						{rows.map(row => (
							<TableRow key={row.type} hover>
								<TableCell component="th" scope="row">
									{row.type}
								</TableCell>
								<TableCell></TableCell>
								<TableCell align="right" sx={{ pl: 0 }}>
									{loading
										? (
											<div style={{ display: "flex", justifyContent: "end" }}>
												<Skeleton sx={{ width: { xs: "100%", md: "50%" } }} /> 
											</div>
										)
										: row.totalCost
									}
								</TableCell>
							</TableRow>
						))}
						<TableRow>
							<TableCell rowSpan={2} sx={{ borderBottom: 0 }}></TableCell>
							<TableCell component="th" sx={{ fontWeight: 500 }} scope="row">
								ÁREA CONSTRUIDA
							</TableCell>
							<TableCell align="right" sx={{ pl: 0 }}>
								{formatNumber(area_total)}m<sup>2</sup>
							</TableCell>
						</TableRow>
						<TableRow hover>
							<TableCell component="th" scope="row">
								COSTO TOTAL DE CONSTRUCCIÓN
							</TableCell>
							<TableCell align="right" sx={{ pl: 0 }}>
								{loading
									? (
										<div style={{ display: "flex", justifyContent: "end" }}>
											<Skeleton sx={{ width: { xs: "100%", md: "50%" } }} /> 
										</div>
									)
									: `S/${formatNumber(total_structure + total_finishes + total_installations)}`
								}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	)
}

function createData(type, totalCost) {
	return { type, totalCost }
}

const StyledPaper = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	color: "#fff",
	textAlign: "center",
	padding: "5px 0",
	backgroundColor: "#adadad",
	fontSize: "1rem",
	fontWeight: "500",
}));

function formatNumber(num) {
	return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
}
