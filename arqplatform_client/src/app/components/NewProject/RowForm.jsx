import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styleInput } from './NewProjectForm';
import DeleteIcon from '@mui/icons-material/Delete';

export function RowForm({ onChange, onRemove, vertice, lado, dist, angulo, retiros, disabled, disabledDeleted }) {
	return (
		<Grid item xs={12}>
			<Grid container spacing={1}>
				<Grid item xs={2}>
					<input
						value={vertice}
						disabled
						style={{ ...styleInput, textAlign: "center" }}

					/>
				</Grid>
				<Grid item xs={3} sm={2}>
					<input
						style={{ ...styleInput, textAlign: "center" }}
						disabled
						value={lado}
						onChange={e => onChange("lado", e.target.value)}

					/>
				</Grid>

				<Grid item xs={2}>
					<input
						style={{ ...styleInput, textAlign: "center" }}
						disabled={disabled}
						required
						type="number"

						value={dist}
						onChange={e => onChange("dist", e.target.value)}
					/>
				</Grid>

				<Grid item xs={2}>
					<input
						style={{ ...styleInput, textAlign: "center" }}
						disabled={disabled}
						value={angulo}
						onChange={e => onChange("angulo", e.target.value)}
						required
						type="number"
					/>
				</Grid>
				<Grid item xs={2}>
					<input
						style={{ ...styleInput, textAlign: "center" }}
						disabled={disabled}
						required
						type="number"
						value={retiros}
						onChange={e => onChange("retiros", e.target.value)}
					/>
					{/* <IconButton disabled={disabledDeleted === 0 || disabledDeleted === 1 || disabledDeleted === 2} onClick={() => onRemove()} aria-label="delete">
						<DeleteIcon />
					</IconButton> */}
				</Grid>

				<Grid item xs={1}>
					<IconButton sx={{ paddingLeft: "5px" }} disabled={disabledDeleted === 0 || disabledDeleted === 1 || disabledDeleted === 2} onClick={() => onRemove()} aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</Grid>

			</Grid>
		</Grid>
	);
}