import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Home } from "./pages/home";
import { Redirect } from "./pages/redirect";
import { NotFound } from "./pages/notFound";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* 1. Página inicial (cadastro e lista de links) */}
				<Route path="/" element={<Home />} />
				{/* 3. Rota dinâmica de redirecionamento (ex: localhost:5173/meu-link) */}
				<Route path="/:shortUrl" element={<Redirect />} />
				{/* 4. Qualquer rota inexistente cai na tela de 404 */}
				<Route path="*" element={<NotFound />} />
			</Routes>
			{/* Notificações flutuantes */}
			<Toaster richColors position="bottom-right" />
		</BrowserRouter>
	);
}
