-- Revert ohmypop:pop_by_collection from pg

BEGIN;

DROP FUNCTION pop_by_collection(text);

COMMIT;
