import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useForm } from "../../../../hooks";
import { login, updatePerfil } from "../../../../redux/auth";
import { startSavePerfil } from "../../../../redux/planes/thunks";
import Swal from "sweetalert2";

export const Datos = ({user}) => {
	const { successMessage } = user
	const isValidate = false;
	const {  name,lastname,onInputChange,formState } = useForm(user);
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(login(formState))
	}, [formState]);

	useEffect(() => {
		if (successMessage.length > 0) {
			Swal.fire("Datos actualizado", user.successMessage, "success");
		}
	}, [successMessage]);

	const onSavePerfil = () => {
		dispatch(startSavePerfil(1));
	}

	return (
		<Grid
			container
			spacing={0}
			justifyContent="left"
			sx={{
				minHeight: "auto",
				backgroundColor: "#eef0f8;",
				padding: "20px"
			}}
		>
			
			<FormControl fullWidth sx={{ m: 1 }} variant="standard">  
				<TextField
					error={isValidate}
					id="outlined-error"
					label="Nombres"
					type="text"
					fullWidth
					placeholder="Ingrese un nombre"
					name="name"
					value={name}
					onChange={onInputChange}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="standard">
				<TextField
					error={isValidate}
					id="outlined-error"
					label="Apellidos"
					name="lastname"
					value={lastname}
					onChange={onInputChange}
				/>
			</FormControl>

			<FormControl sx={{ m: 1 }} variant="standard">
				<Button 
					variant="contained"
					onClick={onSavePerfil}
				>
					Guardar
				</Button>
			</FormControl>
		</Grid>
	)
}
