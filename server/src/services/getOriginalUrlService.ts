import { eq } from "drizzle-orm";
import { db } from "../configs/database.config.js";
import { schemas } from "../db/schemas/index.js";
import { DefaultError } from "../utils/DefaultError.js";

const getOriginalUrlService = async (shortUrl: string) => {
	try {
		const [link] = await db
			.select()
			.from(schemas.linksDb)
			.where(eq(schemas.linksDb.shortUrl, shortUrl));

		if (!link) {
			throw new DefaultError({
				statusCode: 404,
				message: "Short URL not found",
				type: "error",
			});
		}

		return link;
	} catch (error) {
		throw new DefaultError(error as DefaultError, {
			statusCode: 400,
			type: "error",
			message: "Failed to find link",
		});
	}
};

export { getOriginalUrlService };
