ALTER TABLE "pets" ADD COLUMN "favorite_food" text;--> statement-breakpoint

UPDATE "pets" SET "favorite_food" = 'n/a' WHERE "favorite_food" IS NULL;--> statement-breakpoint

ALTER TABLE "pets" ALTER COLUMN "favorite_food" SET NOT NULL;--> statement-breakpoint
