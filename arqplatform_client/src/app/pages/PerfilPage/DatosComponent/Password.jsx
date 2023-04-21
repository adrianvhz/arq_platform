import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useForm } from "../../../../hooks";
import { login, updatePerfil } from "../../../../redux/auth";
import { startSavePerfil } from "../../../../redux/planes/thunks";

export const Password = ({ user }) => {
	const { password, onInputChange, formState } = useForm(user);
	const { successMessage } = user
	const dispatch = useDispatch()
	const isValidate = false;

	useEffect(() => {
		dispatch(login(formState))
	}, [formState]);

	useEffect(() => {
		if (successMessage.length > 0) {
			Swal.fire("Contraseña actualizada", user.successMessage, "success");
		}
	}, [successMessage]);

	const onSavePerfil = () => {
		dispatch(startSavePerfil(3,password));
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
					label="Contrasena"
					type="password"
					fullWidth
					placeholder="Ingrese un contraseña"
					name="password"
					value={password}
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
