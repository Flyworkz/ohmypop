-- Revert ohmypop:fix/addPopImage from pg

BEGIN;

ALTER TABLE pop 
DROP COLUMN "image";

COMMIT;
