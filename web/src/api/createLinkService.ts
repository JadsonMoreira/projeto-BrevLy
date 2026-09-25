import { api } from "./index";

export async function createLinkService(urlOriginal: string, urlShort: string) {
	const response = await api.post("/links", {
		urlOriginal,
		urlShort,
	});

	return response.data;
}
