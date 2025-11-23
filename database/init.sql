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

-- Create the applications table for recruitment system
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    candidate_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    cv_filename VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);

-- Grant permissions
GRANT ALL PRIVILEGES ON TABLE hello_world TO postgres;
GRANT ALL PRIVILEGES ON SEQUENCE hello_world_id_seq TO postgres;
GRANT ALL PRIVILEGES ON TABLE applications TO postgres;
GRANT ALL PRIVILEGES ON SEQUENCE applications_id_seq TO postgres;

-- Verify the data
SELECT * FROM hello_world;
SELECT COUNT(*) as application_count FROM applications;

