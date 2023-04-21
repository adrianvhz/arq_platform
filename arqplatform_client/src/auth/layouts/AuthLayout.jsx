import React from "react";
import styled from '@mui/material/styles/styled';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AppsIcon from '@mui/icons-material/AppsRounded';
import Button from '@mui/material/Button'; // @ts-ignore
import banner from "../../assets/images/Pro-design-banner-01.jpg";
import Typography from "@mui/material/Typography";

export const AuthLayout = ({ children }) => {
	return (
		<Grid container bgcolor="#fff" sx={{ minHeight: "100vh" }}> 
			<Grid
				item
				sx={{
					boxShadow: "none",
					backgroundImage: `url(${banner})`,
					backgroundSize: "cover",
					backgroundRepeat: "round",
					display: {
						xs: "none",
						lg: "block"
					}
				}}
				lg={8}
				xl={9}
			>
				<div style={{ position: "absolute", marginLeft: "1.8rem", marginTop: "1.8rem" }}>
					<ColorButton variant="contained" sx={{ p: "0.6rem 0" }}>
						<AppsIcon sx={{ color: "#00B050", fontSize: "3rem", fontWeight: "bold" }} />
					</ColorButton>
				</div>
			</Grid>
			<Grid
				item
				xs={12}
				lg={4}
				xl={3}
			>
				<Grid
					container
					justifyContent="center"
				>
					<Grid
						item
						xs={12}
						sm={8}
						lg={12}
						backgroundColor="#05245C"
						sx={{
							height: {
								xs: 120,
								sm: 180
							}
						}}
					></Grid>

					<Grid
						item
						xs={12}
						sm={8}
						lg={12}
					>
						<Stack
							textAlign="center"
							sx={{
								display: "flex",
								m: "-60px auto 50px auto",
								justifyContent: "center",
								alignItems: "center",
								// marginTop: '-60px',
								// marginBottom: '50px',
								bgcolor: '#fff',
								height: '100px',
								width: '300px',
								boxShadow: '0 0.5rem 1.5rem 0.5rem rgb(0 0 0 / 8%)'
							}}	
						>
							<TitleAuth>
								<b>PRO DESIGN</b>
							</TitleAuth>
							<TitleAuth style={{ fontWeight: 500 }}>
								Plataforma de Arquitectura
							</TitleAuth>
						</Stack>
					</Grid>
						
					<Grid
						item
						xs={12}
						sm={8}
						lg={12}
						sx={{
							p: {
								xs: "0 2rem",
								sm: "1.75rem 4rem"
							}
						}}	
					>
						<Grid container spacing={{ xs: 10, sm: 15 }}>
							<Grid item xs={12}>
								{children}

								<div style={{ textAlign: "center", paddingTop: "2.5rem" }}>
									<p>
										Al crear tu cuenta aceptas nuestros&nbsp;
										<a href='#'>Términos y Condiciones</a>
										&nbsp;-&nbsp;
										<a href='#'>Política de Tratamiento de Datos</a>.
									</p>
								</div>
							</Grid>
							<Grid item xs={12} pb="2rem">
								<Stack spacing={0.3} textAlign="center">
									<span>
										Diseño Web:&nbsp;
										<a href='#'>Creative Marketing Ideas S.A.C.</a>
									</span>
									<span>
										Programación Web:&nbsp;
										<a href='#'>Sotdynamic S.A.C</a>
									</span>
								</Stack>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

const ColorButton = styled(Button)({
  padding: '.6rem 0',
  backgroundColor: '#fff',
  boxShadow: '0 0.5rem 1.5rem 0.5rem rgb(0 0 0 / 8%)',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: '#fff',
  },
});

const TitleAuth = styled(Typography)({
	lineHeight: "1.2",
	fontSize: "1.35rem"
})
