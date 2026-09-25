import { api } from "./index";

export async function deleteLinkService(id: string) {
	const response = await api.delete(`/links/${id}`);

	return response.data;
}
