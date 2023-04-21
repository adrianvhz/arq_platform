import { useState } from "react";
import { useDispatch } from "react-redux";
import { setView3DFloor } from "../../../../../redux/building/buildingSlice";
import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import View3dIcon from "@mui/icons-material/ViewInAr";

export default function Button3D({ handleViewState }) {
	const [anchorEl, setAnchorEl] = useState(null);
	
	const dispatch = useDispatch();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	}
	
	const handleClose = () => {
		setAnchorEl(null);
	}

	const handleViewModule = (floor) => () => {
		handleViewState({ view: "3D" });
		dispatch(setView3DFloor({ floor }));
		handleClose();
	}

	const open = Boolean(anchorEl);
  	const id = open ? "simple-popover" : undefined;

	return (
		<>
			<ColorButton
				onClick={handleClick}
			>
				<View3dIcon htmlColor="#3699FF" />&nbsp; 3D
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
				PaperProps={{ sx: { backgroundColor: "initial" } }}
			>
				<Grid container spacing={.4} style={{ width: "240px" }}>
					<Grid item xs={8} className="cursor" onClick={handleViewModule(1)}>
						<div style={{ padding: ".5rem 1rem" }} className="module">
							NIVEL 1
						</div>
					</Grid>
					<Grid item xs={8} className="cursor" onClick={handleViewModule(2)}>
						<div className="module">
							NIVEL 2
						</div>
					</Grid>
					<Grid item xs={8} className="cursor disabled" onClick={handleViewModule(3)}>
						<div className="module">
							NIVEL 3
						</div>
					</Grid>
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
});
