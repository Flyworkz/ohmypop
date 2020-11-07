-- Deploy ohmypop:fix/addImageToFunctions to pg

BEGIN;

DROP FUNCTION new_pop(json);

CREATE FUNCTION
	new_pop(jpop json)
	RETURNS pop AS $$
INSERT INTO pop (figurine_number, "collection", "label", "status", "image")
VALUES (
	(jpop->>'figurine_number')::int,
	jpop->>'collection',
	jpop->>'label',
	(jpop->>'status')::bool,
    jpop->>'image'
) RETURNING *;
$$ LANGUAGE sql STRICT;

COMMIT;
