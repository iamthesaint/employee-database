--  seed data for the database of employees

INSERT INTO department (id, name)
VALUES
(1, 'Executive'),
(2, 'Data Science'),
(3, 'Product Development'),
(4, 'Engineering'),
(5, 'Sales')
;

INSERT INTO role (id, title, department, salary)
VALUES
(1, 'CEO', 'Executive', 400000),
(2, 'Data Scientist', 'Data Science', 100000),
(3, 'Product Design', 'Product Development', 90000),
(4, 'Product Testing', 'Product Development', 85000),
(5, 'Electrician', 'Engineering', 75000),
(6, 'Outside Sales', 'Sales', 76000)
;

INSERT INTO employee (id, first_name, last_name, title, department, salary, manager_name)
VALUES
(1, 'Galileo', 'Galilei', 'CEO', 'Executive', 400000, NULL),
(2, 'Albert', 'Einstein', 'Data Scientist', 'Data Science', 100000, 'Galileo Galilei'),
(3, 'Leonardo', 'Da Vinci', 'Product Design', 'Product Development', 90000, 'Galileo Galilei'),
(4, 'Marie', 'Curie', 'Product Testing', 'Product Development', 85000, 'Leonardo Da Vinci'),
(5, 'Nikola', 'Tesla', 'Electrician', 'Engineering', 75000, 'Marie Curie'),
(6, 'Charles', 'Darwin', 'Outside Sales', 'Sales', 76000, 'Galileo Galilei')
;