import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function SelectSlot({ slot, handleSlot }) {
	return (
		<Stack
			direction="row"
			sx={{
				p: 0.5,
				minWidth: "160px",
				// minWidth: "150px",
				justifyContent: "center"
			}}
		>
			<Button
				size="small"
				onClick={handleSlot("dashboard")}
				color={slot === "dashboard" ? "primary" : "secondary"}
				variant={slot === "dashboard" ? "outlined" : "text"}
			>
				dashboard
			</Button>
			<Button
				size="small"
				onClick={handleSlot("costos")}
				color={slot === "costos" ? "primary" : "secondary"}
				variant={slot === "costos" ? "outlined" : "text"}
			>
				costos
			</Button>
		</Stack>
	)
}
