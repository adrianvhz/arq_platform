import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlayCamera, setRoof, setColorWall, setColorForLevel, setClassroomsLights } from "../../../../redux/building/buildingSlice";
import styled from "@mui/material/styles/styled";
import MuiButton from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PlayIcon from "@mui/icons-material/PlayCircle";
// import DeleteIcon from "@mui/icons-material/Delete";
// import TextureIcon from "@mui/icons-material/Texture";
// import CopyIcon from "@mui/icons-material/ContentCopy";
// import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
// import CameraIcon from "@mui/icons-material/Camera";
// import DataObjectIcon from "@mui/icons-material/DataObject";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import AreasList from "../../Plan3D/components/AreasList";
import Button3D from "./Buttons/Button3D";
import Button2D from "./Buttons/Button2D";
// import ButtonSave from "./Buttons/ButtonSave";
import "./styles.css";
import Settings from "../Settings/Settings";

export default function ToolsBar({ state, school, view, handleViewState, handleSetClassrooms }) {
	const dispatch = useDispatch();
	
	function baseFn(value) {
		dispatch(setColorWall({ color: value }));
	}
	
	useEffect(() => {
		x();
	}, []);

	const handleColorWall = debounce((value) => baseFn(value));

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				flex: 1
			}}
		>
			<Link
		 		to={"/"}
		 		className="toolbar-logo"
		 	>
		 		ProDesign
		 	</Link>
		 	<select style={{ backgroundColor: "#E4E6EF", margin: "0 2.4rem" }}>
		 		<option>VERSION 1: HOME</option>
		 		<option>ESTRUCTURA</option>
		 	</select>
			<nav className="greedy">{/* width: 100% */}
				<ul className="links">
					<li>
						<Button
							onClick={() => dispatch(setPlayCamera({ isPlayCamera: "play" }))}
						>
							<PlayIcon htmlColor="#3699FF" />&nbsp; Play
						</Button>
					</li>

					<li>
						<Button2D handleViewState={handleViewState} />
					</li>

					<li>
						<Button3D handleViewState={handleViewState} />
					</li>

					{/* <li>
						<Button disabled>
							<DeleteIcon htmlColor="#3699FF" />&nbsp; Eliminar
						</Button>
					</li> */}

					{/* <li>
						<Button disabled>
							<CopyIcon htmlColor="#3699FF" />&nbsp; Copiar
						</Button>
					</li> */}

					<li>
						<Settings
							state={state}
							school={school}
							handleSetClassrooms={handleSetClassrooms}
						/>
					</li>

					{/* <li><Button disabled>REPORTE</Button></li> */}

					<li>
						<select id="select-export" style={{ margin: "0.3rem 0.4rem", backgroundColor: "#E4E6EF" }}>
							<option>EXPORTAR</option>
							<option value="jpeg">Exportar JPEG</option>
							<option value="obj">Exportar OBJ</option>
							<option value="json">Exportar JSON</option>
						</select>
					</li>

					<li>
						<select
							id="select-view"
							style={{ margin: "0.3rem 0.4rem", backgroundColor: "#E4E6EF" }}
							onChange={() => {
								dispatch(setRoof());
							}}
						>
							<option value="1">VISTA COMPLETA</option>
							<option value="2">VISTA MUROS</option>
						</select>
					</li>
					
					{/* <li>
						<Button id="save-jpeg">
							<CameraIcon htmlColor="#3699FF" />
						</Button>
					</li>
					
					<li>
						<Button id="save-obj">
							<DataObjectIcon htmlColor="#3699FF" />
						</Button>
					</li> */}


					
						
					{/* <li>
						<Button>
							<TextureIcon htmlColor="#3699FF" />
						</Button>
					</li> */}

					{/* <li>
						<Button onClick={() => dispatch(setClassroomsLights())}>
							<LightbulbOutlinedIcon htmlColor="#3699FF" />
						</Button>
					</li> */}

					{/* <li>
						<Button
							// onClick={() => dispatch(setRoof())}
							onClick={() => {
								handleViewState({ roof: !view.roof });
							}}
						>
							roof (temp)
						</Button>
					</li> */}

					{/* <li>
						<Button onClick={() => dispatch(setColorForLevel())}>
							level color (temp)
						</Button>
					</li> */}

					{/* <ButtonSave /> */}


					{/* <div style={{}}>
						<input id="color" type="color" name="color_wall" onChange={(evt) => {
							handleColorWall(evt.target.value);
						}} />
						<label htmlFor="color" style={{font: ".7rem "Fira Sans", sans-serif", color: "black"}}>(prototype)</label>
					</div> */}
				</ul>
				<IconButton className="btn-more" disableRipple>
					<MoreHorizIcon />
				</IconButton>
				<ul className="hidden-links hidden"></ul>
			</nav>
		</Box>
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

function debounce(func, timeout = 300){
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => { func.apply(this, args); }, timeout);
	}
}

function x() {
	var $nav = $('nav.greedy');
	var $btn = $('nav.greedy .btn-more');
	var $vlinks = $('nav.greedy .links');
	var $hlinks = $('nav.greedy .hidden-links');

	var numOfItems = 0;
	var totalSpace = 0;
	var breakWidths = [];

	// Get initial state
	$vlinks.children().outerWidth(function(i, w) {
		totalSpace += w;
		numOfItems += 1;
		breakWidths.push(totalSpace);
	});

	var availableSpace, numOfVisibleItems, requiredSpace;

	function check() {
		// Get instant state
		availableSpace = $vlinks.width() - 10;
		numOfVisibleItems = $vlinks.children().length;
		requiredSpace = breakWidths[numOfVisibleItems - 1];

		// There is not enought space
		if (requiredSpace > availableSpace) {
			$vlinks.children().last().prependTo($hlinks);
			numOfVisibleItems -= 1;
			check();
		// There is more than enough space
		} else if (availableSpace > breakWidths[numOfVisibleItems]) {
			$hlinks.children().first().appendTo($vlinks);
			numOfVisibleItems += 1;
		}

		// Update the button accordingly
		$btn.attr("count", numOfItems - numOfVisibleItems);
		if (numOfVisibleItems === numOfItems) {
			$btn.addClass('hidden');
		} else {
			$btn.removeClass('hidden');
		}
	}

	// Window listeners
	// $(window).resize(function() {
	// 	check();
	// });

	window.addEventListener("resize", function() {
		check();
	})

	$btn.on('click', function() {
		$hlinks.toggleClass('hidden');
	});

	check();
}
