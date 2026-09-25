import { api } from "./index";

export async function getLinkService(shortUrl: string) {
	const response = await api.get(`/links/${shortUrl}`);

	return response.data;
}
