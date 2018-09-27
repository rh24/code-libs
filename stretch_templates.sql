CREATE TABLE IF NOT EXISTS stretch_templates (
  id SERIAL PRIMARY KEY,
  title TEXT,
  author VARCHAR(256),
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

INSERT INTO stretch_templates (
  title,
  author,
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
  'Hi <%= lib_1 %>, welcome to <%= lib_2 %>, we are so <%= lib_3 %> to have you here! We hope you enjoy our <%= lib_4 %> <%= lib_5 %>. Please feel free to <%= lib_6 %> the <%= lib_7 %> and dont forget to <%= lib_8 %>. We hope you have a <%= lib_9 %> <%= lib_10 %>.',
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

INSERT INTO stretch_templates (
  title,
  author,
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
  'Interview From Hell',
  'Official',
  '9/24/2018',
  '"Good morning, everyone!", Michelle said as the 301 class became situated in their <%= lib_1 %>. "Today we will be talking about <%= lib_2 %>. Before we start, does anyone have any questions about last night''s code challenges on <%= lib_3 %>?" <%= lib_4 %> raises their hand and <%= lib_5 %>,"Why does the <%= lib_6 %> method return a <%= lib_7 %>?" Michelle responds, "Anytime you use it as a <%= lib_8 %>, you''re going to have a bad time. Try adding a <%= lib_9 %> ''OR'' to the callback, because life should be <%= lib_10 %>."',
  'noun',
  'method',
  'Plural noun',
  'Name of classmate',
  'verb',
  'adjective',
  'noun',
  'noun',
  'adjective ending in -ing',
  'adjective'
);