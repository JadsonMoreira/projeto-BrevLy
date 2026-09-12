import { Config } from "drizzle-kit";
import { env } from "./src/env.js";

export default {
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	dialect: "postgresql",
	schema: "./src/db/schemas/*",
	out: "./src/db/migrations",
} satisfies Config;
