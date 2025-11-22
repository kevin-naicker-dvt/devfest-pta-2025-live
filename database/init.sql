-- Create the database (this runs as postgres user)
-- Database creation is handled by docker-compose

-- Create the hello_world table
CREATE TABLE IF NOT EXISTS hello_world (
    id SERIAL PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial "Hello World" message
INSERT INTO hello_world (message) VALUES ('Hello World from DevFest PTA 2025! 🚀');

-- Grant permissions (optional, for production setups)
GRANT ALL PRIVILEGES ON TABLE hello_world TO postgres;
GRANT ALL PRIVILEGES ON SEQUENCE hello_world_id_seq TO postgres;

-- Verify the data
SELECT * FROM hello_world;

