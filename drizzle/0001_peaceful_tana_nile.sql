ALTER TABLE "users" ADD COLUMN "email_address" varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_address_unique" UNIQUE("email_address");