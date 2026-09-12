import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { deleteLinkService } from "../services/deleteLinkService.js";
import { IncreaseAccessToLinkService } from "../services/IncreaseAccessToLinkService.js";

export const increaseAccessToLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.patch(
		"/links/:id/access",
		{
			schema: {
				tags: ["Links"],
				summary: "Increase access count for a link",
				description: "Increase the access count for a link by its ID",
				params: z.object({
					id: z.string().uuid(),
				}),
				response: {
					200: z
						.object({ message: z.string() })
						.describe("Link access count increased successfully"),
					400: z
						.object({ message: z.string() })
						.describe("Failed to increase link access count"),
				},
			},
		},
		async (request, reply) => {
			try {
				const { id } = request.params as { id: string };
				await IncreaseAccessToLinkService(id);
				return reply
					.status(200)
					.send({ message: "Link access count increased successfully" });
			} catch (error: any) {
				return reply.status(400).send({ message: error.message });
			}
		},
	);
};
