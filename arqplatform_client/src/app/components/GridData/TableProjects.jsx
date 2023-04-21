import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Swal from "sweetalert2";
import { RowList } from "./RowList";
import Box from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import Tooltip from '@mui/material/Tooltip';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import MuiTableCell from "@mui/material/TableCell";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Collapse from '@mui/material/Collapse';
import MuiTableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Skeleton from "@mui/material/Skeleton";
// import SchoolIcon from "@mui/icons-material/School";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mui/material/Icon";
import GroupsIcon from "@mui/icons-material/Groups";
import NewProject from "../NewProject/NewProject";
import { deleteProjectService } from "../../../services/projectsService";
import { deleteProject } from "../../../redux/projects/projectSlice";

export default function TableProjects({
	projects, typeProject, initialExpand, projectsLoaded
}) {
	return <ProjectsTable projects={projects} expand={initialExpand} />

	return (
		<Box sx={{
			width: "100%",
			overflowX: "auto"
		}}>

			<div style={dataBoxGrid}>
				<Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
					ID
				</Box>
				<Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
					Tipo
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "180px", width: "20%" }}>
					Nombre
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
					Ubicación
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "150px", width: "10%" }}>
					Responsable
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "40px", width: "15%" }}>
					Creado
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
					Actualizado
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "170px", width: "20%" }}>
					Cliente
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
					Acciones
				</Box>
			</div>
			
			{projects !== null
				? <RowsList projects={projects} initialExpand={initialExpand} />
				: projectsLoaded ? null : <LoadingRowList />
			}
		</Box>
	)
}

const RowsList = ({ projects, setMutate, initialExpand }) => {
	return projects?.map(row => (
		<RowList
			key={row.id}
			row={row}
			projects={projects}
			initialExpand={initialExpand}
			// icon={typeProject.icon}
		/>
	))
}

const LoadingRowList = () => {
	return [1, 2, 3, 4, 5].map(el => (
		<div key={el}>
			<div
				style={{
					width: "100%",
					display: "flex"
				}}
			>
				<Box sx={{ ...styleGrid2, width: "5%", minWidth: "50px" }}>
					<Skeleton variant="rounded" />
				</Box>
				<Box sx={{ ...styleGrid2, width: "5%", minWidth: "50px" }}>
					<Icon>
						<MapsHomeWorkIcon />
					</Icon>
				</Box>
				<Box sx={{ ...styleGrid2, minWidth: "180px", width: "20%", cursor: "pointer" }}>
					<Skeleton variant="rounded" />
				</Box>
				<Box sx={{ ...styleGrid2, minWidth: "100px", width: "10%" }}>
					<Skeleton variant="rounded" />
				</Box>
				<Box sx={{ ...styleGrid2, minWidth: "150px", width: "10%" }}>
					<Skeleton variant="rounded" />
				</Box>
				<Box sx={{ ...styleGrid2, minWidth: "40px", width: "15%" }}>
					<Skeleton variant="rounded" />
				</Box>
				<Box sx={{ ...styleGrid2, minWidth: "120px", width: "15%" }}>
					<Skeleton variant="rounded" />
				</Box>
				<Box sx={{ ...styleGrid2, minWidth: "170px", width: "20%" }}>
					<Skeleton variant="rounded" />
				</Box>
				<Box sx={{ ...styleGrid2, minWidth: "85px", width: "10%" }}>
					<AddIcon />
					<GroupsIcon />
					<DeleteIcon />
				</Box>
			</div>
		</div>
	))
}

const dataBoxGrid = {
	width: "100%",
	display: "flex"
}

const styleGrid = {
	border: "0.5px solid #AFAFAF",
	fontSize: "14px",
	padding: "8px 6px",
	minWidth: "20px",
	color: "#000000",
	fontWeight: 500
}

const styleGrid2 = {
	border: "0.5px solid #AFAFAF",
	width: "100%",
	fontSize: "14px",
	padding: "8px 6px",
	minWidth: "20px"
}






const IconButton = styled(MuiIconButton)({
	padding: "2px 4px"
});








function ProjectsTable({ projects, expand }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const parentProjects = projects?.filter(el => el.parent_id === 0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}

	return (
		<Paper sx={{ width: "100%" }}>{/* overflow: "hidden" */}
			<TableContainer sx={{ overflowY: "hidden" }}>{/* maxHeight: 1000 */}
				<Table sx={{ borderCollapse: "collapse" }}>
					<TableHead>
						<TableRow
							sx={{
								"& > .MuiTableCell-root": { border: "1px solid #EBEDF3" }
							}}
						>
						{columns.map((column) => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{
									minWidth: column.minWidth,
									fontSize: "1rem",
									fontWeight: 600
								}}
							>
								{column.label}
							</TableCell>
						))}
						</TableRow>
					</TableHead>
					<TableBody sx={{ ".MuiTableCell-root": { fontSize: 12.5 } }}>
						{parentProjects
						?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row, i) => (
							<Row
								key={row.id}
								row={row}
								versions={projects.filter(el => row.id === el.parent_id)}
								color={i % 2 === 0 ? "#0000000a" : undefined}
								expand={expand}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{!expand && (
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={parentProjects?.length || 1}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelRowsPerPage="Filas por página:"
				labelDisplayedRows={(x) => `${x.from}-${x.to} de ${x.count}`}
			/>
			)}
		</Paper>
	);
}


function Row({ row, versions, color, expand }) {
	const [open, setOpen] = useState(() => expand);
	const dispatch = useDispatch();

	const handleToggle = () => setOpen(!open);
	const handleDelete = (id, parentID, name) => () => {
		Swal.fire({
			focusConfirm: false,
			returnFocus: false,
			focusCancel: false,
			focusDeny: false,
			iconColor: "#a50000", // #ad3249
			title: 'Confirmación',
			// text: `Eliminar el proyecto: ${name}?`,
			html: `Eliminar ${parentID ? "versión" : "proyecto"}: <em>${name}</em>`,
			icon: 'warning',
			showCloseButton: true,
			confirmButtonColor: 'rgb(54, 153, 255)', // #05245c
			confirmButtonText: 'OK',
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteProject({ id, parentID }));
				deleteProjectService(id, parentID);
				Swal.fire(
					"Exito",
					"El proyecto ha sido eliminado",
					"success"
				)
			}
		})
    }

	return (
		<>
			{/* <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ '& > *': { borderBottom: 'unset', borderTop: "unset" } }}> */}
			<TableRow
				role="checkbox"
				tabIndex={-1}
				sx={{
					"& > .MuiTableCell-root": {
						border: "1px solid #EBEDF3",
						borderTop: 0,
						padding: "10px"
					},
					backgroundColor: color,
				}}
			>
				<TableCell>
					{row.id}
				</TableCell>
				<TableCell>
					<Icon>
						<SchoolOutlinedIcon />
					</Icon>
				</TableCell>
				<TableCell>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						{row.name}
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={handleToggle}
						>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</Box>
				</TableCell>
				<TableCell>
					{row.ubication}
				</TableCell>
				<TableCell align="left">
					{row.manager}
				</TableCell>
				<TableCell>
					{new Date(row.createdAt)
						.toLocaleString("es-ES", {
							weekday: "short",
							year: "numeric",
							month: "long",
							day: "2-digit",
							hour: "numeric",
							minute: "numeric",
							second: "numeric"
						}
					)}
				</TableCell>
				<TableCell>
					{new Date(row.updatedAt)
						.toLocaleString("es-ES", {
							weekday: "short",
							year: "numeric",
							month: "long",
							day: "2-digit",
							hour: "numeric",
							minute: "numeric",
							second: "numeric"
						}
					)}
				</TableCell>
				<TableCell>
					{row.client}
				</TableCell>
				<TableCell>
					Privado
				</TableCell>
				<TableCell>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Tooltip title="Nuevo" arrow disableInteractive>
							<IconButton>
								<NewProject onRow data={row} />
							</IconButton>
						</Tooltip>
						
						<Tooltip title="Compartir" arrow disableInteractive>
							<IconButton>
								<GroupsOutlinedIcon />
							</IconButton>
						</Tooltip>
						
						<Tooltip title="Eliminar" arrow disableInteractive>
							<IconButton
								onClick={handleDelete(row.id, null, row.name)}
							>
								<DeleteOutlinedIcon />
							</IconButton>
						</Tooltip>
					</Box>
				</TableCell>
				

				{/* {columns.map((column) => {
				const value = row[column.id];

				return (
					<TableCell key={column.id} align={column.align}>
					{column.format && typeof value === "number"
						? column.format(value)
						: value}
					</TableCell>
				);
				})} */}
			</TableRow>
			
			{versions.map(version => (
				<CarruselRow
					key={version.id}
					open={open}
					version={version}
					handleDelete={handleDelete}
				/>
			))}
		</>
	)
}


const columns = [
	{ id: "id", label: "ID", minWidth: 50 },
	{ id: "type", label: "Tipo", minWidth: 50 },
	{
		id: "name",
		label: "Nombre",
		minWidth: 130,
		align: "left",
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "ubication",
		label: "Ubicación",
		minWidth: 100,
		align: "left",
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "designated",
		label: "Responsable",
		minWidth: 140,
		align: "left",
		format: (value) => value.toFixed(2),
	},
	{ id: "created", label: "Creación", minWidth: 112 },
	{ id: "updated", label: "Actualización", minWidth: 112 },
	{ id: "client", label: "Cliente", minWidth: 120 },
	{ id: "state", label: "Estado", minWidth: 80 },
	{ id: "actions", label: "Acciones", align: "center", minWidth: 100 }
	// \u00a0
]

const TableCell = styled(MuiTableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// border: "1px solid #EBEDF3",
		padding: 10
	//   backgroundColor: theme.palette.common.black,
	//   color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		// border: "1px solid #EBEDF3"
	},
}));

const TableRow = styled(MuiTableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		// backgroundColor: theme.palette.action.hover,
	},
	
	// hide last border
	'&:last-child td': {
		// border: 0
	},
}));

const CarruselRow = ({ open, version, handleDelete }) => {
	return (
		<TableRow
			key={version.id}
			sx={{ 
				"& > td": {
					opacity: open ? 1 : 0,
					padding: open ? "10px" : "0 10px",
					lineHeight: open ? "unset" : 0,
					transition: "all 0.2s ease-in-out",
					borderColor: "#EBEDF3",
					borderStyle: "solid",
					// borderWidth: 1,
					borderWidth: open ? 1 : 0,
					// borderTopWidth: open ? 1 : 0
				}
			}}
		>
			<TableCell>
				{version.id}
			</TableCell>
			<TableCell>
				{open && (
					<Icon>
						<SchoolOutlinedIcon />
					</Icon>
				)}
			</TableCell>
			<TableCell>
				<RouterLink to={`/proyecto/colegios/${version.id}`}>
					<span style={{ color: "#3699FF", display: "block" }}>
						{version.name}
					</span>
				</RouterLink>
			</TableCell>
			<TableCell>
				{version.ubication}
			</TableCell>
			<TableCell>
				{version.manager}
			</TableCell>
			<TableCell>
				{new Date(version.createdAt)
					.toLocaleString("es-ES", {
						weekday: "short",
						year: "numeric",
						month: "long",
						day: "2-digit",
						hour: "numeric",
						minute: "numeric",
						second: "numeric"
					}
				)}
			</TableCell>
			<TableCell>
				{new Date(version.updatedAt)
					.toLocaleString("es-ES", {
						weekday: "short",
						year: "numeric",
						month: "long",
						day: "2-digit",
						hour: "numeric",
						minute: "numeric",
						second: "numeric"
					}
				)}
			</TableCell>
			<TableCell>
				{version.client}
			</TableCell>
			<TableCell>
				Privado
			</TableCell>
			<TableCell>
				{open && (
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Tooltip title="Nuevo" arrow disableInteractive>
							<IconButton>
								<NewProject onRow data={version} />
							</IconButton>
						</Tooltip>
						
						<Tooltip title="Compartir" arrow disableInteractive>
							<IconButton>
								<GroupsOutlinedIcon />
							</IconButton>
						</Tooltip>
						
						<Tooltip title="Eliminar" arrow disableInteractive>
							<IconButton
								onClick={handleDelete(version.id, version.parent_id, version.name)}
							>
								<DeleteOutlinedIcon />
							</IconButton>
						</Tooltip>
					</Box>
				)}
			</TableCell>
		</TableRow>
	)
}
