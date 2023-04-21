import { useSelector, useDispatch } from "react-redux";
import sha1 from "sha1";
// import { isCheckToken } from '../providers/authProvider';
import { login, logout } from '../redux/auth';
import { verifySSO } from "../services/authService";
import logSSO from "../utils/logSSO";
import { geolocationService } from "../services/utilsService";
import { HOSTNAME } from "../../constants";

export const useAuthStore = () => {
	const status = useSelector(state => state.auth.status);
	const dispatch = useDispatch();

	const useCheckAuth = async () => {
		try {
			const { clientIP } = await geolocationService(); logSSO(clientIP);

			const { user, data } = await verifySSO({
				browserId: sha1(window.navigator.userAgent),
				browserIp: sha1(clientIP),
				browserAud: sha1(clientIP + window.navigator.userAgent + HOSTNAME),
				productId: "pro-design"
			});
			
			localStorage.setItem("SESS_ID", user.id_master);
			
			dispatch(login({
				uid: user.id,
				uid_master: user.id_master,
				name: user.name,
				lastname: user.lastname,
				email: user.email
			}));
				
			
			// if (!token) return dispatch(logout());
			// const token = localStorage.getItem('token');
			// const { data } = await isCheckToken(token);
			// const user = data.data;

		}
		catch (error) {
			console.log(error.message);
			dispatch(logout());
		}
	}
	return { status, useCheckAuth }
}
