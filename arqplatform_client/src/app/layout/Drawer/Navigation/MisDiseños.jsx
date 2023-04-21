import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "@mui/material/styles/styled";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
// import Tabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavItemProject from "./NavItemProject";
// icons
import FolderIcon from "@mui/icons-material/Folder";

// import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
// import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
// import TestIcon from '@mui/icons-material/TextSnippet';

export default function MisDiseños({ projectsOpen, drawerOpen, selected, location, handleProjectsOpen, handleDrawerClose, matchMobile, type_project_id = 1 }) {
	// const [tab, setTab] = useState(1); // tabs (type projects)
	const [projectOpen, setProjectOpen] = useState(null);
	
	const projects = useSelector(state => state.project.projects);

	// const handleChange = (evt, newValue) => {
	// 	setTab(newValue);
	// }

	const handleProjectOpen = (project) => () => {
		setProjectOpen(actualProject => {
			if (actualProject === project) return null;
			else return project;
		});
	}

	return (
		<>
			<ListItem disablePadding>
				<ListItemButton
					variant={selected ? "selected" : ""}
					sx={{
						justifyContent: drawerOpen ? "initial" : "center",
						pl: 2.5,
					}}
					onClick={handleProjectsOpen(prev => !prev)}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: drawerOpen ? 2 : "auto",
							justifyContent: "center"
						}}
					>
						<FolderIcon />
					</ListItemIcon>
					<ListItemText
						disableTypography
						sx={{
							opacity: drawerOpen ? 1 : 0,
							color: selected ? "#fff" : "#9899ac"
						}}
					>
						Mis Diseños
					</ListItemText>
					{drawerOpen && <ChevronRightIcon
						sx={{
							color: selected ? "#fff" : "#5c5e81",
							fontSize: "1.3rem",
							transform: projectsOpen ? "rotate(90deg)" : "rotate(0)",
                    		transition: "0.3s",
						}}
					/>}
				</ListItemButton>
			</ListItem>
			
			<Collapse
				in={projectsOpen}
				timeout="auto"
				// unmountOnExit
			>
				{/* select type project */}
				{/* <ListItem
					disablePadding
					sx={{ justifyContent: "center" }}
				>
					<Tabs
						value={tab}
						onChange={handleChange}
						aria-label="icon tabs"
						textColor="primary"
					>
						<Tab icon={<SchoolOutlinedIcon />} aria-label="school" value={1} />
						<Tab icon={<LocalHospitalOutlinedIcon />} aria-label="hospital" value={2} />
						<Tab icon={<TestIcon />} aria-label="test" value={3} />
					</Tabs>
				</ListItem> */}

				{/* projects list */}
				<List disablePadding>
					{/* {projects?.filter(project => project.parent_id === 0 && project.type_id === tab).map(project => ( */}
					{projects?.filter(project => project.parent_id === 0).map(project => (
						<NavItemProject
							key={project.id}
							id={project.id}
							name={project.name}
							selected={location.pathname.split("/").slice(3, 5)}
							open={projectOpen === project.id}
							handleProjectOpen={handleProjectOpen}
							matchMobile={matchMobile}
							handleDrawerClose={handleDrawerClose}
						/>
					))}
				</List>
			</Collapse>
		</>
	)
}

const Tab = styled(MuiTab)({
	color: "#bebebf",
	minWidth: "80px"
});
