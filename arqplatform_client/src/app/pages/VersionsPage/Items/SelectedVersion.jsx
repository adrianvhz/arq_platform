import { Link as RouterLink } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import getConstructionData from "../../../../utils/getConstructionData";
// import View3D from "../BuildViews/View3D";
// import View2D from "../BuildViews/View2D";
import Plan3D from "../../../Builder/Plan3D/Plan3D";
import Preview3D from "../../../Builder/Plan3D/Preview3D";

export default function SelectedVersion({ selectedVersion, school }) {
	if (!selectedVersion) return null;
	console.log(selectedVersion);

	return (
		<Grid item xs={12}>
			<Grid container spacing={{ xs: 1.5, sm: 2 }}>
				<Grid item xs={12}>
				{selectedVersion
					? (
						<StyledPaper>
							<Typography fontWeight={500} ml={6}  flex="1" lineHeight={2}>{selectedVersion.name}</Typography>
							<RouterLink to={"/proyecto/colegios/" + selectedVersion.id}>
								<Button
									variant="contained"
									size="small"
									endIcon={<OpenInNewIcon />}
								>
									Ver
								</Button>
							</RouterLink>
						</StyledPaper>
					)
					: <Skeleton animation="wave" sx={{ padding: "16px 0" }} height="100%" variant="rounded" />
				}
				</Grid>
				<Grid item xs={12} xl={6}>
					<div style={{ height: "100%", minHeight: "500px" }}>
						{/* {selectedVersion
							// ? <View3D selectedVersion={selectedVersion} />
							? <Plan3D
								result_data={result_data}
								classroom_measurements={classroom_measurements}
								construction_info={construction_info}
								bathrooms={bathrooms}
								data={data}
								view={{ view: "3D", roof: true }}
								school={school}
							/>
							: <Skeleton animation="wave" variant="rectangular" height="100%" />
						} */}
						{selectedVersion
							? (
								<Preview3D school={school} state={selectedVersion} />
							)
							: <Skeleton animation="wave" variant="rectangular" height="100%" />
						}
					</div>
				</Grid>
				<Grid item xs={12} xl={6}>
					<div style={{ height: "100%", minHeight: "500px" }}>
						{/* {selectedVersion
							? <Plan3D
									result_data={result_data}
									classroom_measurements={classroom_measurements}
									construction_info={construction_info}

									bathrooms={bathrooms}
									data={data}
									view={{ view: "2D", roof: true }}
									aspect={1}

									school={school}
								/>
							: <Skeleton animation="wave" variant="rectangular" height="100%" />
						} */}
					</div>
				</Grid>
			</Grid>
		</Grid>
	)
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
	display: "flex",
	justifyContent: "space-between",
    backgroundColor: "#dfdfdf",
	padding: "4px 5px",
    textAlign: 'center',
	boxShadow: "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px"
}));