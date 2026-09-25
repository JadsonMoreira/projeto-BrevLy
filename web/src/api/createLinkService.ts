import { api } from "./index";

export async function createLinkService(urlOriginal: string, shortUrl: string) {
	const response = await api.post("/links", {
		urlOriginal,
		shortUrl,
	});

	return response.data;
}
