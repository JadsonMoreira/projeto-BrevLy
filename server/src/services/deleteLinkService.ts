import { eq } from "drizzle-orm";
import { db } from "../configs/database.config.js";
import { schemas } from "../db/schemas/index.js";
import { DefaultError } from "../utils/DefaultError.js";

const deleteLinkService = async (linkId: string) => {
	try {
		const existingLink = await db
			.select()
			.from(schemas.linksDb)
			.where(eq(schemas.linksDb.id, linkId));

		if (!existingLink.length) {
			throw new DefaultError({
				message: "URL não encontrada",
				statusCode: 404,
				type: "error",
			});
		}

		await db.delete(schemas.linksDb).where(eq(schemas.linksDb.id, linkId));
	} catch (error: any) {
		throw new DefaultError(error as DefaultError, {
			statusCode: 400,
			type: "error",
			message: "Falha ao deletar a URL",
		});
	}
};

export { deleteLinkService };
