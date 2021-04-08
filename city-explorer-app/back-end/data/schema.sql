DROP TABLE IF EXISTS locations, weather, events, yelps, movies, parks CASCADE;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude NUMERIC(20, 14),
  longitude NUMERIC(20, 14),
  created_at BIGINT
);
