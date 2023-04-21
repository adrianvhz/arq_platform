import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link as RouterLink } from "react-router-dom";
// import { useForm } from "../../../hooks";
// import { startCreateUserWitbEmailPassword } from "../../store/auth";
import { useSnackbar } from "notistack"
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreateUserWithEmailPassword } from "../../redux/auth";

// const formData = {
//   displayName: "",
//   email: "",
//   password: "",
// };

// const formValidations = {
//   email: [(value) => value.includes("@"), "El correo no es correcto"],
//   password: [
//     (value) => value.length >= 6,
//     "El password debe de tener mas de 6 caracteres",
//   ],
//   displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
// };

export const RegisterPage = () => {
	// const { status, errorMessage } = useSelector((state) => state.auth);
	
	// const [formSubmitted, setFormSubmitted] = useState(false);
	//const { status, errorMessage } = useSelector(state=>state.auth)

	//  const isChekingAuthentication = useMemo( ()=> status === 'checking', [status])

	//   const {
	//     name,
	//     email,
	//     password,
	//     onInputChange,
	//     formState,
	//     isFormValid,
	//     displayNameValid,
	//     emailValid,
	//     passwordValid,
	//   } = useForm(formData, formValidations);
	
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	// const handleClick = {
	// 	a: (variant) => {
	// 		// variant could be success, error, warning, info, or default
	// 		enqueueSnackbar('This is a success message!', { variant });
	// 	}
	// }
	// console.log(123)
	const handleBackdrop = ({ message, variant }) => {
		// variant could be success, error, warning, info, or default
		enqueueSnackbar(message, { variant });
	}

	const onSubmit = (evt) => {
		evt.preventDefault();
		var { name, email, lastname, password } = Object.fromEntries(new FormData(evt.target));
		console.log(name, lastname, email, password);
		dispatch(startCreateUserWithEmailPassword({ name, lastname, email, password, handleBackdrop }));

	//  setFormSubmitted(true);

	//  if (!isFormValid) return;

		//dispatch(startCreateUserWithEmailPassword(formState));
	};

	return (
		<Grid container spacing={{ xs: 3, sm: 5 }}>
			<Grid item xs={12}>{/* paddingTop: "0.75rem", paddingBottom: "2.5rem" */}
				<Typography
					variant="h3"
					sx={{
						color: "#181C32",
						fontWeight: 600,
						fontSize: {
							xs: "1.25rem",
							lg: "1.75rem"
						}
					}}
				>
					Registrate!
				</Typography>
				{/* <h1>FormValid : {isFormValid ? "Valido" : "Incorrecto"} </h1> */}
			</Grid>
			<Grid item xs={12}>
				<form onSubmit={onSubmit}>
					<Grid container rowSpacing={3} columnSpacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Nombre"
								type="text"
								placeholder="Nombre"
								variant="filled"
								fullWidth
								name="name"
								required
								InputLabelProps={{ required: false }}
								// value={name}
								// onChange={onInputChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								label="Apellido"
								type="text"
								placeholder="Apellido"
								variant="filled"
								fullWidth
								name="lastname"
								required
								InputLabelProps={{ required: false }}
								// value={name}
								// onChange={onInputChange}
							/>
						</Grid>
						
						<Grid item xs={12}>
							<TextField
								label="Correo electrónico"
								type="email"
								placeholder="email@domain.com"
								variant="filled"
								fullWidth
								name="email"
								required
								InputLabelProps={{ required: false }}
								// value={email}
								// onChange={onInputChange}
								
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Contraseña"
								type="password"
								placeholder="Contraseña"
								variant="filled"
								fullWidth
								name="password"
								required
								InputLabelProps={{ required: false }}
								// value={password}
								// onChange={onInputChange}
								
							/>
						</Grid>
							{/* <Grid 
							item xs={12}
							>
								<Alert
									severity="error"
								>{errorMessage}</Alert>
							</Grid> */}
						<Grid item xs={"auto"}>
							<Button 
								type="submit" 
								variant="contained"
								// fullWidth
								sx={{
									padding: ".85rem",
									backgroundColor: "#1BC5BD",
									borderRadius: "0.42rem",
									textTransform: "unset",
									fontSize: "1rem",
									color: "#ffffff",
									letterSpacing: ".7px",
									fontWeight: "600",
									"&:hover": {
										backgroundColor: "#19b4ac"
									},
								}}
							>
								Registrarme
							</Button>
						</Grid>
						<Grid item xs={"auto"}>
							<RouterLink to="/auth/login">
								<Button 
									type="submit" 
									variant="contained"
									// fullWidth
									sx={{
										padding: ".85rem",
										borderRadius: "0.42rem",
										backgroundColor: "#E1F0FF",
										color: "#3699FF",
										fontSize: "1rem",
										textTransform: "unset",
										letterSpacing: ".7px",
										fontWeight: "600",
										"&:hover": {
											color: "#E1F0FF",
											backgroundColor: "#3699FF"
										}
									}}
								>
									Cancelar
								</Button>
							</RouterLink>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	)
}
