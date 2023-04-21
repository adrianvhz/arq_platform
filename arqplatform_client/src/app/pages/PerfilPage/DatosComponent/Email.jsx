import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "../../../../hooks";
import { login, updatePerfil } from "../../../../redux/auth";
import { startSavePerfil } from "../../../../redux/planes/thunks";
import Swal from "sweetalert2";

export const Email = ({user}) => {
	const { successMessage } = user
	const isValidate = false;
	const {  email,onInputChange,formState } = useForm(user);
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(login(formState))
	}, [formState]);

	useEffect(() => {
		if (successMessage.length > 0) {
			Swal.fire("Correo actualizado", user.successMessage, "success");
		}
	}, [successMessage]);

	const onSavePerfil = () => {
		dispatch(startSavePerfil(2));
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
					label="Correo"
					type="text"
					fullWidth
					placeholder="Ingrese un correo"
					name="email"
					value={email}
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
