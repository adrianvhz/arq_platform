import { useDispatch } from "react-redux";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import EditIcon from '@mui/icons-material/Edit';
// actions icons of speed dial
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ShareIcon from '@mui/icons-material/Share';
import TextureIcon from "@mui/icons-material/Texture";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
// import PrintIcon from '@mui/icons-material/Print';
// import SaveIcon from '@mui/icons-material/Save';
import { setColorForLevel } from "../../../../redux/building/buildingSlice";

export function OpenIconSpeedDial() {
	const dispatch = useDispatch();

	const actions = [
		// { icon: <SaveIcon />, name: "Save" },
		// { icon: <PrintIcon />, name: "Print" },
		{ icon: <ShareIcon />, name: "Compartir" },
		{ icon: <FileCopyIcon />, name: "Copiar" },
		{ icon: <TextureIcon />, name: "Textura" },
		{ icon: <FormatColorFillIcon />, name: "Color", action: () => dispatch(setColorForLevel()) }
	];

	return (
		// <Box sx={{ height: 320, transform: "translateZ(0px)" }}>
			<SpeedDial
				ariaLabel="ad"
				sx={{ position: "absolute", bottom: 16, left: 16 }}
				icon={<SpeedDialIcon openIcon={<EditIcon />} sx={{ height: "20px" }} />}
				FabProps={{ sx: {
						boxShadow: "rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px" },
						size: "small",
						color: "info"
						// backgroundColor: "red"
					} }
				>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={action.action}
					/>
					))}
			</SpeedDial>
		// </Box>
	)
}
