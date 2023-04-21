import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ToolsBarComponent from "../ToolsBar/ToolsBar";
import { UserPopover } from "../../../components";
// import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// import MenuIcon from "@mui/icons-material/Menu";
// import CenterFocusWeakOutlinedIcon from "@mui/icons-material/CenterFocusWeakOutlined";
// import Sidebar from "../Sidebar/Sidebar";
// import SidebarMobile from "../Sidebar/SidebarMobile";

export default function Header({
	state, school, view, handleViewState, handleDrawerToggle, handleSetClassrooms
}) {
	return (
		<AppBar
			component="header"
			position="relative"
			sx={{
				backgroundColor: {
					xs: undefined,
					sm: "#ffffff"
				},
				boxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
				WebkitBoxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)"
			}}
		>
			<Toolbar  sx={{ px: "5px" }}>
				{/* ================== ON DESKTOP ================== */}
				<Box
					sx={{
						display: {
							xs: "none",
							sm: "flex"
						},
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%"
					}}
				>
					<ToolsBarComponent
						view={view}
						state={state}
						school={school}
						handleViewState={handleViewState}
						handleSetClassrooms={handleSetClassrooms}
					/>
					<UserPopover />
				</Box>


				{/* ================== ON MOBILE ================== */}
				{/* <Grid container justifyContent="space-between" sx={{ display: { sm: "none" } }}>
					<Grid item>
						<IconButton
							color="inherit"
							onClick={() => alert("aun no implementado")}
						>
							<KeyboardBackspaceIcon />
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton
							onClick={() => alert("(center camera to scene) aun no implementado")}>
							<CenterFocusWeakOutlinedIcon />
						</IconButton>
						<SidebarMobile
							result_data={result_data}
							classroom_measurements={classroom_measurements}
							construction_info={construction_info}
							state={state}
						/>
					</Grid>
					<Grid item>
						<IconButton
							color="inherit"
							onClick={handleDrawerToggle}
						>
							<MenuIcon />
						</IconButton>
					</Grid>
				</Grid> */}
			</Toolbar>
		</AppBar>
	)
}