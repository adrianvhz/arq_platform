import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Inicio, MisDiseños, Sistema, Configuracion } from "./Navigation";
// import useTheme from "@mui/material/styles/useTheme";

const drawerWidth = 265;

export default function DrawerComponent({ open, matchMobile, handleDrawerOpen, handleDrawerClose }) {
	const [projectsOpen, setProjectsOpen] = useState(false);

	const location = useLocation();

	const handleProjectsOpen = (fn) => () => {
		setProjectsOpen(prev => fn(prev));
	}

	useEffect(() => {
		// !matchMobile && handleDrawerOpen();
		matchMobile && handleDrawerClose();
	}, []);

	useEffect(() => {
		!open && setProjectsOpen(false);
	}, [open]);

	const drawerContent = useMemo(() => (
		<>
			<DrawerHeader
				sx={{
					backgroundColor: "#fff",
					borderRight: 0
				}}
			>
				<RouterLink to={"/"}>
					{/* <Typography variant="h6" color="#000000" fontWeight="600" margin="0 1rem">ProDesign</Typography> */}
					<Box sx={{ position: "absolute", width: { xs: "132px", sm: "150px" }, top: 3, left: 10 }}>
						<img src="/images/ProDesign-logo.png" width="100%" />
					</Box>
				</RouterLink>
			</DrawerHeader>
			<Divider color="#041d49" />
			<List sx={{ marginTop: "0.8rem" }}>
				<Inicio
					open={open}
					selected={location.pathname === "/"}
					matchMobile={matchMobile}
					handleDrawerClose={handleDrawerClose}
				/>

				<MisDiseños
					drawerOpen={open}
					selected={location.pathname.startsWith("/proyecto")}
					location={location}
					projectsOpen={projectsOpen}
					handleProjectsOpen={handleProjectsOpen}
					matchMobile={matchMobile}
					handleDrawerClose={handleDrawerClose}
				/>
				
				<Sistema
					open={open}
					selected={location.pathname === "/sistema"}
					matchMobile={matchMobile}
					handleDrawerClose={handleDrawerClose}
				/>

				<Configuracion
					open={open}
					selected={location.pathname === "/admin/settings"}
					matchMobile={matchMobile}
					handleDrawerClose={handleDrawerClose}
				/>
			</List>
		</>
	), [projectsOpen, location, open]); // matchMobile

	const regularDrawer = (
		<Drawer
			open={open}
			variant="permanent"
			PaperProps={{ sx: { backgroundColor: "#05245c", borderRight: 0 } }}
			onClose={handleDrawerClose}
		>
			{drawerContent}
		</Drawer>
	);

	const mobileDrawer = (
		<MuiDrawer
			open={open}
			variant="temporary"
			sx={{
				zIndex: "1201",
				"& .MuiDrawer-paper": { boxSizing: "border-box", width: "70%" } // "100%"
			}}
			PaperProps={{ sx: { backgroundColor: "#05245c" } }}
			ModalProps={{ keepMounted: true }}
			onClose={handleDrawerClose}
		>
			{drawerContent}
		</MuiDrawer>
	);

	return (
		<Box component="nav">
			{matchMobile
				? mobileDrawer
				: regularDrawer
			}
		</Box>
	)
}



const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}));

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});
  
  const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
  });
  
const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	})
}));
  