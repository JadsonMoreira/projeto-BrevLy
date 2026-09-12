import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { randomUUIDv7 } from "node:crypto";

export const linksDb = pgTable("links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUIDv7()),
	url: text("url").notNull(),
	shortUrl: text("short_url").notNull().unique(),
	accesses: integer("accesses").default(0).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
