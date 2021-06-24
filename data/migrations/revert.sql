BEGIN;

DROP VIEW IF EXISTS companion_pos_table, full_companion_pos, companion_neg_table, full_companion_neg, plants_with_companions;

DROP FUNCTION IF EXISTS add_plant(plant json);
DROP FUNCTION IF EXISTS add_type(plant json);
DROP FUNCTION IF EXISTS add_user(plant json);

DROP TABLE IF EXISTS "plant", "type", "user", "schema", "schema_has_plant";

DROP DOMAIN IF EXISTS text_domain, email_domain, positiv_int;


COMMIT;