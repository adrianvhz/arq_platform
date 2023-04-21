import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";
import MuiBox from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Container from "@mui/system/Container";

export const Footer = ({ open }) => {
	return (
		<Box component="footer">
			<Grid container justifyContent="space-between" alignItems="center">
				<Grid item>
					<span style={{ marginRight: "1rem", color: "#B5B5C3", fontWeight: "500"}}>2023©</span>
					<a href="/">ProDesign</a>
				</Grid>
			</Grid>
		</Box>
	)
}

const Box = styled(MuiBox)(({ theme }) => ({
	padding: "1rem 2rem",

    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
	backgroundColor: "#ffffff"
}));
