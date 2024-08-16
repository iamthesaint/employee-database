DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE employee
-- id, first_name, last_name, role_id, manager_id
(
    id SERIAL PRIMARY KEY
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

CREATE TABLE role
-- id, title, salary, department
(
    id SERIAL PRIMARY KEY
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(10, 0) NOT NULL,
    department INT NOT NULL 
);

CREATE TABLE department
-- id, name
(
    id SERIAL PRIMARY KEY 
    name VARCHAR(30) UNIQUE NOT NULL
);

