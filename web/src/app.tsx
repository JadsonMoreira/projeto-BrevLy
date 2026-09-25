import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Home } from "./pages/home";
import { Redirect } from "./pages/redirect";
import { NotFound } from "./pages/notFound";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:shortUrl" element={<Redirect />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Toaster richColors position="bottom-right" />
		</BrowserRouter>
	);
}
