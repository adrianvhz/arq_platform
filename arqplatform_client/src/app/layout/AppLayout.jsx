import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Toolbar from "@mui/material/Toolbar";
import Header from "./Header/Header";
import Drawer from "./Drawer";
import { Footer } from "./Footer";

export const AppLayout = ({ children }) => {
	const [open, setOpen] = useState(true);
	const matchMobile = useMediaQuery("(max-width:600px)");
	
	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

	// puede haber un error debido a que el drawer sale despues que se renderizan los charts
	// return (
	// 	<div>
	// 		<Box sx={{ display: "flex", width: "100%" }}>
	// 			<Header open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
	// 			<div>
	// 				asdasdasd
	// 			</div>
	// 			{/* <Drawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} matchMobile={matchMobile}  /> */}
	// 			<Box
	// 				component="main"
	// 				sx={{
	// 					width: "100%",
	// 					padding: { xs: 1.5, sm: 3 }
	// 				}}
	// 			>
	// 				<Toolbar />
	// 				{children}
	// 			</Box>
	// 			{/* <Footer open={open} /> */}
	// 		</Box>
	// 	</div>
	// )

	return (
		<Grid container>
			<Header open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
			{/* <Grid> */}
				<Drawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} matchMobile={matchMobile}  />
			{/* </Grid> */}

			<Grid
				container
				xs
				flexDirection="column"
				minHeight="100vh"
			>
				<Grid
					xs={12}
					flex="1"
				>
					<Box
						component="main"
						sx={{
							width: "100%",
							padding: { xs: 2, sm: 3 }
						}}
					>
						<Toolbar />
						{children}
					</Box>
				</Grid>
				{/* <Grid xs={12}> */}
					<Footer open={open} />
				{/* </Grid> */}
			</Grid>
		</Grid>
	)
}
