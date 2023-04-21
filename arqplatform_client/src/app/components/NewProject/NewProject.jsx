import { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import NewProjectForm from './NewProjectForm';
// import Tooltip from "@mui/material/Tooltip";

import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';

const NewProject = ({ onRow, data, school }) => {
    const [open, setOpen] = useState(false);
	const [newProject, setShow] = useState({ show: true });
	const formRef = useRef(null);

	const handleShow = (value) => {
		setShow(value);
	}

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {onRow
				? <AddOutlinedIcon onClick={handleOpen} sx={{ cursor: "pointer" }} />
				:	(
					// <Tooltip title="Crear proyecto nuevo">
						<ColorButton variant="contained" sx={{ fontWeight: 500 }} onClick={handleOpen} size="large">
							<AddOutlinedIcon />&nbsp; Nuevo
						</ColorButton>
					// </Tooltip> 	
				)
			}
			<Dialog
				open={open}
				scroll="body"
				maxWidth="md"
				transitionDuration={{ enter: 400, appear: 300, exit: 400 }}
				PaperProps={{
					sx: {
						margin: {
							xs: "12px",
							sm: 3,
							md: 4
						},
						overflowY: newProject.show ? "hidden" : "unset"
					}
				}}
				onClose={handleClose}
			>
				{newProject.show
					? (
						<DialogTitle
							sx={{
								m: 0,
								p: {
									xs: "8px 16px",
									sm: 2
								}
							}}
						>
							Crear proyecto nuevo
							<IconButton onClick={handleClose}
								sx={{
									position: "absolute",
									right: 8,
									top: { xs: 2, sm: 8 },
									color: "gray"
								}}>
								<CloseIcon />
							</IconButton>
						</DialogTitle>
					)
					: (
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<Button onClick={handleClose} color="error">Cerrar</Button>
							
							<RouterLink to={"/proyecto/colegios/" + newProject.id}>
								<Button color="primary">Ir al proyecto</Button>
							</RouterLink>
						</Box>
					)
				}
				<DialogContent
					dividers
					sx={{
						padding: {
							xs: "12px 16px",
							sm: "1.5rem 3.5rem"
						}
					}}
				>
					<NewProjectForm
						ref={formRef}
						data={data}
						handleClose={handleClose}
						handleShow={handleShow}
						school={school}
					/>
				</DialogContent>
				{newProject.show
					? (
						<DialogActions sx={{ py: "1.2rem" }}>
							<Button color="secondary" variant="contained" onClick={handleClose}>
								Cancelar
							</Button>
							<Button variant="contained" onClick={() => formRef.current.handleSubmit()}>
								Guardar
							</Button>
						</DialogActions>
					)
					: null
				}
			</Dialog>
        </>
    )
}

const Dialog = styled(MuiDialog)(({ theme }) => ({
	".MuiDialog-paper.MuiDialog-paperScrollBody": {
		[theme.breakpoints.down(964)]: {
			maxWidth: "calc(100% - 10px)"
		}
	}
}));

// export const styleModal = {
// 	position: "absolute",
// 	padding: "2rem 3rem",
// 	top: "50%",
// 	left: "50%",
// 	// transform: 'translate(-50%, -50%)',
// 	marginTop: {
// 		xs: "-40vh",
// 		sm: "-40vh",
// 		md: "-40vh"
// 	},
// 	marginLeft: {
// 		// xs: "-175px",
// 		xs: "-45vw",
// 		sm: "-40vw",
// 		md: "-400px"
// 	},
// 	height: {
// 		xs: "80vh",
// 		sm: "80vh",
// 		md: "80v"
// 	},
// 	width: {
// 		// xs: "350px",
// 		xs: "90vw",
// 		sm: "80vw",
// 		md: "800px"
// 	},
// 	bgcolor: 'background.paper',
// 	overflowY: "scroll",
// 	borderRadius: '6px',
// 	boxShadow: 24,
// 	p: 4
// }

const ColorButton = styled(Button)({
	borderRadius: ".42rem",
	color: "#ffffff",
	padding: ".60rem 1rem",
	fontFamily: "inherit",
	textTransform: "none",
	border: "1px solid #1BC5BD",
	boxShadow: "none",
	backgroundColor: "#1BC5BD",
	'&:hover': {
		backgroundColor: "#2cb4ad",
		boxShadow: "none"
	}
});

export default NewProject
