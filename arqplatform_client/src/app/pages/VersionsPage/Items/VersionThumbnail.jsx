import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

export default function VersionThumbnail({ version, handleSelectVersion }) {
	return (
		<Grid item xs={4} md={12}>
			<Grid container flexDirection="column" spacing={0.5} sx={{ "&:hover": { cursor: "pointer" } }}>
				<Grid item>
					<StyledPaper>
						{/* <Typography> */}
							{version.name}
						{/* </Typography> */}
					</StyledPaper>
				</Grid>
				<Grid item onClick={handleSelectVersion(version)}>
					<img
						width="100%"
						src={"https://www.dropbox.com/s/raw/" + version.thumbnail?.slice(26)}
						// src={`${import.meta.env.VITE_API_BASE_URL}/api/v1/projects/thumbnail/${version.id}`}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

const StyledPaper = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	color: "#fff",
	padding: "6px 0",
	backgroundColor: "#adadad",
	fontSize: "1rem",
	lineHeight: 1.5,
	[theme.breakpoints.only("xs")]: {
		fontSize: ".93rem",
		padding: "3px 0"
	}
}));
