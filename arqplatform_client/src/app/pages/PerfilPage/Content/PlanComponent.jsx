import { CardComponent } from "./CardComponent";
import Grid from "@mui/material/Grid";

export const PlanComponent = ({ planes }) => {
  return (
    <Grid 
    container
     direction='row' 
     justifyContent='space-between' 
     sx={{mb:1}}>
        <CardComponent data={planes} key={1}/>
    </Grid>
  );
};
