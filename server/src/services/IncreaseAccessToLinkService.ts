import { eq } from "drizzle-orm";
import { db } from "../configs/database.config.js";
import { schemas } from "../db/schemas/index.js";
import { DefaultError } from "../utils/DefaultError.js";

const IncreaseAccessToLinkService = async (linkId: string) => {
	try {
		const [link] = await db
			.select()
			.from(schemas.linksDb)
			.where(eq(schemas.linksDb.id, linkId));

		if (!link) {
			throw new DefaultError({
				message: "URL não encontrada",
				statusCode: 404,
				type: "error",
			});
		}

		await db
			.update(schemas.linksDb)
			.set({ accesses: link.accesses + 1 })
			.where(eq(schemas.linksDb.id, linkId));

	} catch (error) {
		throw new DefaultError(error as DefaultError, {
			statusCode: 400,
			type: "error",
			message: "Falha ao incrementar a contagem de acessos da URL",
		});
	}
};

export { IncreaseAccessToLinkService };
