-- Deploy ohmypop:pop_by_collection to pg

BEGIN;

CREATE FUNCTION pop_by_collection(clctn text) RETURNS SETOF pop AS $$
SELECT * FROM pop WHERE "collection" = clctn;
$$ LANGUAGE sql STABLE STRICT;

COMMIT;
