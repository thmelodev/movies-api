
-- add extension pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- insert languages into languages table
INSERT INTO "languages" ("id", "name")
VALUES
  (gen_random_uuid(), 'Português'),
  (gen_random_uuid(), 'Inglês'),
  (gen_random_uuid(), 'Espanhol'),
  (gen_random_uuid(), 'Francês'),
  (gen_random_uuid(), 'Alemão'),
  (gen_random_uuid(), 'Italiano'),
  (gen_random_uuid(), 'Japonês'),
  (gen_random_uuid(), 'Chinês'),
  (gen_random_uuid(), 'Coreano'),
  (gen_random_uuid(), 'Árabe');