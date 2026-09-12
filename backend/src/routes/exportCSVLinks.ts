import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { exportCSVLinksService } from "../services/exportCSVLinksService.js";

export const exportLinksRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/links/export",
		{
			schema: {
				tags: ["Links"],
				summary: "Export CSV",
				description: "Generate and upload links CSV to Cloudflare R2",
				response: {
					200: z.object({
						url: z.string().url(),
						fileName: z.string(),
					}),
					400: z.object({ message: z.string() }),
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			try {
				const response = await exportCSVLinksService();

				return reply.status(200).send(response);
			} catch (error: any) {
				return reply.status(error.statusCode ?? 400).send({
					message: error.message,
				});
			}
		},
	);
};
