import { stringify } from "csv-stringify/sync";
import { db } from "../configs/database.config.js";
import { schemas } from "../db/schemas/index.js";
import { desc } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { DefaultError } from "../utils/DefaultError.js";
import { r2 } from "../configs/cloudflare.config.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../env.js";

const exportCSVLinksService = async () => {
	try {
		const links = await db
			.select()
			.from(schemas.linksDb)
			.orderBy(desc(schemas.linksDb.id));

		if (!links.length) {
			throw new DefaultError({
				message: "Nenhuma URL encontrada para exportar.",
				statusCode: 404,
				type: "error",
			});
		}

		const csv = stringify(links, {
			delimiter: ",",
			header: true,
			columns: [
				{ key: "id", header: "ID" },
				{ key: "url", header: "URL original" },
				{ key: "shortUrl", header: "URL encurtada" },
				{ key: "accesses", header: "contagem de acessos" },
				{ key: "createdAt", header: "data de criação" },
			],
		});

		const fileName = `${randomUUID()}.csv`;
		await r2.send(
			new PutObjectCommand({
				Bucket: env.CLOUDFLARE_BUCKET,
				Key: `csv/${fileName}`,
				Body: csv,
				ContentType: "text/csv",
			}),
		);

		const fileUrl = `${env.CLOUDFLARE_PUBLIC_URL}/csv/${fileName}`;

		return {
			url: fileUrl,
			fileName,
		};
	} catch (error) {
		throw new DefaultError(error as DefaultError, {
			statusCode: 400,
			type: "error",
			message: "Falha ao exportar URLs para CSV",
		});
	}
};

export { exportCSVLinksService };
