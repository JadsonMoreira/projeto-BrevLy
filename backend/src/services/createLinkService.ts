import { db } from "../configs/database.config.js";
import { schemas } from "../db/schemas/index.js";
import { DefaultError } from "../utils/DefaultError.js";

const createLinkService = async (linkData: {
	originalUrl: string;
	shortUrl: string;
}) => {
	try {
		if (linkData.shortUrl.includes(" ")) {
			throw new DefaultError({
				message: "Short URL cannot contain spaces.",
				statusCode: 400,
				type: "error",
			});
		}
		if (!/^[a-z0-9-]+$/.test(linkData.shortUrl)) {
			throw new DefaultError({
				message:
					"Short URL cannot contain special characters or uppercase letters.",
				statusCode: 400,
				type: "error",
			});
		}

		const checkUrlExists = await db.query.linksDb.findFirst({
			where: (fields, { eq }) => eq(fields.shortUrl, linkData.shortUrl),
		});

		if (checkUrlExists) {
			throw new DefaultError({
				message: "This short URL already exists.",
				statusCode: 400,
				type: "error",
			});
		}

		return await db.insert(schemas.linksDb).values({
			url: linkData.originalUrl,
			shortUrl: linkData.shortUrl,
		});
	} catch (error) {
		throw new DefaultError(error as DefaultError, {
			statusCode: 400,
			type: "error",
			message: "Failed to create link",
		});
	}
};

export { createLinkService };
