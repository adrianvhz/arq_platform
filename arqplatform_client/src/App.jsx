import { SnackbarProvider } from "notistack";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";

function App() {
	return (
		<AppTheme>
			<SnackbarProvider maxSnack={3}>
				<AppRouter />
			</SnackbarProvider>
		</AppTheme>
	)
}

export default App;
