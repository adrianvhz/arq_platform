import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Sidebar from "./Sidebar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function SidebarMobile({ result_data, classroom_measurements, construction_info, state }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<IconButton onClick={handleOpen}>
				<MoreVertIcon />
			</IconButton>
			<Drawer
				variant="temporary"
				open={open}
				anchor="right"
				ModalProps={{
					keepMounted: true // Better open performance on mobile.
				}}
				onClose={handleClose}
			>
				<Sidebar
					result_data={result_data}
					classroom_measurements={classroom_measurements}
					construction_info={construction_info}
					state={state}
				/>
			</Drawer>
		</>
	)
}