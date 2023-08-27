CREATE DATABASE collab_code;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE code_rooms (
  id SERIAL PRIMARY KEY,
  admin_id INT REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE code_room_users (
  code_room_id INT REFERENCES code_rooms(id),
  user_id INT REFERENCES users(id),
  role VARCHAR(20) NOT NULL, -- "editor" or "viewer"
  PRIMARY KEY (code_room_id, user_id)
);

CREATE TABLE code_documents (
  id SERIAL PRIMARY KEY,
  code_room_id INT REFERENCES code_rooms(id),
  title VARCHAR(63) NOT NULL,
  language VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (code_room_id, title)
);

CREATE TABLE code_document_versions (
  code_document_id INT REFERENCES code_documents(id),
  version_number INT NOT NULL,
  content TEXT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (code_document_id, version_number)
);