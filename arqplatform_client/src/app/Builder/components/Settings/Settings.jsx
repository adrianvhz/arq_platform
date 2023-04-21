// import { useState } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { Formik, Form, Field, useField } from 'formik';
// import Button from '@mui/material/Button';
// // import Box from '@mui/system/Box';
// // import Fade from '@mui/material/Fade';
// // import Card from "@mui/material/Card";
// // import Checkbox from "@mui/material/Checkbox";
// import CircularProgress from '@mui/material/CircularProgress';
// import CancelIcon from "@mui/icons-material/Cancel";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// // import FormControlLabel from "@mui/material/FormControlLabel";
// // import Modal from "@mui/material/Modal";
// // import Input from "@mui/material/Input";
// // import Radio from "@mui/material/Radio";
// // import RadioGroup from "@mui/material/RadioGroup";
// import * as yup from 'yup';
// import { setShowSettings } from '../../../../redux/building/buildingSlice';
// // import { RowForm } from './RowForm';
// import "./styles.css";
// // import { RowFormAC } from './RowFormAC';


// // togle buttons imports
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import ThreeDRotationOutlinedIcon from '@mui/icons-material/ThreeDRotationOutlined';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import { toggleDoor, toggleRailing, toggleWindow } from '../../../../redux/projects/projectSlice';

// export default function Settings({ data }) {
// 	const show = useSelector(state => state.building.showSettings);
// 	const dispatch = useDispatch();

// 	const [rows, setRows] = useState(data?.puntos ? JSON.parse(data?.puntos) : [{ ...defaultState, vertice: "P1" }].concat({ ...defaultState, vertice: "P2" }).concat({ ...defaultState, vertice: "P3" }));
// 	const [rowsAC, setRowsAC] = useState(data?.ambientes ? JSON.parse(data?.ambientes) : []);
// 	const [tipo, setTipo] = useState(data?.sublevel || "unidocente");
// 	const [zone, setZone] = useState();
// 	const [coordenadas, setCoordenadas] = useState(data?.coordenadas || "");

// 	const handleSubmit = () => {

// 	}

// 	const handleChange = (event) => {
// 		setTipo((event.target.value))
// 	}

// 	const handleOnChange = (index, name, value) => {
// 		const copyRows = [...rows];
// 		copyRows[index] = {
// 		   ...copyRows[index],
// 		   [name]: value
// 		}
// 		setRows(copyRows);
// 	}
  
// 	const handleOnChangeAC = (index, name, value) => {
// 		const copyRowsAC = [...rowsAC];
// 		copyRowsAC[index] = {
// 		   ...copyRowsAC[index],
// 		   [name]: value
// 		}
// 		setRowsAC(copyRowsAC);
// 	}
  
// 	const handleOnAdd = () => {
// 		var ultimo = rows.length;
// 		if (rows[ultimo - 1].lado === "P" + ultimo + " - P" + (ultimo + 1)) {
// 		   setRows([...rows, { ...defaultState, lado: `P${ultimo + 1} - P${ultimo + 2}`, vertice: `P${ultimo + 1}`, }]);
// 		}
// 	}
  
// 	const handleOnAddAC = (ambiente) => {
// 		const verificador = rowsAC.find((item) => item.ambienteComplementario === ambiente);
// 		if (!verificador && ambiente !== "") {
// 			setRowsAC([...rowsAC, { capacidad: 0, ambienteComplementario: ambiente }]);
// 		}
// 	}
	
// 	if (show) {
// 		return (
// 			<Container style={{ position: "absolute", zIndex: 9999, backgroundColor: "#ffff", width: "30vw", minHeight: "100%" }}>
// 				<div style={{display: "flex", justifyContent: "space-between", padding: "1rem 0"}}>
// 					<h2>Ajustes</h2>
// 					<CancelIcon onClick={() => dispatch(setShowSettings({ showSettings: false }))} className="pointer" />
// 				</div>
// 				<Formik
// 					// initialValues={initialValues}
// 					onSubmit={handleSubmit}
// 					validationSchema={validationSchema}
// 				>
// 				{({ errors, touched }) => (
// 					<Form>
// 						{/* <Grid item xs={12} sm={12} lg={5}> */}
// 							<Grid container spacing={1.5}>
// 								<Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
// 									<ToggleButtonsMultiple />
// 								</Grid>
// 								<Grid item xs={12}>
// 									<span>NOMBRE:</span><br />
// 									<Field style={styleInput} type="text" name="name" disabled placeholder={`${data?.name ? data.name : "Ingrese nombre del proyecto"}`} />
// 									{errors.name && touched.name ? (
// 										<div style={styleError}>{errors.name}</div>
// 									) : null}
// 									{/* <ErrorMessage name="email" component="div" /> */}
// 								</Grid>

// 								<Grid item xs={12}>
// 									<span>TIPOLOGIA</span> <br />
// 									<Field style={{ ...styleInput, marginTop: ".5rem" }} disabled type="text" name="tipologia" />
// 									{errors.tipologia && touched.tipologia ? (
// 										<div style={styleError}>{errors.tipologia}</div>
// 									) : null}
// 								</Grid>

// 								<Grid item xs={12}>
// 									<div>
// 										<label htmlFor="zone" style={styleInput}>ZONA</label>
// 										<select id="zone" disabled>
// 											<option value="">Seleccione una zona</option>
// 											<option value="urbano">Urbano</option>
// 											<option value="rural">Rural</option>
// 										</select>
// 									</div>
// 								</Grid>

// 								<Grid item xs={6}>
// 									<span>AFORO MAXIMO</span> <br />
// 									<Field style={{ ...styleInput, marginTop: ".5rem" }} disabled type="text" name="aforo_maximo" />
// 									{/* {errors.tipologia && touched.tipologia ? (
// 										<div style={styleError}>{errors.tipologia}</div>
// 									) : null} */}
// 								</Grid>

// 								<Grid item xs={6}>
// 									<span>CANTIDAD DE AULAS</span> <br />
// 									<Field style={{ ...styleInput, marginTop: ".5rem" }} disabled type="text" name="cantidad_de_aulas" />
// 									{/* {errors.tipologia && touched.tipologia ? (
// 										<div style={styleError}>{errors.tipologia}</div>
// 									) : null} */}
// 								</Grid>

// 								<Grid item xs={12}>
// 									<span>PROVINCIA:</span> <br />
// 									<Field style={styleInput} type="text" disabled name="ubication" />
// 									{errors.ubication && touched.ubication ? (
// 										<div style={styleError}>{errors.ubication}</div>
// 									) : null}
// 									{/* <ErrorMessage name="email" component="div" /> */}
// 								</Grid>

// 								<Grid item xs={12}>
// 									<span>DISTRITO:</span> <br />
// 									<Field style={styleInput} type="text" disabled name="distrito" />
// 									{errors.distrito && touched.distrito ? (
// 										<div style={styleError}>{errors.distrito}</div>
// 									) : null}

// 									{/* <ErrorMessage name="email" component="div" /> */}
// 								</Grid>

// 								<Grid item xs={6}>
// 									<span>RESPONSABLE:</span> <br />
// 									<Field style={styleInput} type="text" disabled name="manager" />
// 									{errors.manager && touched.manager ? (
// 										<div style={styleError}>{errors.manager}</div>
// 									) : null}
// 									{/* <ErrorMessage name="email" component="div" /> */}
// 								</Grid>

// 								<Grid item xs={6}>
// 									<span>CLIENTE:</span> <br />
// 									<Field style={styleInput} type="text" disabled name="client" />
// 									{errors.client && touched.client ? (
// 										<div style={styleError}>{errors.client}</div>
// 									) : null}

// 									{/* <ErrorMessage name="email" component="div" /> */}
// 								</Grid>

// 								<Grid item xs={12}>
// 									{/* <span>NIVEL:</span>
// 									<br />

// 									<Grid container spacing={2} > */}

// 										{/* <Grid item xs={5}>
// 										<div role="group" aria-labelledby="my-radio-group" style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
// 											<label>
// 												<Checkbox checked={inicial} onClick={() => setInicial(!inicial)} />
// 												Inicial
// 											</label>
// 											<label>
// 												<Checkbox checked={primaria} onClick={() => setPrimaria(!primaria)} />
// 												Primaria
// 											</label>
// 											<label>
// 												<Checkbox checked={secundaria} onClick={() => setSecundaria(!secundaria)} />
// 												Secundaria
// 											</label>
// 										</div>
// 										</Grid> */}

// 										{/* <Grid item xs={7}>
// 											<RadioGroup
// 												aria-labelledby="demo-radio-buttons-group-label"
// 												defaultValue="female"
// 												name="radio-buttons-group"
// 												// name="tipo"
// 												onChange={handleChange}
// 												value={tipo}
// 											>
// 												<FormControlLabel value="unidocente" control={<Radio />} label="UNIDOCENTE" />
// 												<FormControlLabel value="polidocente multigrado" control={<Radio />} label="POLIDOCENTE MULTIGRADO" />
// 												<FormControlLabel value="polidocente completo" control={<Radio />} label="POLIDOCENTE COMPLETO" />
// 											</RadioGroup>
// 										</Grid> */}

// 										{/* Input for lat and lng */}

// 									{/* </Grid> */}

// 									{/* {(inicial || primaria || secundaria) && (
// 										<Grid container>
// 										<Grid item xs={4} textAlign="center" >
// 											<span>GRADO</span>
// 										</Grid>
// 										<Grid item xs={4} textAlign="center">
// 											<span>AFORO POR GRADO</span>
// 										</Grid>
// 										<Grid item xs={4} textAlign="center">
// 											<span>CANTIDAD DE AULAS</span>
// 										</Grid>
// 										</Grid>
// 									)}

// 									{inicial && (nivelGrid("INICIAL", aforoInicial, aulaInicial))}
// 									{(primaria) > 0 && (nivelGrid("PRIMARIA", aforoPrimaria, aulaPrimaria))}
// 									{(secundaria) > 0 && (nivelGrid("SECUNDARIA", aforoSecundaria, aulaSecundaria))} */}



// 									{/* <Button variant="contained" color="primary" onClick={handleOpen}>
// 										Excel
// 									</Button>
// 									<Modal
// 										aria-labelledby="transition-modal-title"
// 										aria-describedby="transition-modal-description"
// 										open={open}
// 										onClose={handleClose}
// 										closeAfterTransition
// 									>
// 										<Fade in={open}>
// 										<Box sx={styleModal}>


// 											<Grid container spacing={2} >
// 												<Grid item xs={12} lg={4}>
// 													<h2>Adjuntar archivo:</h2>
// 												</Grid>
// 												<Grid item xs={12} lg={8}>
// 													<Input type='file' accept='.xlsx, .xls' onChange={(e) => onImportExcel(e)} sx={{ display: "none" }} id="button_file" />
// 													<label htmlFor="button_file">
// 													<Button variant="outlined" component="span" style={{ width: "200px" }}>
// 														Subir
// 													</Button>
// 													</label>
// 												</Grid>
// 												<Grid item xs={12} lg={8} >
// 													<a href="/descargas/template_project.xlsx" download="Plantilla del Proyecto.xlsx">
// 													<Button variant="contained" color="primary" style={{ width: "200px" }}>
// 														Descargar Plantilla
// 													</Button>
// 													</a>
// 												</Grid>

// 												<Grid item xs={12} lg={4} >
// 													<Button variant="outlined" color="primary" style={{ width: "100px" }} >
// 													Cerrar
// 													</Button>
// 												</Grid>
// 											</Grid>



// 										</Box>
// 										</Fade>
// 									</Modal> */}

// 									<Grid container spacing={1} sx={{ width: "100%", marginTop: "10px" }}>
// 										<Grid item xs={2}>
// 											<span>VÉRTICE</span>
// 										</Grid>
// 										<Grid item xs={2}>
// 											<span>LADO</span>
// 										</Grid>
// 										<Grid item xs={2}>
// 											<span>DIST.</span>
// 										</Grid>
// 										<Grid item xs={3}>
// 											<span>ÁNGULO</span>
// 										</Grid>
// 										<Grid item xs={2}>
// 											<span>RETIROS:</span>
// 										</Grid>
// 	{/* 
// 										{rows.map((row, index) => (
// 										<RowForm
// 											{...row}
// 											onChange={(name, value) => handleOnChange(index, name, value)}
// 											onRemove={() => handleOnRemove(index)}
// 											key={index}
// 											disabledDeleted={index}
// 											error={errors.rows && errors.rows[index]}
// 										/>
// 										))} */}
// 										<Button sx={{ marginTop: "1rem" }} variant='outlined' onClick={handleOnAdd}>Agregar</Button>
// 									</Grid>

// 									{false ? (
// 										<CircularProgress />
// 									) : (
// 										<Grid item xs={12} marginTop="1rem">
// 										<Grid container spacing={1} sx={{ width: "100%" }}>
// 											{/* <Box sx={{ width: "100%", height: "5px", backgroundColor: "#F3F6F9", marginTop: "1rem" }}></Box> */}


// 											<Grid item xs={5} >
// 												<span >{!!rowsAC.length && "AMBIENTES COMPLEMENTARIOS"}</span>
// 											</Grid>
// 											<Grid item xs={3}>
// 												<span>{!!rowsAC.length && "AFORO MAXIMO"}</span>
// 											</Grid>
// 											{rowsAC.map((row, index) => (
// 												<RowFormAC
// 													{...row}
// 													onChange={(name, value) => handleOnChangeAC(index, name, value)}
// 													onRemove={() => handleOnRemoveAC(index)}
// 													key={index}
// 													disabledDeleted={index}
// 												/>
// 											))}
// 											<Grid item xs={12}>
// 												Seleccionar Ambientes complementarios
// 												<select style={{ ...styleInput, marginTop: "1rem", marginBottom: "1rem" }} onChange={(e) => handleOnAddAC(e.target.value)}  >
// 													<option value="">Seleccione</option>

// 													{ambientesComplementarios?.map(ambiente => (
// 													<option key={ambiente.ambienteComplementario} value={ambiente.ambienteComplementario}>{ambiente.ambienteComplementario}</option>
// 													))}
// 												</select>
// 											</Grid>

// 											{/* <Box sx={{ width: "100%", height: "5px", backgroundColor: "#F3F6F9", marginBottom: "1rem" }}></Box> */}

// 										</Grid>
// 										</Grid>
// 									)}
// 								</Grid>
// 							</Grid>
// 						{/* </Grid> */}
// 						<Button variant="contained" type="submit" sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
// 							Guardar
// 						</Button>
// 					</Form>
// 				)}
// 				</Formik>
// 		 </Container>
// 		)
// 	} else {
// 		return null;
// 	}
// }

// export const styleInput = {
// 	width: "100%",
// }
//  const styleError = {
// 	color: "red",
// 	marginTop: "0.25rem",
// }

// const ambientesComplementarios = [
// 	{ capacidad: 0, ambienteComplementario: "Aula" },
// 	{ capacidad: 0, ambienteComplementario: "Laboratorio" },
// 	{ capacidad: 0, ambienteComplementario: "Sala de Clases" },
// 	{ capacidad: 0, ambienteComplementario: "Sala de Juntas" },
// 	{ capacidad: 0, ambienteComplementario: "Sala de Reuniones" },
// 	{ capacidad: 0, ambienteComplementario: "Sala de Trabajo" },
// ]

// const validationSchema = yup.object({
// 	name: yup.string().required('El nombre es requerido'),
// 	tipologia: yup.string().required('La tipologia es requerida'),
// 	ubication: yup.string().required('La ubicacion es requerida'),
// 	distrito: yup.string().required('El distrito es requerido'),
// 	client: yup.string().required('El cliente es requerido'),
// 	manager: yup.string().required('El responsable es requerido'),
// 	zone: yup.string().required('La zona es requerida'),
// 	parent_id: yup.number().required('El padre es requerido'),
// 	capacity: yup.number().required('La capacidad es requerida'),
// 	student: yup.number().required('La capacidad de estudiantes es requerida'),
// 	room: yup.number().required('La capacidad de aulas es requerida'),
// 	height: yup.number().required('La altura es requerida'),
// 	width: yup.number().required('La anchura es requerida'),
// 	// coordenadas: yup.string().required('Las coordenadas son requeridas'),
// 	//array de objetos
// 	rows: yup.array().of(
// 	   yup.object().shape({
// 		  vertice: yup.string().required('El vertice es requerido'),
// 		  lado: yup.string().required('El lado es requerido'),
// 		  distancia: yup.string().required('La distancia es requerida'),
// 		  angulo: yup.string().required('El angulo es requerido'),
// 		  retiros: yup.string().required('Los retiros son requeridos'),
// 	   })
// 	)
// }).defined();

// const defaultState = {
// 	vertice: "",
// 	lado: "",
// 	dist: 0,
// 	angulo: 0,
// 	retiros: 0
// }





import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from "@mui/material/styles/styled";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MuiButton from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import "./styles.css";

export default function Settings({ state, school, handleSetClassrooms }) {
	const [open, setOpen] = useState(false);
	
	const handleDrawerToggle = () => setOpen(!open);
	const handleSubmit = (evt) => {
		evt.preventDefault();
		const data = Object.fromEntries(new FormData(evt.target));

		console.log(data);
		alert("under construction...");
	}
	
	const handleClick = (evt) => {
		const inputs = document.querySelectorAll("input[type='number']");
		const data = {};

		inputs.forEach(el => {
			const levelName = el.previousElementSibling.innerHTML.toLowerCase();
			data[levelName] = Number(el.value);
		});

		school.setNumberOfClassrooms(data.inicial, data.primaria, data.secundaria);
		school.pab[1].floors = [];
		school.pab[2].floors = [];
		school.setClassrooms();
		school.setBathrooms(); // para evitar problemas en los calculos donde el largo de los baños importe
		handleSetClassrooms(data);
		handleDrawerToggle();
	}

	return (
		<>
			<Button onClick={handleDrawerToggle}>
				<SettingsIcon htmlColor="#3699FF" />&nbsp; Ajustes
			</Button>

			<Drawer
				anchor="left"
				open={open}
				onClose={() => setOpen(false)}
			>
				<DrawerHeader>
					<h3>Configuración</h3>
					<IconButton onClick={() => setOpen(false)}>
						<CloseOutlinedIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<Box sx={{
					minWidth: 350,
					padding: "20px 24px",
				}}>
					<div style={{ paddingBottom: "25px", display: "grid", gap: 16 }}>
						<div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
							<label style={{ width: 100 }}>
								<span className="label">INICIAL</span>
								<input
									type="number"
									min={0}
									max={50}
									defaultValue={school.numberOfClassrooms.inicial}
								/>
							</label>

							<label style={{ width: 100 }}>
								<span className="label">PRIMARIA</span>
								<input
									type="number"
									min={0}
									max={50}
									defaultValue={school.numberOfClassrooms.primaria}
								/>
							</label>
							<label style={{ width: 100 }}>
								<span className="label">SECUNDARIA</span>
								<input
									type="number"
									min={0}
									max={50}
									defaultValue={school.numberOfClassrooms.secundaria}
								/>
							</label>
						</div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Tooltip title="Actualizar numero de aulas" disableInteractive>
								<MuiButton variant="contained" color="success" size="small" onClick={handleClick}>
									Aceptar
								</MuiButton>
							</Tooltip>
						</div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<ToggleButtonsMultiple />
						</div>
					</div>

					<form
						style={{ display: "flex", flexDirection: "column", gap: 16 }}
						onSubmit={handleSubmit}
					>
						<div>
							<label>
								<span className="label">NOMBRE</span>
								<input type="text" defaultValue={state.name} />
							</label>
						</div>

						<div>
							<label>
								<span className="label">TIPOLOGÍA</span>
								<input type="text" disabled defaultValue="Colegios" />
							</label>
						</div>
						<div>
							<label>
								<span className="label">ZONA</span>
								<input type="text" defaultValue={state.zone} />
							</label>
						</div>
						<div>
							<div style={{ display: "flex", gap: 16 }}>
								<label>
									<span className="label">AFORO MAXIMO</span>
									<input type="text" />
								</label>

								<label>
									<span className="label">CANTIDAD DE AULAS</span>
									<input type="text" />
								</label>
							</div>
						</div>
						
						{/* <div> */}
							<sub>UBICACIÓN</sub>
							<div>
								<label>
									<span className="label">PROVINCIA</span>
									<input type="text" />
								</label>
							</div>
							<div>
								<label>
									<span className="label">DISTRITO</span>
									<input type="text" />
								</label>
							</div>
							<div>
								<div style={{ display: "flex", gap: 15 }}>
									<label>
										<span className="label">RESPONSABLE</span>
										<input type="text" />
									</label>

									<label>
										<span className="label">CLIENTE</span>
										<input type="text" />
									</label>
								</div>
							</div>

							<sub>TERRENO</sub>
							<div>
								<label>
									<span className="label">...</span>
									<input type="text" />
								</label>
							</div>

							<sub>AMBIENTES COMPLEMENTARIOS</sub>
							<div>
								<label>
									<span className="label">...</span>
									<input type="text" />
								</label>
							</div>

							<sub>DATOS DEL PROYECTO</sub>
							<div>
								<label>
									<span className="label">ANCHO DE MURO</span>
									<input type="text" />
								</label>
							</div>
							<div>
								<label>
									<span className="label">ACABO DE MURO EXTERIOR</span>
									<input type="text" />
								</label>
							</div>
							<div>
								<label>
									<span className="label">ACABADO DE PISO DE AULA</span>
									<input type="text" />
								</label>
							</div>
							<div>
								<label>
									<span className="label">ACABADO DE PISO DE AULA</span>
									<input type="text" />
								</label>
							</div>

							<sub>ESTRUCTURA</sub>
							<div>
								<div style={{ display: "flex", gap: 15 }}>
									<label>
										<span className="label">LARGO COLUMNA (CM)</span>
										<input type="text" />
									</label>

									<label>
										<span className="label">ANCHO COLUMNA</span>
										<input type="text" />
									</label>
								</div>
							</div>
							<div>
								<label>
									<span className="label">ACABADO DE PISO - AULA</span>
									<input type="text" />
								</label>
							</div>
						{/* </div> */}

						<div style={{ padding: "16px 0" }}>
							<MuiButton variant="contained" color="success" type="submit">
								Guardar
							</MuiButton>
						</div>
					</form>
				</Box>
			</Drawer>
		</>
	)
}

function ToggleButtonsMultiple() {
	const [formats, setFormats] = useState(() => JSON.parse(localStorage.getItem("load")) || []); // ["door", "window"]
	const dispatch = useDispatch();

	const handleFormat = (event, newFormats) => {
		localStorage.setItem("load", JSON.stringify(newFormats));
		setFormats(newFormats);
	}

	return (
		<ToggleButtonGroup
			value={formats}
			onChange={handleFormat}
		>
			<ToggleButton value="door" onClick={() => dispatch(toggleDoor())}>
				<SensorDoorOutlinedIcon />
			</ToggleButton>
			<ToggleButton value="window" onClick={() => dispatch(toggleWindow())}>
				<WindowOutlinedIcon />
			</ToggleButton>
			<ToggleButton value="railing">
				<ThreeDRotationOutlinedIcon onClick={() => dispatch(toggleRailing())} />
			</ToggleButton>
			{/* <ToggleButton value="color" aria-label="color" disabled>
			<FormatColorFillIcon />
			<ArrowDropDownIcon />
			</ToggleButton> */}
		</ToggleButtonGroup>
	)
}


const Button = styled(MuiButton)({
    borderRadius: ".42rem",
    color: "#3F4254",
    padding: ".60rem 1rem",
    fontFamily: "inherit",
    textTransform: "none",
    border: "1px solid #E4E6EF",
	margin: ".3rem .4rem",
    boxShadow: "none",
    backgroundColor: "#E4E6EF",
    "&:hover": {
        backgroundColor: "#d8dbe8",
        // boxShadow: "none"
    }
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "0px 1.5rem",
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));
