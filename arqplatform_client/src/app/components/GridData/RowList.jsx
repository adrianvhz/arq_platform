import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import styled from "@mui/material/styles/styled";
import Tooltip from '@mui/material/Tooltip';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MuiIconButton from "@mui/material/IconButton";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NewProject from '../NewProject/NewProject';
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { deleteProjectService } from '../../../services/projectsService';
import Swal from "sweetalert2";
import { deleteProject as deleteProjectReducer } from "../../../redux/projects/projectSlice";
import "./style-swal.css";

export const RowList = ({ row, projects, initialExpand }) => {
	const [show, setShow] = useState(initialExpand);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleToggleShow = () => {
		setShow(!show);
	}
    
    const handleDelete = (id, parentID) => () => {
		Swal.fire({
			focusConfirm: false,
			returnFocus: false,
			focusCancel: false,
			focusDeny: false,
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: "Cancelar",
			confirmButtonText: 'Eliminar'
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteProjectReducer({ id, parentID }));
				deleteProjects(id, parentID);
				Swal.fire(
					"Deleted!",
					"Your project has been deleted.",
					"success"
				)
			}
		})
    }

    return (
        <div>
            {row.parent_id === 0 &&
                <div
                    style={{
                    width: "100%",
                    display: "flex"
                }}>

                    <Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
                        {row.id}
                    </Box>
                    <Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
                        <Icon>{getIcon(row.type_id)}</Icon>
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "180px", width: "20%", cursor: "pointer" }} onClick={handleToggleShow}>
                        <div style={{
                            display: "flex", justifyContent: "space-between",
                        }}>
                            <span>
                                {row.name}
                            </span>
                            {!show ? <KeyboardArrowDownIcon onClick={handleToggleShow} sx={{ cursor: "pointer" }} /> :
                                <KeyboardArrowLeftIcon onClick={handleToggleShow} sx={{ cursor: "pointer" }} />}

                        </div>
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
                        {row.ubication}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "150px", width: "10%" }}>
                        {row.manager}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "90px", width: "15%" }}>
                        {formatDate(row.createdAt)}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
                        {formatDate(row.updatedAt)}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "170px", width: "20%" }}>
                        {row.client}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
						<Tooltip title="Nuevo" arrow disableInteractive>
							<IconButton>
								<NewProject onRow data={row} />
							</IconButton>
						</Tooltip>
						
						<Tooltip title="Compartir" arrow disableInteractive>
							<IconButton>
								<GroupsOutlinedIcon />
							</IconButton>
						</Tooltip>
						
						<Tooltip title="Eliminar" arrow disableInteractive>
							<IconButton onClick={handleDelete(row.id)}>
								<DeleteOutlinedIcon />
							</IconButton>
						</Tooltip>
                    </Box>
                </div>

            }
            {show && projects.map((row2, index) => (
				<div key={index}>
					{row2.parent_id == row.id &&
						<div style={{
							width: "100%",
							display: "flex",
							background: "#F3F6F9"
						}}>

							<Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
								{row2.id}
							</Box>
							<Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
								<Icon>{getIcon(row2.type_id)}</Icon>
							</Box>
							<Box
								sx={{ ...styleGrid, minWidth: "180px", width: "20%", color: "#3699FF", "&:hover": { color: "#005ebf" }, cursor: "pointer" }}
								onClick={() => navigate("/proyecto/colegios/" + row2.id, { state: row2 })}
							>
								{row2.name}
							</Box>
							<Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
								{row2.ubication}
							</Box>
							<Box sx={{ ...styleGrid, minWidth: "150px", width: "10%" }}>
								{row2.manager}
							</Box>
							<Box sx={{ ...styleGrid, minWidth: "40px", width: "15%" }}>
								{formatDate(row2.createdAt)}
							</Box>
							<Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
								{formatDate(row2.updatedAt)}
							</Box>
							<Box sx={{ ...styleGrid, minWidth: "170px", width: "20%" }}>
								{row2.client}
							</Box>
							<Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
								<Tooltip title="Nuevo" arrow disableInteractive>
									<IconButton>
										<NewProject onRow data={row2} />
									</IconButton>
								</Tooltip>

								<Tooltip title="Compartir" arrow disableInteractive>
									<IconButton>
										<GroupsOutlinedIcon />
									</IconButton>
								</Tooltip>

								<Tooltip title="Eliminar" arrow disableInteractive>
									<IconButton onClick={handleDelete(row2.id, row2.parent_id)}>
										<DeleteOutlinedIcon />
									</IconButton>
								</Tooltip>
							</Box>
						</div>
					}
				</div>
			))}
        </div>
    )
}

const IconButton = styled(MuiIconButton)({
	padding: "2px 4px"
});

const formatDate = (date) => {
	return moment(date).format("DD/MM/YYYY");
}

const getIcon = (icon) => {
	switch (icon) {
		case 1:
			return <SchoolOutlinedIcon />
		case 2:
			return <LocalHospitalIcon />
		case 3:
			return <LocationCityIcon />
		default:
			return <SchoolOutlinedIcon />
	}
}

const styleGrid = {
	border: "0.5px solid #AFAFAF",
	width: "100%",
	fontSize: "14px",
	padding: "8px 6px",
	minWidth: "20px"
}

function TooltipS() {
	return (
		<Tooltip title="Add" arrow>
			<Button>Arrow</Button>
		</Tooltip>
	)
}
