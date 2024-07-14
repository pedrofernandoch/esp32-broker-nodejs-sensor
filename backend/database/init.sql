CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE not NULL,
    password VARCHAR(256) NOT NULL,
    admin BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE logs (
    id SERIAL PRIMARY key,
    user_id INTEGER NOT NULL,
    log_action VARCHAR(14) NOT NULL,
    log_type VARCHAR(10) NOT NULL,
    message TEXT NOT NULL,
    timestamp timestamp,

	CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT ck_log_action CHECK (log_action IN ('GET_TEMP', 'GET_HUM', 'CREATE', 'GET', 'UPDATE', 'DELETE')),
    CONSTRAINT ck_log_type CHECK (log_type IN ('SUCCESS', 'FAILURE'))
);

INSERT INTO users (name, email, password, admin) VALUES ('Admin', 'admin@admin.com', '$2a$10$i/EDYJ9eFYEAG4QpXETBkeK089VVb9zAu6vwZ1J4dXA.sjchn6C9y', TRUE);