import { useSelector } from "react-redux";
import { LoginView, RegisterView } from "../index";
import "./Auth.css"

export const AuthView = () => {
	let authView = useSelector((state) => state.auth.authView);
	
	return authView === "login" ? <LoginView /> : <RegisterView />
}
