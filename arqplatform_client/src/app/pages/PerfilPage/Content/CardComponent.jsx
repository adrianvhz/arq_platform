import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export const CardComponent = ({data}) => {
  const planes = data[0].Planes
  return (
    planes.map(p => (
    <Card key={p.id} sx={{
        width: "calc(100%/3.2)",
        backgroundColor: p.defecto ? '#05245c' : "#FFF" ,
        color: p.defecto ? '#FFF' : "#000" ,
        padding: "20px",
        borderRadius: 3,
        boxShadow: "rgb(100 100 111) 0px 7px 29px 0px",
      }}>
        {
         
            <CardContent

            >
              <Typography variant="h5" component="div" sx={{color: p.defecto ? '#FFF' : "#000" }}>
                {p.descripcion}
              </Typography>
              <Typography sx={{ fontSize: 14 , color: p.defecto ? '#FFF' : "#000" }}  gutterBottom>
                {p.vigencia} Días
              </Typography>
      
              <ul>
                  {
                    p.Permisos.map(per=>(
                        <li key={per.id}>{per.descripcion}</li>
                    ) )
                  }
              </ul>
            </CardContent>
        }
    </Card>
    ))
  );
};
