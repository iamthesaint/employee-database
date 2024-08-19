DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE department
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) UNIQUE NOT NULL,
    FOREIGN KEY (department) REFERENCES department (name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE employee
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    manager_name VARCHAR(60),
    FOREIGN KEY (title) REFERENCES role (title)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (department) REFERENCES department (name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (salary) REFERENCES role (salary)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE OR REPLACE FUNCTION check_manager_exists()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.manager_name IS NOT NULL) THEN
        PERFORM 1
        FROM employee
        WHERE CONCAT(first_name, ' ', last_name) = NEW.manager_name;
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Manager % does not exist', NEW.manager_name;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_manager_exists
BEFORE INSERT OR UPDATE ON employee
FOR EACH ROW
EXECUTE FUNCTION check_manager_exists();

