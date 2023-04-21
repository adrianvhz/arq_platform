import { LoginWithEmailPassword, registerUser } from "../../providers";
import { loginSSO } from "../../services/authService";
import { checkingCredentials, login, logout, loginFail } from "./authSlice";
import axios from "axios";
import sha1 from "sha1";
import { geolocationService } from "../../services/utilsService";
import { HOSTNAME } from "../../../constants";

export const checkingAuthentication = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
	}
}

// export const startGoogleSignIn = () => {
//   return async (dispatch) => {
//     dispatch(checkingCredentials());

//     //const result = await singInWithGoogle();

//     if (!result.ok) return dispatch(logout(result.errorMessage));

//     dispatch(login(result));
//   };
// };

export const startCreateUserWithEmailPassword = ({
	name,
	lastname,
	email,
	password,
	handleBackdrop
}) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const res = await registerUser(name, lastname, email, password);

		if (res.status === 201) {
				handleBackdrop({ message: res.data.message, variant: "success" });
				dispatch(startLoginWithEmailPassword(email, password, handleBackdrop));
		} else {
			console.log(res)
			handleBackdrop({ message: res.response.data.error.message, variant: "error" });
			res.response.data.error.info?.forEach(el => {
				handleBackdrop({ message: "Error: " + el.msg, variant: "error" });
			});
			dispatch(loginFail());
		}

		// const { ok, uid, photoURL, errorMessage } =
		// await registerUserWithEmailPassword({ email, password, displayName });

		// if (!ok) return dispatch(logout({ errorMessage }));

		// dispatch(login({ uid, photoURL, displayName, email }));
	}
}

export const startLoginWithEmailPassword = (
	email,
	password,
	handleBackdrop
) => {
	return async (dispatch, getState) => {
		dispatch(checkingCredentials());
		
		const res = await LoginWithEmailPassword(email, password);
	
		if (res.status === 200) {
			const { data, message } = res.data;
			const { token, usuario } = data;
			const { id, id_master, email, name, lastname } = usuario;

			localStorage.setItem("SESS_ID", id_master);

			const { clientIP } = await geolocationService();

			await loginSSO({
				userId: id_master,
				userEmail: email,
				browserId: sha1(window.navigator.userAgent),
				browserIp: sha1(clientIP),
				browserAud: sha1(clientIP + window.navigator.userAgent + HOSTNAME),
				productId: "pro-design"
			});

			handleBackdrop({ message: message, variant: "success" });

			dispatch(login({
				uid_master: data.id_master,
				uid: id,
				email,
				name,
				lastname
			}));
		} else if (res.response.status > 0) {
			handleBackdrop({
				message: "Error: " + res.response.data.error.message,
				variant: "error"
			});
			dispatch(loginFail());
		} else {
			handleBackdrop({
				message: "Internal server error, please report it.",
				variant: "error"
			});
			dispatch(loginFail());
		}
	}
}

export const startLogoutAuth = () => {
	return async (dispatch) => {
		// await logoutFirebase();
		dispatch(logout());
	}
}
