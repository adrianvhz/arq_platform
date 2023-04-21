import { Link as RouterLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export default function Inicio({ open, selected, matchMobile, handleDrawerClose }) {
	return (
		<ListItem disablePadding>
			<RouterLink to={"/"} style={{ display: "block", width: "100%" }}>
				<ListItemButton onClick={matchMobile ? handleDrawerClose : undefined}
					selected={selected}
					sx={{
						px: 2.5
					}}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: open ? 2 : "auto",
							justifyContent: "center",
						}}
					>
						<LeaderboardIcon />
					</ListItemIcon>
					<ListItemText
						disableTypography
						sx={{
							opacity: open ? 1 : 0,
							color: selected ? "#fff" : "#9899ac"
						}}
					>
						Inicio
					</ListItemText>
				</ListItemButton>
			</RouterLink>
		</ListItem>
	)
}
