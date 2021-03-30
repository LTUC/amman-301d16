DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    display_name VARCHAR(255),
    city VARCHAR(255)
);

