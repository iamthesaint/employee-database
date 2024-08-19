--  seed data for the database of employees

INSERT INTO department (id, name)
VALUES
(1, 'Executive'),
(2, 'Data Science'),
(3, 'Product Development'),
(4, 'Engineering'),
(5, 'Sales')
;

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'CEO', 400000, 1),
(2, 'Data Scientist', 95000, 2),
(3, 'Product Design', 85000, 3),
(4, 'Product Testing', 75000, 3),
(5, 'Electrician', 75000, 4),
(6, 'Outside Sales', 76000, 5)
;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Galileo', 'Galilei',
(2, 'Albert', 'Einstein', 2, 1),
(3, 'Leonardo', 'Da Vinci', 3, 1),
(4, 'Marie', 'Curie', 4, 3),
(5, 'Nikola', 'Tesla', 5, 4),
(6, 'Charles', 'Darwin', 6, 1)
;