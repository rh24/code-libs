CREATE TABLE IF NOT EXISTS templates (
  id SERIAL PRIMARY KEY,
  title TEXT,
  username VARCHAR(256),
  date_created TEXT,
  template_body TEXT,
  label_1 TEXT,
  label_2 TEXT,
  label_3 TEXT,
  label_4 TEXT,
  label_5 TEXT,
  label_6 TEXT,
  label_7 TEXT,
  label_8 TEXT,
  label_9 TEXT,
  label_10 TEXT,
  votes INT default 0
);

DELETE FROM templates;

INSERT INTO templates (
  title,
  username,
  date_created,
  template_body,
  label_1,
  label_2,
  label_3, 
  label_4,
  label_5,
  label_6,
  label_7,
  label_8,
  label_9,
  label_10
) VALUES (
  'Pick Up Lines',
  'adultmadlibs',
  '09/24/2018',
  '<ul><li>Is it <%= lib_1 %> in here, or is it just you?</li><li>Can I buy you a/an <%= lib_2 %>, or do you just want the money?</li><li>Your <%= lib_3 %> must be real tired because you''ve been <%= lib_4 %> through my <%= lib_5 %> all night.</li></ul><p><%= lib_6 %> does not respond to any of these <%= lib_7 %> pick up lines. <%= lib_6 %> grabs <%= lib_8%> <%= lib_9 %> and <%= lib_10 %>.',
  'adjective',
  'noun',
  'part of body',
  'verb ending in ing',
  'noun',
  'Name of a classmate',
  'adjective',
  'pronoun of classmate',
  'noun',
  'verb'
);

INSERT INTO templates (
  title,
  username,
  date_created,
  template_body,
  label_1,
  label_2,
  label_3, 
  label_4,
  label_5,
  label_6,
  label_7,
  label_8,
  label_9,
  label_10
) VALUES (
  'Welcome to CodeLibs',
  'Official',
  '9/24/2018',
  'Hi <$= lib_1 %>, welcome to <$= lib_2 %>, we are so <$= lib_3 %> to have you here! We hope you enjoy our <$= lib_4 %><$= lib_5 %>. Please feel free to <$= lib_6 %> the <$= lib_7 %> and dont forget to <$= lib_8 %>. We hope you have a <$= lib_9 %><$= lib_10 %>',
  'name',
  'location',
  'adjective',
  'adjective',
  'noun',
  'verb',
  'noun',
  'verb',
  'adjective',
  'noun'
);