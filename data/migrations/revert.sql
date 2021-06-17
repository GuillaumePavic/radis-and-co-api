BEGIN;

DROP FUNCTION IF EXISTS add_plant(plant json);
DROP FUNCTION IF EXISTS add_type(plant json);
DROP FUNCTION IF EXISTS add_user(plant json);

DROP TABLE IF EXISTS "plant", "type", "user", "schema", "schema_has_plant";

COMMIT;