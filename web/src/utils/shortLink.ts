import { env } from "../env.ts";

export function getShortLinkUrl(urlShort: string) {
	return `${env.VITE_FRONTEND_URL}/${urlShort}`;
}

export function getShortLinkLabel(urlShort: string) {
	const { host } = new URL(env.VITE_FRONTEND_URL);

	return `${host}/${urlShort}`;
}
