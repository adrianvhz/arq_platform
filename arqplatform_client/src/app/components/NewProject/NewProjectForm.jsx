import { useState, useEffect, forwardRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, useField } from "formik";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import Fade from "@mui/material/Fade";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from '@mui/material/LinearProgress';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { UpperLowerCase } from '../../../utils/utils';
import { RowForm } from './RowForm';
import * as yup from 'yup';
import { RowFormAC } from './RowFormAC';
import { request } from '../../../utils/arqPlataformAxios';
import { readMatrizExcel } from '../../../services/spreadsheetService';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { createProjectService, updateProjectService } from "../../../services/projectsService";
import { addProject, setProjects } from "../../../redux/projects/projectSlice";
import { createThumbnail } from "./createThumbnail";
import Preview3D from "../../Builder/Plan3D/Preview3D";

const NewProjectForm = forwardRef(({ data, handleClose, handleShow, school }, ref) =>  {
	const id = useSelector((state) => state.auth.uid);
	const [rows, setRows] = useState(data?.puntos ? JSON.parse(data?.puntos) : [{ ...defaultState, vertice: "P1" }].concat({ ...defaultState, vertice: "P2" }).concat({ ...defaultState, vertice: "P3" }));
	const [rowsAC, setRowsAC] = useState(data?.ambientes ? JSON.parse(data?.ambientes) : []);
	const [tipo, setTipo] = useState(data?.sublevel || "unidocente");
	const [zone, setZone] = useState(data?.zone);
	const [aulaInicial, setAulaInicial] = useState(data?.aforo ? JSON.parse(data?.aforo).aulaInicial : 0);
	const [aforoPrimaria, setAforoPrimaria] = useState(data?.aforo ? JSON.parse(data?.aforo).aforoPrimaria : 0);
	const [aforoSecundaria, setAforoSecundaria] = useState(data?.aforo ? JSON.parse(data?.aforo).aforoSecundaria : 0);
	const [aforoInicial, setAforoInicial] = useState(data?.aforo ? JSON.parse(data?.aforo).aforoInicial : 0);
	const [aulaPrimaria, setAulaPrimaria] = useState(data?.aforo ? JSON.parse(data?.aforo).aulaPrimaria : 0);
	const [aulaSecundaria, setAulaSecundaria] = useState(data?.aforo ? JSON.parse(data?.aforo).aulaSecundaria : 0);
	const x = {
		...(data && JSON.parse(data.build_data)),
		levels: data && JSON.parse(data.level),
		stairs: data && JSON.parse(data.stairs),
		toilets_per_student: data && JSON.parse(data.toilets_per_student)
	}
	const [dataExcel, setDataExcel] = useState(x);
	const [inicial, setInicial] = useState(data?.aforo ? !!JSON.parse(data?.aforo).aforoInicial : false);
	const [primaria, setPrimaria] = useState(data?.aforo ? !!JSON.parse(data?.aforo).aforoPrimaria : false);
	const [secundaria, setSecundaria] = useState(data?.aforo ? !!JSON.parse(data?.aforo).aforoSecundaria : false);
	const [zonas, setZonas] = useState();
	const [step, setStep] = useState(1);
	const [plantillas, setPlantillas] = useState([]);
	const location = useLocation();
	const slug = location.pathname.split('/')[2];
	const [createdProject, setCreatedProject] = useState();

	const dispatch = useDispatch();

	const getTypeProject = async () => {
		const data = await request({ url: `/api/v1/typeProject/${slug}`, method: 'GET' });
		setPlantillas(data.data[0])
	}

	useEffect(() => {
		getTypeProject();
		return () => handleShow({ show: true });
	}, []);

	const initialValues = {
		name: "",
		tipologia: data?.tipologia || "",
		ubication: data?.ubication || "",
		distrito: data?.distrito || "",
		client: data?.client || "",
		manager: data?.manager || "",
		zone: data?.zone || "",
		parent_id: data?.parent_id == 0 ? data.id : data?.parent_id || 0,
		capacity: 0,
		student: 0,
		room: 0,
		height: 0,
		width: 0,
		type_id: data?.type_id || 1,
		coordenadas: "",
	}

	//Obtener las zonas desde el api
	const getZones = async () => {
		const data = await request({ url: '/api/v1/zones', method: 'GET' });
		setZonas(data.data.zones);
	}

	useEffect(() => {
		getZones();
	}, []);

	// Leer el excel y colocar en la columna de aulas
	useEffect(() => {
		if (dataExcel) {
			if (dataExcel.levels) {
				for (var key of Object.keys(dataExcel.levels)) { // cambiar
					if (key === "inicial") {
						setAforoInicial(dataExcel.levels[key].aforo);
						setAulaInicial(dataExcel.levels[key].aulas);
						setInicial(true);
					}
					else if (key === "primaria") {
						setAforoPrimaria(dataExcel.levels[key].aforo);
						setAulaPrimaria(dataExcel.levels[key].aulas);
						setPrimaria(true);
					}
					else if (key === "secundaria") {
						setAforoSecundaria(dataExcel.levels[key].aforo);
						setAulaSecundaria(dataExcel.levels[key].aulas);
						setSecundaria(true);
					}
				}
			}
		}
	}, [dataExcel])

	// Se agrega automaticamente el lado y el vertice segun se agregue nuevo campo
	for (let index = 0; index < rows.length; index++) {
		rows[index].vertice = `P${index + 1}`;
		rows[index].lado = `P${index + 1} - P${index + 2}`;
	}

	const handleOnChange = (index, name, value) => {
		const copyRows = [...rows];
		copyRows[index] = {
			...copyRows[index],
			[name]: value
		};
		setRows(copyRows);
	}

	const handleOnChangeAC = (index, name, value) => {
		const copyRowsAC = [...rowsAC];
		copyRowsAC[index] = {
			...copyRowsAC[index],
			[name]: value
		}
		setRowsAC(copyRowsAC);
	}

	const handleOnAdd = () => {
		var ultimo = rows.length;
		if (rows[ultimo - 1].lado === "P" + ultimo + " - P" + (ultimo + 1)) {
			setRows([...rows, { ...defaultState, lado: `P${ultimo + 1} - P${ultimo + 2}`, vertice: `P${ultimo + 1}`, }]);
		}
	}

	const handleOnAddAC = (ambiente) => {
		const verificador = rowsAC.find((item) => item.ambienteComplementario === ambiente);
		if (!verificador && ambiente !== "") {
			setRowsAC([...rowsAC, { capacidad: 0, ambienteComplementario: ambiente }]);
		}
	}

	const handleOnRemove = index => {
		const copyRows = [...rows];
		copyRows.splice(index, 1);
		setRows(copyRows);
	}

	const handleOnRemoveAC = index => {
		const copyRowsAC = [...rowsAC];
		copyRowsAC.splice(index, 1);
		setRowsAC(copyRowsAC);
	}

	const Select = ({ label, ...props }) => {
		const [field, meta] = useField(props);

		return (
			<div>
				<label htmlFor={props.id || props.name}>{label}</label>
				<select {...field} onChangeCapture={(evt) => setZone(evt.target.value)} {...props} />
				{meta.touched && meta.error ? (
					<div style={styleError}>{meta.error}</div>
				) : null}
			</div>
		)
	}

	const allDataAforo = {
		aforoInicial: aforoInicial,
		aulaInicial: aulaInicial,
		aforoPrimaria: aforoPrimaria,
		aulaPrimaria: aulaPrimaria,
		aforoSecundaria: aforoSecundaria,
		aulaSecundaria: aulaSecundaria,
	}

	const onSubmit = async (values) => {
		let levels = [];

		aulaInicial && levels.push("Inicial");
		aulaPrimaria && levels.push("Primaria");
		aulaSecundaria && levels.push("Secundaria");

		console.log("dataExcel", dataExcel);
		console.log("values:", values);

		const dataComplete = {
			...values,
			build_data: JSON.stringify({
				classroom_measurements: dataExcel.classroom_measurements,
				result_data: dataExcel.result_data,
				construction_info: dataExcel.construction_info
			}),
			toilets_per_student: JSON.stringify(dataExcel.toilets_per_student),
			stairs: JSON.stringify(dataExcel.stairs),
			ubication: values.ubication,
			level: JSON.stringify(levels),
			puntos: JSON.stringify(rows),
			aforo: JSON.stringify(allDataAforo),
			ambientes: JSON.stringify(rowsAC),
			sublevel: tipo,
			// coordenadas: coordenadas,
			coordenadas: document.getElementById("coordenadas").value,
			user_id: id,
			type_id: plantillas?.id,
		}

		const data = await createProjectService(dataComplete);

		// cuando se crea un nuevo projecto y su version 1 (automaticamente)
		console.log(data.data.project.parent_id)
		if (data.data.project.parent_id === 0) {
			const dataHijo = await createProjectService({
				...dataComplete,
				parent_id: data.data.project.id,
				name: "VERSION 1" 
			});

			if (!!dataHijo.data.project) {
				createThumbnail(dataHijo.data.project.id);
				dispatch(addProject({ parent: data.data.project, child: dataHijo.data.project }));
				setCreatedProject(dataHijo.data.project);
				setStep(2);

				handleShow({ show: false, id: dataHijo.data.project.id });
			}
		}
		// cuando se crea una nueva version desde una projecto existente
		else {
			createThumbnail(data.data.project.id);
			dispatch(addProject({ child: data.data.project }));
			setCreatedProject(data.data.project);
			setStep(2);

			handleShow({ show: false, id: data.data.project.id });
		}
	}

	const handleChange = (event) => {
		setTipo((event.target.value));
	}

	const onImportExcel = async (file, handleToggleLoading, handleClose) => {
		if (!zone) return { error: true, message: "Se debe seleccionar una zona  -  test" }
		if (!inicial && !primaria && !secundaria) return { error: true, message: "Se debe seleccionar al menos un nivel  -  test" }

		var levels = [];

		if (inicial) levels.push("inicial");
		if (primaria) levels.push("primaria");
		if (secundaria) levels.push("secundaria");

		const data = JSON.stringify({
			zone,
			levels,
			type: tipo
		});

		handleClose();
		handleToggleLoading();

		const res = await readMatrizExcel(file, data);
		setDataExcel(res.data);

		handleToggleLoading();
		return { error: false, message: "" }
	}

	return (
		<>
			{step === 1 &&
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
				innerRef={ref}
			>
				{({ errors, touched, ...rest }) => {
					return (
						<Form>
							<Grid container spacing={{ xs: 2, sm: 3 }}>
								<Grid item xs={12}>
									<span>NOMBRE:</span>
									<Field
										type="text"
										name="name"
										placeholder={`${data?.name ? data.name : "Ingrese nombre del proyecto"}`}
										autoComplete="off"
										style={{ ...styleInput, marginTop: ".5rem" }}
									/>
									{touched.name ? (
										<div style={styleError}>{errors.name}</div>
									) : null}
									{/* <ErrorMessage name="email" component="div" /> */}
								</Grid>
								<Grid item xs={12} sm={6}>
									<span>TIPOLOGIA</span>
									<Field
										type="text"
										name="tipologia"
										autoComplete="off"
										style={{ ...styleInput, marginTop: ".5rem" }}
									/>
									{touched.tipologia ? (
										<div style={styleError}>{errors.tipologia}</div>
									) : null}
								</Grid>

								<Grid item xs={12} sm={6}>
									<Select style={styleInput} name="zone" label="ZONA" >
										<option value="">Seleccione una zona</option>
										{zonas?.map(zona => (
											<option key={zona.id} value={zona.name}>{UpperLowerCase(zona.name)}</option>
										))}
									</Select>
								</Grid>

								<Grid item xs={6}>
									<span>NIVEL:</span>
									<div
										role="group"
										style={{ display: "flex", flexDirection: "column" }}
									>
										<label>
											<Checkbox checked={inicial} onClick={() => setInicial(!inicial)} />
											Inicial
										</label>
										<label>
											<Checkbox checked={primaria} onClick={() => setPrimaria(!primaria)} />
											Primaria
										</label>
										<label>
											<Checkbox checked={secundaria} onClick={() => setSecundaria(!secundaria)} />
											Secundaria
										</label>
									</div>
								</Grid>

								<Grid item xs={6}>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue="female"
										name="radio-buttons-group"
										onChange={handleChange}
										value={tipo}
									>
										<FormControlLabel value="unidocente" control={<Radio />} label="UNIDOCENTE" />
										<FormControlLabel value="polidocente multigrado" control={<Radio />} label="POLIDOCENTE MULTIGRADO" />
										<FormControlLabel value="polidocente completo" control={<Radio />} label="POLIDOCENTE COMPLETO" />
									</RadioGroup>
								</Grid>

								{(inicial || primaria || secundaria) && (
									<Grid item xs={12}>
										<Grid container mb=".5rem" alignItems="center">
											<Grid item xs={4} textAlign="center">
												<span>GRADO</span>
											</Grid>
											<Grid item xs={4} textAlign="center">
												<span>AFORO POR GRADO</span>
											</Grid>
											<Grid item xs={4} textAlign="center">
												<span>CANTIDAD DE AULAS</span>
											</Grid>
										</Grid>
										{inicial && (nivelGrid("INICIAL", aforoInicial, aulaInicial))}
										{(primaria) > 0 && (nivelGrid("PRIMARIA", aforoPrimaria, aulaPrimaria))}
										{(secundaria) > 0 && (nivelGrid("SECUNDARIA", aforoSecundaria, aulaSecundaria))}
									</Grid>
								)}
								
								<FileButtonModal onImportExcel={onImportExcel} />

								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={2}>
											<Typography noWrap>VÉRTICE</Typography>
										</Grid>
										<Grid item xs={3} sm={2}>
											<span>LADO</span>
										</Grid>
										<Grid item xs={2}>
											<span>DIST.</span>
										</Grid>
										<Grid item xs={2} zeroMinWidth>
											<Typography noWrap>ÁNGULO</Typography>
										</Grid>
										<Grid item xs={2}>
											<Typography noWrap>RETIROS</Typography>
										</Grid>

										{rows.map((row, index) => (
											<RowForm
												{...row}
												onChange={(name, value) => handleOnChange(index, name, value)}
												onRemove={() => handleOnRemove(index)}
												key={index}
												disabledDeleted={index}
												error={errors.rows && errors.rows[index]}
											/>
										))}
										<Button sx={{ marginTop: "1rem" }} variant='outlined' onClick={handleOnAdd}>Agregar</Button>
									</Grid>								
								</Grid>

								<Grid item xs={12} my="1rem">
									<Grid container rowSpacing={1}>
										<Grid item xs={5}>
											<span>{!!rowsAC.length && "AMBIENTES COMPLEMENTARIOS"}</span>
										</Grid>
										<Grid item xs={3}>
											<span>{!!rowsAC.length && "AFORO MAXIMO"}</span>
										</Grid>
										{rowsAC.map((row, index) => (
											<RowFormAC
												{...row}
												onChange={(name, value) => handleOnChangeAC(index, name, value)}
												onRemove={() => handleOnRemoveAC(index)}
												key={index}
												disabledDeleted={index}
											/>
										))}
										<Grid item xs={12}>
											<span>Seleccionar ambientes complementarios</span>
											<select
												style={{ ...styleInput, marginTop: ".5rem" }}
												onChange={(e) => handleOnAddAC(e.target.value)}
											>
												<option value="">Seleccione</option>
												{ambientesComplementarios?.map(ambiente => (
													<option
														key={ambiente.ambienteComplementario}
														value={ambiente.ambienteComplementario}
													>
														{UpperLowerCase(ambiente.ambienteComplementario)}
													</option>
												))}
											</select>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12} sm={6}>
									<span>PROVINCIA:</span>
									<Field style={styleInput} type="text" name="ubication" />
									{errors.ubication && touched.ubication ? (
										<div style={styleError}>{errors.ubication}</div>
									) : null}
									{/* <ErrorMessage name="email" component="div" /> */}
								</Grid>

								<Grid item xs={12} sm={6}>
									<span>DISTRITO:</span>
									<Field style={styleInput} type="text" name="distrito" />
									{errors.distrito && touched.distrito ? (
										<div style={styleError}>{errors.distrito}</div>
									) : null}

									{/* <ErrorMessage name="email" component="div" /> */}
								</Grid>

								<Grid item xs={12} sm={6}>
									<span>RESPONSABLE:</span>
									<Field style={styleInput} type="text" name="manager" />
									{errors.manager && touched.manager ? (
										<div style={styleError}>{errors.manager}</div>
									) : null}
									{/* <ErrorMessage name="email" component="div" /> */}
								</Grid>

								<Grid item xs={12} sm={6}>
									<span>CLIENTE:</span>
									<Field style={styleInput} type="text" name="client" />
									{errors.client && touched.client ? (
										<div style={styleError}>{errors.client}</div>
									) : null}
									{/* <ErrorMessage name="email" component="div" /> */}
									
								</Grid>

								<MapCoordinates data={data} />
							</Grid>
						</Form>
					)
				}}
			</Formik>
			}
			{step === 2 &&
				<>
					<div style={{ padding: "3rem 5rem" }}>
						<div style={{ minWidth: 300 }}>
							<img src={`/images/${imageToAulas(aforoInicial, aforoPrimaria, aforoSecundaria)}`} alt="img" style={{ width: "100%" }} />
						</div>
					</div>
					<div style={{ width: "450px", height: "300px", position: "absolute", visibility: "hidden" }}>
						<Preview3D school={school} state={createdProject} isNew />
					</div>
				</>
			}
		</>
	)
})

function MapCoordinates({ data }) {
	const [coordenadas, setCoordenadas] = useState(data?.coordenadas || "");

	return (
		<>
			<Grid item xs={12}>
				<iframe
					src={`https://maps.google.com/?ll=${coordenadas}&z=16&t=m&output=embed`}
					height="100%" width="100%" style={{ border: 0 }} allowFullScreen
				/>
			</Grid>

			<Grid item xs={12}>
				<span>Coordenadas:</span>
				<Field
					id="coordenadas"
					style={styleInput}
					type="text"
					value={coordenadas}
					onChange={e => setCoordenadas(e.target.value)} name="coordenadas"
					required
				/>
			</Grid>
		</>
	)
}

const nivelGrid = (label, aforo, aula) => {
	return (
		<Grid container spacing={2} marginBottom="1rem">
			<Grid item xs={4}>
				<Field style={{ ...styleInput, textAlign: "center", fontSize: "14px" }} type="text" value={label} disabled />
			</Grid>
			<Grid item xs={4}>
				<Field style={{ ...styleInput, textAlign: "center", fontSize: "14px" }} value={aforo} disabled />
			</Grid>
			<Grid item xs={4}>
				<Field style={{ ...styleInput, textAlign: "center", fontSize: "14px" }} value={aula} disabled />
			</Grid>
		</Grid>
	)
}

const defaultState = {
	vertice: "",
	lado: "",
	dist: 0,
	angulo: 0,
	retiros: 0
}

export const styleInput = {
	width: "100%",
}
const styleError = {
	color: "red",
	marginTop: "0.25rem",
}

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'white',
	borderRadius: '10px',
	boxShadow: 24,
	width: "400px",
	p: 4,
	"@media (max-width: 768px)": {
		width: "auto",
	}
}

const ambientesComplementarios = [
	{ capacidad: 0, ambienteComplementario: "Aula" },
	{ capacidad: 0, ambienteComplementario: "Laboratorio" },
	{ capacidad: 0, ambienteComplementario: "Sala de Clases" },
	{ capacidad: 0, ambienteComplementario: "Sala de Juntas" },
	{ capacidad: 0, ambienteComplementario: "Sala de Reuniones" },
	{ capacidad: 0, ambienteComplementario: "Sala de Trabajo" }
]

const validationSchema = yup.object({
	name: yup.string().required('El nombre es requerido'),
	tipologia: yup.string().required('La tipologia es requerida'),
	ubication: yup.string().required('La ubicacion es requerida'),
	distrito: yup.string().required('El distrito es requerido'),
	client: yup.string().required('El cliente es requerido'),
	manager: yup.string().required('El responsable es requerido'),
	zone: yup.string().required('La zona es requerida'),
	parent_id: yup.number().required('El padre es requerido'),
	capacity: yup.number().required('La capacidad es requerida'),
	student: yup.number().required('La capacidad de estudiantes es requerida'),
	room: yup.number().required('La capacidad de aulas es requerida'),
	height: yup.number().required('La altura es requerida'),
	width: yup.number().required('La anchura es requerida'),
	// coordenadas: yup.string().required('Las coordenadas son requeridas'),
	//array de objetos
	rows: yup.array().of(
		yup.object().shape({
			vertice: yup.string().required('El vertice es requerido'),
			lado: yup.string().required('El lado es requerido'),
			distancia: yup.string().required('La distancia es requerida'),
			angulo: yup.string().required('El angulo es requerido'),
			retiros: yup.string().required('Los retiros son requeridos'),
		})
	)
}).defined();

const imageToAulas = (aforoInicial, aforoPrimaria, aforoSecundaria) => {
	if (aforoInicial > 0 && aforoPrimaria > 0 && aforoSecundaria > 0) {
		return "inicial_primaria_secundaria.png"
	}
	if (aforoInicial > 0 && aforoPrimaria > 0) {
		return "inicial_primaria.png"
	}
	if (aforoInicial > 0 && aforoSecundaria > 0) {
		return "primaria_secundaria.png"
	}
	if (aforoPrimaria > 0 && aforoSecundaria > 0) {
		return "primaria_secundaria.png"
	}
	if (aforoInicial > 0) {
		return "inicial.png"
	}
	if (aforoPrimaria > 0) {
		return "primaria.png"
	}
	if (aforoSecundaria > 0) {
		return "secundaria.png"
	}
	if (!aforoPrimaria && !aforoSecundaria && !aforoInicial) {
		return "secundaria.png"
	}
}

const FileButtonModal = ({ onImportExcel }) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleToggleLoading = () => setLoading(prev => !prev);

	const handleChange = async (evt) => {
		const { error, message } = await onImportExcel(evt.target.files[0], handleToggleLoading, handleClose);
// updateProjectService(12, evt.target.files[0])
		if (error) {
			handleClose();
			return alert(message);
		}

		handleClose();
	}

	return (
		<>
			{loading
				? <Grid item xs={12}><LinearProgress color="secondary" /></Grid>
				: null
			}
			<Grid item>
				<Button variant="contained" color="primary" onClick={handleOpen}>
					Excel
				</Button>
			</Grid>
			

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
			>
				<Fade in={open}>
					<Box sx={styleModal}>
						<Grid container spacing={2} >
							<Grid item xs={12} lg={4}>
								<h2>Adjuntar archivo:</h2>
							</Grid>
							<Grid item xs={12} lg={8}>
								<input
									type="file"
									accept=".xlsx, .xls"
									onChange={handleChange}
									style={{ display: "none" }}
									id="button_file"
								/>
								<label htmlFor="button_file">
									<Button variant="outlined" component="span" style={{ width: "200px" }}>
										Subir
									</Button>
								</label>
							</Grid>
							<Grid item xs={12} lg={8} >
								<a href="/descargas/template_project.xlsx" download="Plantilla del Proyecto.xlsx">
									<Button variant="contained" color="primary" style={{ width: "200px" }}>
										Descargar Plantilla
									</Button>
								</a>
							</Grid>

							<Grid item xs={12} lg={4} >
								<Button variant="outlined" color="primary" style={{ width: "100px" }} onClick={handleClose}>
									Cerrar
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Fade>
			</Modal>
		</>
	)
}

export default NewProjectForm;
