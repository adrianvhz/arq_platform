import { Link as RouterLink } from "react-router-dom";
import List from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styled from "@mui/material/styles/styled";
import ListItem from "@mui/material/ListItem";
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import CircleIcon from '@mui/icons-material/Circle';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ShortTextIcon from '@mui/icons-material/ShortText';

export default function NavItemProject({ id, name, selected, open, handleProjectOpen, matchMobile, handleDrawerClose }) {
	const [projectID, page] = selected;

	return (
		<>
			<ListItem disablePadding>
				<ListItemButton
					// selected={Number(projectID) === id}
					onClick={handleProjectOpen(id)}
					sx={{ pl: "2.2rem" }}
				>
					<CircleIcon
						htmlColor="#74748e"
						color={Number(projectID) === id ? "primary" : "inherit"}
						sx={{ mx: "10px", fontSize: "6.3px" }}
					/>
					<ListItemText
						disableTypography
						sx={{ color: Number(projectID) === id ? "#f5f5f5" : "#9899ac" }}
					>
						{name}
					</ListItemText>
					<ChevronRightIcon
						sx={{
							color: Number(projectID) === id ? "#f5f5f5" : "#5c5e81",
							fontSize: "1.3rem",
							transform: open ? "rotate(90deg)" : "rotate(0)",
                    		transition: "0.3s"
						}} 
					/>
				</ListItemButton>	
			</ListItem>

			<Collapse
				in={open}
				timeout="auto"
				// unmountOnExit
			>
				<List
					disablePadding
					onClick={matchMobile ? handleDrawerClose : undefined}
				>
					<RouterLink to={`/proyecto/colegios/${id}/versions`}>
						<ListItemButton
							selected={Number(projectID) === id && page === "versions"}
							sx={{
								pl: "3rem",
							}}
						>
							<ShortTextIcon
								htmlColor="#74748e"
								color={Number(projectID) === id && page === "versions" ? "primary" : "unset"}
								sx={{ mx: "10px", fontSize: "16px" }}
							/>
							<ListItemText
								disableTypography
								sx={{
									color: Number(projectID) === id && page === "versions" ? "#f5f5f5" : "#9899ac"
								}}
							>
								Versiones
							</ListItemText>
						</ListItemButton>
					</RouterLink>
					
					<RouterLink to={`/proyecto/colegios/${id}/costs`}>
						<ListItemButton
							selected={Number(projectID) === id && page === "costs"}
							sx={{ pl: "3rem" }}
						>
							<ShortTextIcon
								htmlColor="#74748e"
								color={Number(projectID) === id && page === "costs" ? "primary" : "unset"}
								sx={{ mx: "10px", fontSize: "16px" }}
							/>
							<ListItemText
								disableTypography
								sx={{
									color: Number(projectID) === id && page === "costs" ? "#f5f5f5" : "#9899ac"
								}}
							>
								Costos
							</ListItemText>
						</ListItemButton>
					</RouterLink>
				</List>
			</Collapse>
		</>
	)
}

const ListItemButton = styled(MuiListItemButton)({
	"&:hover": {
		".MuiListItemText-root": {
			color: "#f5f5f5"
		},
		".MuiSvgIcon-root": {
			color: "#1890ff"
		}
	}
});
