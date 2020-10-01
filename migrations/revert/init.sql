-- Revert ohmypop:init from pg

BEGIN;

DROP TABLE pop;

COMMIT;
