CREATE TABLE IF NOT EXISTS stretch_games (
  id SERIAL PRIMARY KEY,
  username VARCHAR(256),
  date_created TEXT,
  stretch_template_id INTEGER REFERENCES stretch_templates(id),
  lib_1 TEXT,
  lib_2 TEXT,
  lib_3 TEXT,
  lib_4 TEXT,
  lib_5 TEXT,
  lib_6 TEXT,
  lib_7 TEXT,
  lib_8 TEXT,
  lib_9 TEXT,
  lib_10 TEXT,
  votes INT DEFAULT 0
);

INSERT INTO stretch_games (username, date_created, stretch_template_id, lib_1, lib_2, lib_3, lib_4, lib_5, lib_6, lib_7, lib_8, lib_9, lib_10) 
VALUES ('rebecca', '9/24/2018', 2, 'BEDS', 'POST', 'PENCILS', 'DANUL', 'SLEEPING', 'SOFT', 'COMPUTER', 'CUP', 'SINGING', 'LOUDLY');