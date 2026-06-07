
CREATE DATABASE IF NOT EXISTS game_library;
USE game_library;

CREATE TABLE IF NOT EXISTS games (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  genre      VARCHAR(100),
  platform   VARCHAR(100),
  status     ENUM('wishlist','playing','completed','dropped') DEFAULT 'wishlist',
  rating     INT CHECK (rating BETWEEN 1 AND 10),
  notes      TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO games (title, genre, platform, status, rating, notes) VALUES
  ('Elden Ring',            'Action RPG',     'PC',             'completed', 10, 'Masterpiece.'),
  ('Hollow Knight',         'Metroidvania',   'PC',             'dropped',    7, 'Stuck at Mantis Lords.'),
  ('Hades',                 'Roguelite',      'PC',             'completed',  9, NULL),
  ('Celeste',               'Platformer',     'Nintendo Switch','playing',   NULL, 'Chapter 6 currently.'),
  ('Cyberpunk 2077',        'RPG',            'PC',             'wishlist',  NULL, 'Waiting for a sale.');
