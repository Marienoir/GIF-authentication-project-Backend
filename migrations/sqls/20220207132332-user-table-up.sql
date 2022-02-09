/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  first_name varchar not null,
  last_name varchar not null,
  email varchar not null UNIQUE,
  phone_number varchar not null,
  gender varchar not null,
  password varchar not null,
  confirm_password varchar not null,
  role varchar not null DEFAULT 'user',
  created_at timestamp default now(),
  updated_at timestamp default now()
);