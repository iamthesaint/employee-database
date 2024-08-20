--  seed data for the database of employees

INSERT INTO department (name)
VALUES
('Executive'),
('Data Science'),
('Product Development'),
('Engineering'),
('Sales')
;

INSERT INTO role (title, department, salary)
VALUES
('CEO', 'Executive', 400000),
('Data Scientist', 'Data Science', 100000),
('Product Design', 'Product Development', 90000),
('Product Testing', 'Product Development', 85000),
('Electrician', 'Engineering', 75000),
('Outside Sales', 'Sales', 76000)
;

INSERT INTO employee (first_name, last_name, title, department, salary, manager_name)
VALUES
('Galileo', 'Galilei', 'CEO', 'Executive', 400000, NULL),
('Albert', 'Einstein', 'Data Scientist', 'Data Science', 100000, 'Galileo Galilei'),
('Leonardo', 'Da Vinci', 'Product Design', 'Product Development', 90000, 'Galileo Galilei'),
('Marie', 'Curie', 'Product Testing', 'Product Development', 85000, 'Leonardo Da Vinci'),
('Nikola', 'Tesla', 'Electrician', 'Engineering', 75000, 'Marie Curie'),
('Charles', 'Darwin', 'Outside Sales', 'Sales', 76000, 'Galileo Galilei')
;