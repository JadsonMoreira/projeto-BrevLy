ALTER TABLE "links" DROP CONSTRAINT "links_url_unique";--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "accesses" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_short_url_unique" UNIQUE("short_url");