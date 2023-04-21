import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import styled from "@mui/material/styles/styled";
import Search from "./HeaderContent/Search";
import { UserPopover } from "../../components";
import Typography from "@mui/material/Typography";

// import { drawerWidth } from 'config';
const drawerWidth = 265;

export default function Header({ open, handleDrawerOpen, handleDrawerClose }) {
	return (
		<AppBar // Appbar === Header
			open={open}
			// position="fixed"
			color="inherit"
			sx={{
				boxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
				WebkitBoxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)"
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<IconButton
					onClick={() => open ? handleDrawerClose() : handleDrawerOpen()}
					sx={{
						backgroundColor: "#f0f0f0",
						borderRadius: "4px",
						marginRight: 5,
					}}
				>
					<MenuOpenOutlinedIcon
						sx={{
							transform: open ? "none" : "rotate(180deg)",
							transition: "0.5s"
						}}
					/>
				</IconButton>
				<UserPopover />
				{/* <Search /> */}
			</Toolbar>
		</AppBar>
	)
}


// ==============================|| HEADER - APP BAR STYLED ||============================== //

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
	[theme.breakpoints.up("sm")]: {
		...(open && styleOnOpen(theme))
	}
    
}));

const styleOnOpen = (theme) => ({
	marginLeft: drawerWidth,
	width: `calc(100% - ${drawerWidth}px)`,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	})
});

