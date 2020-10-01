-- Deploy ohmypop:functions/insert_rest to pg

BEGIN;

CREATE FUNCTION
	new_pop(fn int, clctn text, lbl text, sts bool)
	RETURNS pop AS $$
INSERT INTO pop (figurine_number, "collection", "label", "status")
VALUES (
	fn,
	clctn,
	lbl,
	sts
) RETURNING *;
$$ LANGUAGE sql STRICT;

COMMIT;
