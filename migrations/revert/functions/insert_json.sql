-- Revert ohmypop:functions/insert_json from pg

BEGIN;

DROP FUNCTION new_pop(json);

COMMIT;
