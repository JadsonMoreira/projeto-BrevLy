import { api } from "./index";

export async function exportCsvService() {
	const response = await api.get(`/links/export`);

	return response.data;
}
