-- Deploy ohmypop:init to pg

BEGIN;

CREATE TABLE pop (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    figurine_number int NOT NULL,
    "collection" text NOT NULL,
    "label" text NOT NULL UNIQUE,
    "status" bool NOT NULL
);

COMMIT;
