-- Revert ohmypop:functions/insert_rest from pg

BEGIN;

DROP FUNCTION new_pop(int, text, text, bool);

COMMIT;
