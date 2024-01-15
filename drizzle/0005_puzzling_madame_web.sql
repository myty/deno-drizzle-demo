ALTER TABLE "pets" ADD COLUMN "owner_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

WITH t AS (
 SELECT
  pet.id as petid, u.id as owner_id
 FROM
  "pets" AS pet
  INNER JOIN "user_to_pets" j ON j.pet_id = pet.id
  INNER JOIN "users" u ON u.id = j.owner_id
 WHERE
  pet.owner_id IS NULL
)
UPDATE
 pets
SET
 owner_id = t.owner_id
FROM
 t
WHERE
 id = t.petid;--> statement-breakpoint

 ALTER TABLE "pets" ALTER COLUMN "owner_id" SET NOT NULL;--> statement-breakpoint

DROP TABLE "user_to_pets";--> statement-breakpoint
