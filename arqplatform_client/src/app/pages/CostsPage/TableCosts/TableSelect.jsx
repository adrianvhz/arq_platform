import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "@mui/material/styles/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MuiRadio from '@mui/material/Radio';

function createData(categoria, muros_y_columnas, techos, puertas_y_ventanas, revestimientos, banos, instalaciones, desc) {
	return {
		categoria,
		muros_y_columnas,
		techos,
		puertas_y_ventanas,
		revestimientos,
		banos,
		instalaciones,
	}
}

// const rows = [
// 	createData("A", 588.68, 357.54, 319.48, 344.34, 116.20, 341.50),
// 	createData("B", 379.54, 233.27, 168.39, 260.90, 88.35, 249.34),
// 	createData("C", 261.26, 192.72, 108.84, 193.54, 61.29, 157.30),
// 	createData("D", 252.64, 122.32, 95.33, 148.50, 32.70, 99.37),
// 	createData("E", 177.86, 45.60, 81.57, 102.17, 19.23, 72.17),
// 	createData("F", 133.95, 25.08, 61.24, 72.02, 14.32, 41.29),
// 	createData("G", 78.92, 17.24, 33.08, 59.05, 9.85, 38.29),
// 	createData("H", 0, 0, 16.54, 23.62, 0, 20.68),
// 	createData("I", 0, 0, 0, 0, 0, 0)
// ];
  
const rows = [
	createData("A", "Estructuras laminares curvadas de concreto armado que incluyen en una sola armadura la cimentación y el techo. Para este caso no se considera los valores de la columna Nº2.", "Losa o aligerado de concreto armado con luces mayores de 6m. Con sobrecarga mayor a 300 kg/m2.", "Aluminio pesado con perfiles especiales. Madera fina ornamental (caoba, cedro o pino selecto). Vidrio insulado (1)", "Mármol importado, madera fina (caoba o similar), baldosa acústica en techo o similar.", "Baños completos (7) de lujo importado con enchape fino (mármol o similar).", "Aire acondicionado, ilu- minación especial, ventilación forzada, sist. hidroneumático, agua caliente y fría, intercomunicador alarmas, ascensor, sist. de bombeo de agua y desague (5), teléfono, gas natural."),
	createData("B", "Columnas, vigas y/o placas de concreto armado y/o metálicas.", "Aligerados o losas de concreto armado inclinadas.", "Aluminio o madera fina (caoba o similar) de diseño especial, vidrio polarizado (2) y curvado, laminado otemplado.", "Mármol nacional, madera fina (caoba o similar) enchapes en techos.", "Baños completos (7) importados con mayólica o cerámico decorativo importado.", "Sistemas de bombeo de agua potable (5), ascensor, teléfono, agua caliente y fría, gas natural."),
	createData("C", "Placas de concreto (e=10 a 15 cm), alba- ñilería armada, ladrillo o similar con columna y vigas de amarre de concreto armado.", "Aligerado o losas de concreto armado horizontales.", "Aluminio o madera fina (caoba o similar), vidrio tratado polarizado (2), laminado o templado.", "Superficie caravista obtenida mediante encofrado especial, enchape en techos.", "Baños completos (7) nacionales con mayólica o cerámico nacional de color.", "Igual al Punto 'B' sin ascensor."),
	createData("D", "Ladrillo o similar sin elementos de concreto armado. Drywall o similar incluye techo (6)", "Calamina metálica, fibrocemento sobre viguería metálica.", "Ventanas de aluminio, puertas de madera selecta, vidrio tratado transparente (3).", "Enchape de madera o laminados, piedra o material vitrificado.", "Baños completos (7) nacionales blancos con mayólica blanca.", "Agua fría, agua caliente, corriente trifásica teléfono, gas natural."),
	createData("E", "Adobe, tapial o quincha.", "Madera con material impermeabilizante.", "Ventanas de fierro, puertas de madera selecta (caoba o similar), vidrio transparente (4)", "Superficie de ladrillo caravista.", "Baños con mayólica blanca, parcial.", "Agua fría, agua caliente, corriente monofásica, teléfono, gas natural."),
	createData("F", "Madera (estoraque, pumaquiro, huayruro, machinga, catahua amarilla, copaiba, diablo fuerte, tornillo o similares). Drywall o similar (sin techo)", "Calamina metálica, fibrocemento o teja sobre viguería de madera corriente.", "Ventanas de fierro o aluminio industrial, puertas contraplacadas de madera (cedro o similar), puertas material MDF o HDF, vidrio simple", "Tarrajeo frotachado y/o yeso moldurado, pintura lavable.", "Baños blancos sin mayólica.", "Agua fría, corriente monofásica, gas natural."),
	createData("G", "Pircado con mezcla de barro.", "Madera rústica o caña con torta de barro.", "Madera corriente con marcos en puertas y ventanas de pvc o madera corriente.", "Estucado de yeso y/o barro, pintura al temple o al agua.", "Sanitarios básicos de losa de  2da., fierro  fundido o granito.", "Agua fría, corriente monofásica, teléfono."),
	createData("H", "", "Sin techo.", "Madera rústica.", "Pintado en ladrillo rústico, placa de concreto o similar.", "Sin aparatos sanitarios.", "Agua fría, corriente monofásica sin empotrar"),
	createData("I", "", "", "Sin puertas ni ventanas.", "Sin revestimientos en ladrillo, adobe o similar.", "", "Sin instalación eléctrica ni sanitaria.")
];

export default function TableSelect({ project, categories }) {
	const [selectedCategories, setSelectedCategories] = useState({ ...categories });

	const handleChange = (evt) => {
		setSelectedCategories({
			...selectedCategories,
			[evt.target.name]: evt.target.value
		});
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 890, borderCollapse: "separate", borderSpacing: 3 }}>
				<TableHead>
					<TableRow>
						<StyledTableCell align="center" rowSpan={2}>CATEGORIA</StyledTableCell>
						<StyledTableCell align="center" colSpan={2}>ESTRUCTURAS</StyledTableCell>
						<StyledTableCell align="center" colSpan={3}>ACABADOS</StyledTableCell>
						<StyledTableCell align="center" rowSpan={2} sx={{ maxWidth: "210px" }}>INSTALACIONES. ELECT. Y SANT.</StyledTableCell>
					</TableRow>
					<TableRow>
						<StyledTableCell align="center">MUROS Y COLUMNAS</StyledTableCell>
						<StyledTableCell align="center">TECHOS</StyledTableCell>
						<StyledTableCell align="center">PUERTAS Y VENTANAS</StyledTableCell>
						<StyledTableCell align="center">REVESTIMIENTOS</StyledTableCell>
						<StyledTableCell align="center">BAÑOS</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, i) => (
					<StyledTableRow key={i} onClick={(evt) => evt.target.children[0].click()}>
						<StyledTableCell component="th" scope="row" align="center">
							<span>{row.categoria}</span>
						</StyledTableCell>
						<StyledTableCell align="center">
							<Radio
								name="muros_y_columnas"
								value={row.categoria}
								checked={selectedCategories.muros_y_columnas === row.categoria}
								onChange={handleChange}
								disabled={!row.muros_y_columnas}
							/>
							<Typography maxWidth="140px" fontSize="0.9rem">
								{row.muros_y_columnas}
							</Typography>
						</StyledTableCell>
						<StyledTableCell align="center">
							<Radio
								type="radio"
								name="techos"
								value={row.categoria}
								checked={selectedCategories.techos === row.categoria}
								onChange={handleChange}
								disabled={!row.techos}
							/>
							<Typography maxWidth="140px" fontSize="0.9rem">
								{row.techos}
							</Typography>
						</StyledTableCell>
						<StyledTableCell align="center">
							<Radio
								type="radio"
								name="puertas_y_ventanas"
								value={row.categoria}
								checked={selectedCategories.puertas_y_ventanas === row.categoria}
								onChange={handleChange}
								disabled={!row.puertas_y_ventanas}
							/>
							<Typography maxWidth="140px" fontSize="0.9rem">
								{row.puertas_y_ventanas}
							</Typography>
						</StyledTableCell>
						<StyledTableCell align="center">
							<Radio
								type="radio"
								name="revestimientos"
								value={row.categoria}
								checked={selectedCategories.revestimientos === row.categoria}
								onChange={handleChange}
								disabled={!row.revestimientos}
							/>
							<Typography maxWidth="140px" fontSize="0.9rem">
								{row.revestimientos}
							</Typography>
						</StyledTableCell>
						<StyledTableCell align="center">
							<Radio
								type="radio"
								name="banos"
								value={row.categoria}
								checked={selectedCategories.banos === row.categoria}
								onChange={handleChange}
								disabled={!row.banos}
							/>
							<Typography maxWidth="140px" fontSize="0.9rem">
								{row.banos}
							</Typography>
						</StyledTableCell>
						<StyledTableCell align="center">
							<Radio
								type="radio"
								name="instalaciones"
								value={row.categoria}
								checked={selectedCategories.instalaciones === row.categoria}
								onChange={handleChange}
								disabled={!row.instalaciones}
							/>
							<Typography maxWidth="140px" fontSize="0.9rem">
								{row.instalaciones}
							</Typography>
						</StyledTableCell>
					</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "rgb(5, 36, 92)",
		padding: 10,
		color: theme.palette.common.white,
		borderBottom: 0,
		[theme.breakpoints.up("sm")]: {
			padding: 14
		}
		// variacion good del blanco = rgba(224, 224, 224, 1)
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		padding: 10,
		[theme.breakpoints.up("sm")]: {
			padding: 14
		}
	}
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		borderBottom: 0
	}
}));

const Radio = styled(MuiRadio)(({ theme }) => ({
	color: "rgba(14, 100, 184, 0.4)",
	'&.Mui-checked': {
		color: "rgba(14, 100, 184, 1)",
	}
}));










{/* <ul>
  <li>
    <input type="radio" id="f-option" name="selector" />
    <label for="f-option">Pizza</label>
    
    <div class="check"></div>
  </li>
  
  <li>
    <input type="radio" id="s-option" name="selector" />
    <label for="s-option">Bacon</label>
    
    <div class="check"><div class="inside"></div></div>
  </li>
  
  <li>
    <input type="radio" id="t-option" name="selector" />
    <label for="t-option">Cats</label>
    
    <div class="check"><div class="inside"></div></div>
  </li>
</ul> */}