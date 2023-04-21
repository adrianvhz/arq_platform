import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { getPlanUserById } from '../../../redux/planes';
import { BasicTabs } from './PerfilTabs/BasicTabs';
import { PlanComponent } from './Content/PlanComponent';
import { Datos, Email, Password } from './DatosComponent';

export function PerfilPage() {
	const { planes } = useSelector(status => status.plan);
	const user = useSelector(status => status.auth);
	const data = planes;
	const titulo = ['Persona', 'Correo', 'Contrasena', 'Plan de pago'];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlanUserById())
    }, []);
	
	return (
		<Grid
			container
			spacing={0}
			justifyContent="center"
			sx={{ minHeight: "calc(100vh - 110px)", backgroundColor: "#eef0f8;", padding:'20px' }}
		>
			<Grid item xs={12}>
				<BasicTabs titulo={titulo} >
					<Datos user={user} key={0}   />
					<Email user={user} key={1}   />
					<Password user={user} key={2}   />
					<PlanComponent  key={3} planes={data} />
				</BasicTabs>
			</Grid>
		</Grid>
	)
}
