import { Link as RouterLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MonitorIcon from "@mui/icons-material/Monitor";

export default function Sistema({ open, selected, matchMobile, handleDrawerClose }) {
	return (
		<ListItem disablePadding>
			<RouterLink to={"/sistema"} style={{ display: "block", width: "100%" }}>
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
						<MonitorIcon />
					</ListItemIcon>
					<ListItemText
						disableTypography
						sx={{
							opacity: open ? 1 : 0,
							color: selected ? "#fff" : "#9899ac"
						}}
					>
						Sistema
					</ListItemText>
				</ListItemButton>
			</RouterLink>
		</ListItem>
	)
}
