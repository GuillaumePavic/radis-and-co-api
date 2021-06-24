BEGIN;

--DOMAINS
CREATE DOMAIN text_domain AS 
   TEXT CHECK (value ~ '^[ a-zA-Z0-9\-_]{1,30}$');

CREATE DOMAIN password_domain AS 
   TEXT CHECK (value ~ '^[&!?a-zA-Z0-9]{8,30}$');

CREATE DOMAIN email_domain AS 
   TEXT CHECK (value ~ '^[A-Za-z0-9+_.-]+@(.+)$');

CREATE DOMAIN positiv_int AS 
   INTEGER CHECK (value >= 0);


--TABLES
CREATE TABLE "type" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL
);

CREATE TABLE "plant" ( 
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE, 
    "scientific_name" TEXT NOT NULL,
    "sun" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "water" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" NUMERIC(9, 2) NOT NULL,
    "companion_pos" INTEGER[],
    "companion_neg" INTEGER[],
    "type_id" INTEGER NOT NULL REFERENCES "type"("id")
);

CREATE TABLE "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" email_domain NOT NULL UNIQUE, 
    "password" password_domain NOT NULL, 
    "pseudo" text_domain NOT NULL, 
    "is_admin" BOOLEAN NOT NULL DEFAULT FALSE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "schema" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text_domain NOT NULL,
    "length" positiv_int NOT NULL,
    "width" positiv_int NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

CREATE TABLE "schema_has_plant" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "schema_id" INTEGER NOT NULL REFERENCES "schema"("id") ON DELETE CASCADE,
    "plant_id" INTEGER NOT NULL REFERENCES "plant"("id") ON DELETE CASCADE,
    "coord_x" positiv_int NOT NULL,
    "coord_y" positiv_int NOT NULL
);


--FUNCTIONS
CREATE OR REPLACE FUNCTION seeding_plant(plant json) RETURNS void AS $$
    INSERT INTO plant
    (id, name, scientific_name, sun, difficulty, water, icon, image, description, size, companion_pos, companion_neg, type_id) 
    VALUES(
        (plant->>'id')::integer,
        (plant->>'name'),
        (plant->>'scientific_name'),
        (plant->>'sun')::integer,
        (plant->>'difficulty')::integer,
        (plant->>'water')::integer,
        (plant->>'icon'),
        (plant->>'image'),
        (plant->>'description'),
        (plant->>'size')::numeric,
        (plant->>'companion_pos')::integer[],
        (plant->>'companion_neg')::integer[],
        (plant->>'type_id')::integer
    );
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION add_plant(plant json) RETURNS plant AS $$
    INSERT INTO plant
    (name, scientific_name, sun, difficulty, water, icon, image, description, size, companion_pos, companion_neg, type_id) 
    VALUES(
        (plant->>'name'),
        (plant->>'scientific_name'),
        (plant->>'sun')::integer,
        (plant->>'difficulty')::integer,
        (plant->>'water')::integer,
        (plant->>'icon'),
        (plant->>'image'),
        (plant->>'description'),
        (plant->>'size')::numeric,
        (plant->>'companion_pos')::integer[],
        (plant->>'companion_neg')::integer[],
        (plant->>'type_id')::integer
    ) RETURNING *;
$$ LANGUAGE sql;


CREATE OR REPLACE FUNCTION add_type(type json) RETURNS void AS $$
    INSERT INTO "type"
    (id, label) 
    VALUES(
        (type->>'id')::integer, 
        (type->>'label')
    );
$$ LANGUAGE sql;


CREATE OR REPLACE FUNCTION add_user("user" json) RETURNS "user" AS $$
    INSERT INTO "user"
    ("email", "password", "pseudo") 
    VALUES(
        ("user"->>'email'), 
        ("user"->>'password'),
        ("user"->>'pseudo')
    ) RETURNING *;
$$ LANGUAGE sql;


--VIEWS
CREATE VIEW companion_pos_table AS
SELECT plant.id AS plant_id, unnest(companion_pos) AS companion_id FROM plant;

CREATE VIEW full_companion_pos AS
SELECT 
companion_pos_table.*, 
plant.icon, plant.name, plant.water, plant.sun, plant.difficulty 
FROM companion_pos_table
JOIN plant ON companion_pos_table.companion_id = plant.id;

CREATE VIEW companion_neg_table AS
SELECT plant.id AS plant_id, unnest(companion_neg) AS companion_id FROM plant;

CREATE VIEW full_companion_neg AS
SELECT 
companion_neg_table.*, 
plant.icon, plant.name, plant.water, plant.sun, plant.difficulty 
FROM companion_neg_table
JOIN plant ON companion_neg_table.companion_id = plant.id;


CREATE VIEW plants_with_companions AS
SELECT
plant.id,
plant.name,
plant.scientific_name, 
plant.sun, 
plant.difficulty, 
plant.water, 
plant.icon, 
plant.image, 
plant.description,
plant.size,
plant.type_id,
json_agg(DISTINCT full_companion_pos) AS companion_pos,
json_agg(DISTINCT full_companion_neg) AS companion_neg,
type.label
FROM plant
LEFT JOIN full_companion_pos ON plant.id = full_companion_pos.plant_id
LEFT JOIN full_companion_neg ON plant.id = full_companion_neg.plant_id
JOIN type ON type.id = plant.type_id
GROUP BY plant.id, type.label
ORDER BY plant.id;

COMMIT;