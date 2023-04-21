import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from './../hooks/useCheckAuth';
import { CheckingAuth } from '../ui';
import { AuthRoutes } from "../auth/routes/AuthRouthes";
import { ArqPlataformRouter } from "./../app/router/ArqPlataformRouter";
import PlanIndex from "../app/Builder/PlanIndex";
import { School } from "../app/Builder/Plan3D/components/Pabellones/school-class";
import { toggleDoor, toggleWindow } from "../redux/projects/projectSlice";

export const AppRouter = () => {
	const { status, useCheckAuth } = useAuthStore();
	const dispatch = useDispatch();

	useEffect(() => {
		const x = JSON.parse(localStorage.getItem("load")) || [];
		console.log(x)

		for (let value of x) {
			if (value === "door") dispatch(toggleDoor());
			if (value === "window") dispatch(toggleWindow());
		}
		
		useCheckAuth();
	}, []);

	if (status === "checking") return <CheckingAuth />

	const school = new School();

	return (
		<Routes>
			{status === "authenticated"
				? (
					<Route>
						<Route path="/*" element={<ArqPlataformRouter school={school} />} />
						<Route path="/proyecto/:slug/:id" element={<PlanIndex school={school} />} />
					</Route>
				)
				: <Route path="/auth/*" element={<AuthRoutes />} />
			}
			<Route path="/*" element={<Navigate to="/auth" />} />
		</Routes>
	)
}
