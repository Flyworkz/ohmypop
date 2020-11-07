-- Deploy ohmypop:fix/addPopImage to pg

BEGIN;

ALTER TABLE pop 
ADD COLUMN "image" text;

COMMIT;
