CREATE TABLE IF NOT EXISTS "user_to_pets" (
	"owner_id" integer NOT NULL,
	"pet_id" integer NOT NULL,
	CONSTRAINT "user_to_pets_pet_id_unique" UNIQUE("pet_id")
);
--> statement-breakpoint
ALTER TABLE "pets" DROP CONSTRAINT "pets_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "owner_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_pets" ADD CONSTRAINT "user_to_pets_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_pets" ADD CONSTRAINT "user_to_pets_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
