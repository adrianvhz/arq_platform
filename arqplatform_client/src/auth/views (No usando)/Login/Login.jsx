import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoginWithEmailPassword, setAuthView, setAuthModal } from "../../../redux/auth";
import { useSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import "./Login.css";


export const LoginView = () => {
	const dispatch = useDispatch();

	const { enqueueSnackbar } = useSnackbar();
	const { status, errorMessage } = useSelector((state) => state.auth);

	const isAutheticate = useMemo(() => status === "authenticated", [status]);
	// const { email, password, onInputChange } = useForm(formDate);

	const handleBackdrop = ({ message, variant }) => {
		// variant could be success, error, warning, info, or default
		enqueueSnackbar(message, { variant });
	}

	const onSubmit = (evt) => {
		evt.preventDefault();
		var { email, password } = Object.fromEntries(new FormData(evt.target));
		dispatch(startLoginWithEmailPassword(email, password, handleBackdrop));
	}

	// const onGoogleSigIn = () => {
	// 	dispatch(startGoogleSignIn(email, password));
	// };

	return (
		<>
			<LoadingBackdrop />
			<form onSubmit={onSubmit} style={{margin: "3rem 0"}}>
				<Grid justifyContent={"center"} container spacing={3}>
					<Grid>
						<Typography variant="h3" textAlign={"center"} sx={{fontSize: "1.75rem", fontWeight: 600, color: "#181C32"}}>
							PLATAFORMA<br />
							DE ARQUITECTURA
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Correo"
							type="email"
							placeholder="email@domain.com"
							fullWidth
							// autoComplete="off"
							name="email"
							// value={email}
							// onChange={onInputChange}
						/>
					</Grid>
					<Grid item xs={12} textAlign="end">
						<a
							href="#"
							onClick={() => dispatch(setAuthView({ authView: "register" }))} className="hl-reg"
						>
							¿ Olvidaste tu contraseña ?
						</a>
						<TextField
							sx={{ mt: ".3rem" }}
							label="Contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
							autoComplete="off"
							name="password"
							required
							InputLabelProps={{ required: false }}
							// value={password}
							// onChange={onInputChange}
						/>
					</Grid>

					{/* <Grid container spacing={2} sx={{ mg: 2, mt: 1 }}> */}
						{/* <Grid item xs={12} sm={12} display={!!errorMessage ? '' : 'none'}>
							<Alert severity="error">
								{errorMessage}
							</Alert>
						</Grid> */}

						<Grid item xs={12} sm={"auto"}>
							<Button 
								type="submit" 
								variant="contained"
								// fullWidth
								sx={{
									padding: ".75rem 1.5rem",
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
								disabled={isAutheticate}
							>
								Ingresar
							</Button>
						</Grid>

						
						{/* <Grid item xs={12} sm={6}>
							<Button
							disabled={isAutheticate}
							variant="contained"
							fullWidth
							onClick={onGoogleSigIn}
							>
							<Google />
							<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid> */}

						
						<Grid item xs={12} textAlign={"center"}>
							<a href="#" onClick={() => dispatch(setAuthView({ authView: "register" }))} className="hl-reg">
								¿ No tienes cuenta ? Registrate.
							</a>
						</Grid>
					</Grid>
				{/* </Grid>s */}
			</form>
		</>
	)
}
