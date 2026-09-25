import { api } from "./index";

export async function countLinkAccessService(id: string) {
	const response = await api.patch(`/links/${id}/access`);

	return response.data;
}
