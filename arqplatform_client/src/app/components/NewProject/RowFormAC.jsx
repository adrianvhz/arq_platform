import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styleInput } from './NewProjectForm';
import DeleteIcon from '@mui/icons-material/Delete';

export function RowFormAC({ onChange, onRemove, ambienteComplementario, capacidad }) {
    return (
        <Grid container spacing={1} sx={{ marginBottom: "1rem" }}>
            <Grid item xs={8} sm={5}>
                <input
                    value={ambienteComplementario}
                    disabled
                    style={{ ...styleInput, textAlign: "center" }}

                />
            </Grid>
            <Grid item xs={3} sm={3}>

                <input
                    style={{ ...styleInput, textAlign: "center" }}
                    value={capacidad}
                    onChange={e => onChange("capacidad", e.target.value)}
                    required


                />
            </Grid>
            <Grid item xs={1}>
                <IconButton onClick={() => onRemove()} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}