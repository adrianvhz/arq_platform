import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingBackdrop from "../components/LoadingBackdrop";
import { AuthLayout } from "../layouts/AuthLayout";
import { LoginPage, RegisterPage } from "../pages";

export const AuthRoutes = () => {
	const isLoading = useSelector((state) => state.auth.status) === "checking";

	if (isLoading) return <LoadingBackdrop />

	return (
		<AuthLayout>
			<Routes>
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
				<Route path="/*" element={<Navigate to="/auth/login" />} />
			</Routes>
		</AuthLayout>
	)
}
