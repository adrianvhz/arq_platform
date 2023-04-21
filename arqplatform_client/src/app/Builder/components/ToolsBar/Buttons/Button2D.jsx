import { useState } from "react";
import { useDispatch } from "react-redux";
import { setView2DFloor } from "../../../../../redux/building/buildingSlice";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import MapIcon from '@mui/icons-material/Map';
import styled from "@mui/material/styles/styled";

export default function Button2D({ handleViewState }) {
	const [anchorEl, setAnchorEl] = useState(null);
	
	let dispatch = useDispatch();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	}
	
	const handleClose = () => {
		setAnchorEl(null);
	}

	const handleViewModule = (module) => () => {
		handleViewState({ view: "2D" });
		dispatch(setView2DFloor({ floor: module }));
		handleClose();
	}

	const open = Boolean(anchorEl);
  	const id = open ? "simple-popover" : undefined;
	
	return (
		<>
			<ColorButton
				onClick={handleClick}
			>
				<MapIcon htmlColor="#3699FF" />&nbsp; Plano
			</ColorButton>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				sx={{margin: "1.48rem 0"}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				PaperProps={{sx: {backgroundColor: "initial"}}}
			>
				<Grid container spacing={.4} style={{ width: "280px" }}>
					<Grid item xs={7} className="cursor" onClick={handleViewModule(1)}>
						<div style={{padding: ".5rem 1rem"}} className="module">
							NIVEL 1
						</div>
					</Grid>
					<Grid item xs={7} className="cursor" onClick={handleViewModule(2)}>
						<div className="module">
							NIVEL 2
						</div>
					</Grid>
					<Grid item xs={7} className="cursor disabled" onClick={handleViewModule(3)}>
						<div className="module">
							NIVEL 3
						</div>
					</Grid>
					<Grid item xs={7} className="cursor">
						<div className="module" style={{ fontWeight: "500", marginBottom: ".2rem" }}>
							AMBIENTES
						</div>
					</Grid>

					{/* AMBIENTES */}
				{/* <Grid> */}
					<Grid item xs={7} className="cursor disabled" style={{marginLeft: "2.5rem"}}>
						<div className="module">
							MÓDULO AULA
						</div>
					</Grid>
					
					<Grid item xs={7} className="cursor disabled" style={{marginLeft: "2.5rem"}}>
						<div className="module">
							CAFETERÍA
						</div>
					</Grid>

					<Grid item xs={7} className="cursor disabled" style={{marginLeft: "2.5rem"}}>
						<div className="module">
							BIBLIOTECA
						</div>
					</Grid>

					<Grid item xs={7} className="cursor disabled" style={{marginLeft: "2.5rem"}}>
						<div className="module">
							AUDITÓRIO
						</div>
					</Grid>
				{/* </Grid> */}
				</Grid>
			</Popover>
		</>
	)
}

const ColorButton = styled(Button)({
    borderRadius: ".42rem",
    color: "#3F4254",
    padding: ".60rem 1rem",
    fontFamily: "inherit",
    textTransform: "none",
    border: "1px solid #E4E6EF",
	margin: ".3rem .4rem",
    boxShadow: "none",
    backgroundColor: "#E4E6EF",
    "&:hover": {
        backgroundColor: "#d8dbe8",
        boxShadow: "none"
    }
})
