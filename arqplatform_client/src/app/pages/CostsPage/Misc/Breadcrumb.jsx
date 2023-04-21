import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { emphasize } from "@mui/material/styles";
// import styled from "@mui/material/styles/styled";
// import Chip from "@mui/material/Chip";

export default function Breadcrumb() {
	return (
		<div role="presentation" onClick={handleClick}>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
					<LinkRouter underline="hover" color="inherit" to="/">
						Home
					</LinkRouter>
					<LinkRouter to="/proyecto/educacion" underline="hover" color="inherit">
						Colegios
					</LinkRouter>
					<Typography color="text.primary">
						Costos
					</Typography>
				</Breadcrumbs>
			</Box>
			{/* <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
				<StyledBreadcrumb
					component="a"
					href="#"
					label="Home"
					icon={<HomeIcon fontSize="small" />}
				/>
				<StyledBreadcrumb component="a" href="#" label="Colegios" />
				<StyledBreadcrumb
					label="Costos"
					deleteIcon={<ExpandMoreIcon />}
					onDelete={handleClick}
				/>
			</Breadcrumbs> */}
		</div>
	)
}

// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
// 	const backgroundColor =
// 		theme.palette.mode === "light"
// 			? "#f5f5f5"
// 			: theme.palette.grey[800]
// 	return {
// 		// backgroundColor,
// 		height: theme.spacing(3),
// 		color: theme.palette.text.primary,
// 		fontWeight: theme.typography.fontWeightRegular,
// 		"&:hover, &:focus": {
// 			backgroundColor: emphasize(backgroundColor, 0.06),
// 		},
// 		"&:active": {
// 			boxShadow: theme.shadows[1],
// 			backgroundColor: emphasize(backgroundColor, 0.12),
// 		}
// 	}
// });

function LinkRouter(props) {
	return <Link {...props} component={RouterLink} />;
}

function handleClick(event) {
	event.preventDefault();
	console.info("You clicked a breadcrumb.");
}
