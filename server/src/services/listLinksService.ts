import { desc } from "drizzle-orm";
import { db } from "../configs/database.config.js";
import { schemas } from "../db/schemas/index.js";
import { DefaultError } from "../utils/DefaultError.js";

const listLinksService = async () => {
	try {
		const links = await db
			.select()
			.from(schemas.linksDb)
			.orderBy(desc(schemas.linksDb.id));
		return links;
	} catch (error) {
		throw new DefaultError(error as DefaultError, {
			statusCode: 400,
			type: "error",
			message: "Failed to list links",
		});
	}
};

export { listLinksService };
