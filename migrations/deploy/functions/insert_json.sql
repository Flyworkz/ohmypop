-- Deploy ohmypop:functions/insert_json to pg

BEGIN;

CREATE FUNCTION
	new_pop(jpop json)
	RETURNS pop AS $$
INSERT INTO pop (figurine_number, "collection", "label", "status")
VALUES (
	(jpop->>'figurine_number')::int,
	jpop->>'collection',
	jpop->>'label',
	(jpop->>'status')::bool
) RETURNING *;
$$ LANGUAGE sql STRICT;

COMMIT;
