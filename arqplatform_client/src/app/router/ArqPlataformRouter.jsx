import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
// import { setProjects, setTypeProjects } from "../../redux/projects/projectSlice";
// import { getProjectsByUserID, getTypeProjects } from "../../services/projectsService";
import { initialProjectState } from "../../redux/projects/thunks";
import {
	Home,
	// ModulePage,
	SistemaPage,
	PerfilPage,
	VersionsPage,
	CostsPage,
	SettingsPage
} from "../pages";

export const ArqPlataformRouter = ({ school }) => {
	const id = useSelector((state) => state.auth.uid);
	const dispatch = useDispatch();
	
	dispatch(initialProjectState(id));

	return (
		<AppLayout>
			<Routes>
				<Route path="/" element={<Home school={school} />} />
				<Route path="/perfil" element={<PerfilPage />} />
				{/* <Route path="/proyecto/:slug" element={<ModulePage />} /> */}
				<Route path="/proyecto/:slug/:id/versions" element={<VersionsPage school={school} />} />
				<Route path="/proyecto/:slug/:id/costs" element={<CostsPage />} />
				<Route path="/sistema" element={<SistemaPage /> } />
				<Route path="/admin/settings" element={<SettingsPage /> } />
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</AppLayout>
	)
}
