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
    title VARCHAR(30) NOT NULL UNIQUE,
    department_id INT NOT NULL,
    salary DECIMAL(10, 0) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE employee
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_title VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    role_salary DECIMAL(10, 0) NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_title) REFERENCES role (title)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (department_name) REFERENCES department (name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (role_salary) REFERENCES role (salary)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE  
);

