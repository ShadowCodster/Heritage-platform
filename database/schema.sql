CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  interest TEXT
);

CREATE TABLE monuments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT
);

CREATE TABLE checkpoints (
  id SERIAL PRIMARY KEY,
  monument_id INT REFERENCES monuments(id) ON DELETE CASCADE,
  title TEXT,
  fact TEXT,
  image_url TEXT,
  step_order INT
);

CREATE TABLE quiz_scores (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  monument_id INT REFERENCES monuments(id),
  score INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
