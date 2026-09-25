import { api } from "./index";

export async function listAllLinksService() {
	const response = await api.get("/links");

	return response.data;
}
