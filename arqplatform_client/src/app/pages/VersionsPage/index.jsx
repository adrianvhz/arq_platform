import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import VersionThumbnail from "./Items/VersionThumbnail";
import SelectedVersion from "./Items/SelectedVersion";

export function VersionsPage({ school }) {
	const [selectedVersion, setSelectedVersion] = useState(null);
	
    const params = useParams();
	const prjctParentID = Number(params.id);
	
	const projects = useSelector(state => state.project.projects);
	const versions = projects?.filter(el => el.parent_id === prjctParentID);

	const handleSelectVersion = (version) =>  () => {
		setSelectedVersion(version);
	}
	
	useEffect(() => {
		projects?.length > 0 && setSelectedVersion(versions[0]);
	}, [projects]);

	return (
		<Grid container spacing={2}>
			{/* versions list */}
			<Grid item xs={12} md={2}>
				<Grid container spacing={{ xs: 1, sm: 2 }}>
					{versions?.map(version => (
						<VersionThumbnail key={version.id} version={version} handleSelectVersion={handleSelectVersion} />
					))}
				</Grid>
			</Grid>

			{/* views (2D and 3D) selected version */}
			<Grid item xs={12} md={10}>
				<Grid container spacing={1}>
					<SelectedVersion school={school} selectedVersion={selectedVersion} />
				</Grid>
			</Grid>
		</Grid>
    )
}
