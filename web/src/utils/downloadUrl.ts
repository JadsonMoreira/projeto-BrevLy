function getFileName(url: string) {
	const segments = new URL(url).pathname.split("/").filter(Boolean);

	return segments.at(-1) ?? "links.csv";
}

export function openInNewTab(url: string) {
	const tab = window.open(url, "_blank");

	if (!tab) return false;

	tab.opener = null;

	return true;
}

export async function downloadUrl(url: string) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Download failed with status ${response.status}`);
		}

		const objectUrl = URL.createObjectURL(await response.blob());
		const link = document.createElement("a");

		link.href = objectUrl;
		link.download = getFileName(url);
		document.body.append(link);
		link.click();
		link.remove();

		setTimeout(() => URL.revokeObjectURL(objectUrl));

		return true;
	} catch {
		return openInNewTab(url);
	}
}
