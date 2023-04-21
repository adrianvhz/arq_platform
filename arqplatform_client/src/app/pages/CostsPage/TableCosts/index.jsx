import { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import TableSelect from "./TableSelect";
import { updateProjectCostsByIDService } from "../../../../services/projectsService";
import { updateProjectCosts } from "../../../../redux/projects/projectSlice";
import "./styles.css";

export default function TableCosts({ project, categories, calculatedCosts, handleCosts, handleToggleLoading }) {
	const [open, setOpen] = useState(false);
	
	const dispath = useDispatch();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const data = Object.fromEntries(new FormData(evt.target));
		console.log(data);

		handleToggleLoading();

		updateProjectCostsByIDService(project.id, data)
			.then(res => {
				Object.assign(categories, data);
				Object.assign(calculatedCosts, res.data.calculatedProjectCosts)
				// const y = calculatedCosts.slice();

				// let index_categ = categories.findIndex(el => el.project_id === payload.project_id);

				// x[index_categ] = Object.assign(x[index_categ], data);
				// y[index_categ] = Object.assign(y[index_categ], res.data.calculatedProjectCosts);

				// handleCosts({
				// 	costsCategories: x,
				// 	calculatedCosts: y
				// })
				// dispath(updateProjectCosts({
				// 	project_id: project.id,
				// 	costsCategories: data,
				// 	calculatedCosts: res.data.calculatedProjectCosts
				// }));
				handleToggleLoading();
			});
		
		handleClose();

		Toast.fire({
			icon: "success",
			title: "Tablero actualizado correctamente!",
			background: "#0d6efd",
			color: "#ffffff"
		});
	}

	return (
		<div style={{ alignSelf: "end" }}>{/* alignSelf: end   por mientras */}
			<Chip color="primary" size="small" label="Tablero" onClick={handleOpen} sx={{ mx: 0.5, p: 1 }} />
			<Dialog
				open={open}
				TransitionComponent={Transition}
				maxWidth="lg"
				// keepMounted
				onClose={handleClose}
				PaperProps={{ sx: { margin: 1.5 } }}
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle textAlign="center" sx={{ py: { xs: "10px", sm: "12px" } }}>
						Tabla de Costos
						<IconButton onClick={handleClose}
							sx={{
								position: "absolute",
								right: { xs: 2, sm: 20 },
								top: { xs: 2, sm: 8 },
								color: "gray"
							}}>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent sx={{ p: { xs: "0 12px 10px 12px", sm: "0 24px 12px 24px" } }}>
						<TableSelect project={project} categories={categories} />
					</DialogContent>
					<DialogActions sx={{ p: { xs: "15px 10px", sm: "15px 24px" } }}>
						<Button variant="text" color="secondary" onClick={handleClose}>Cancelar</Button>
						<Button variant="contained" color="primary" type="submit">Aceptar</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	)
}

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

// sweet alert
const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
	  toast.addEventListener("mouseenter", Swal.stopTimer);
	  toast.addEventListener("mouseleave", Swal.resumeTimer);
	}
});


