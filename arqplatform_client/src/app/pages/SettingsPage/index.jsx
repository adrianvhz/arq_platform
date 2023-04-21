import { useState, useRef } from "react"
import { updateCostsReference } from "../../../services/projectsService"
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from '@mui/material/TextField';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FunctionsIcon from '@mui/icons-material/Functions';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
// import DataArrayIcon from '@mui/icons-material/DataArray';

export function SettingsPage() {
	const [value, setValue] = useState(0);

	const handleChange = (evt, newValue) => {
		setValue(newValue);
	}

	const inputRef = useRef(null);

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const res = await updateCostsReference(inputRef.current.files[0]);
		console.log(res);
	}

	return (
		<div>
			<p style={{ fontSize: "1.3em" }}>Configuracion</p>

			<div  style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs value={value} onChange={handleChange}>
						<Tab label="Item One" sx={{ textTransform: "none" }} id="settings-tab-1" />
						<Tab label="Item Two" sx={{ textTransform: "none" }} id="settings-tab-2" />
						<Tab label="Item Three" sx={{ textTransform: "none" }} id="settings-tab-3" />
					</Tabs>
				</Box>

				<Card sx={{ borderRadius: "5px"}}>
					<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
						<Box p="2rem">
							<div style={{ display: "flex", alignItems: "center" }}>
								<Avatar sx={{ width: 30, height: 30 }}>
									<FunctionsIcon />
								</Avatar>
								<span>Importar plantilla calculo de aforo</span>
								<input
									type="file"
									// onChange={() => {}}
									style={{ display: "none" }}
									id="update-btn"
								/>
								<label htmlFor="update-btn">
									<Button variant="contained" component="span">
										SUBIR
									</Button>
								</label>
							</div>
							<div>
								<span>Importar matriz de calculo</span>
								<input
									type="file"
									// onChange={() => {}}
									style={{ display: "none" }}
									id="update-btn"
								/>
								<label htmlFor="update-btn">
									<Button variant="contained" component="span">
										SUBIR
									</Button>
								</label>
							</div>
							
						</Box>
							{/* </div> */}

						{/* <input name="my-file" type="file" ref={inputRef} /> */}
						{/* <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
						<TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
						<button type="submit">send</button> */}
					</form>
				</Card>
			</div>
		</div>
	)
}

