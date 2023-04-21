import { useState } from "react";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
// import MapIcon from '@mui/icons-material/Map';
import styled from "@mui/material/styles/styled";

export default function ButtonSave() {
	const [anchorEl, setAnchorEl] = useState(null);
	
	const handleClick = (evt) => {
		setAnchorEl(evt.currentTarget);
	}
	
	const handleClose = () => {
		setAnchorEl(null);
	}

	const open = Boolean(anchorEl);
  	const id = open ? "simple-popover" : undefined;
	
	return (
		<>
			<ColorButton
				onClick={handleClick}
			>
				{/* <MapIcon htmlColor="#3699FF" />&nbsp; */}
				save
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
					<Grid item xs={7} className="cursor">
						<div style={{padding: ".5rem 1rem"}} className="module">
							<a >jpeg</a>
						</div>
					</Grid>

					<Grid item xs={7} className="cursor">
						<div className="module">
							<a id="save-dwg">dwg</a>
						</div>
					</Grid>

					<Grid item xs={7} className="cursor">
						<div className="module">
							<a id="save-obj">obj</a>
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
	margin: "0 .4rem",
    boxShadow: "none",
    backgroundColor: "#E4E6EF",
    "&:hover": {
        backgroundColor: "#d8dbe8",
        boxShadow: "none"
    }
})