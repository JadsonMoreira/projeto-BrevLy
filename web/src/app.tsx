import { Toaster } from "sonner";
import { Home } from "./pages/home";

export function App() {
	return (
		<main>
			<Home />
			<Toaster richColors position="bottom-right" />
		</main>
	);
}
