SELECT *
FROM department
JOIN role ON department.id = role.department_id

SELECT *
FROM role
JOIN department ON role.department_id = department.id

SELECT *
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id


SELECT 
    e.id AS employee_id,
    e.first_name AS employee_first_name,
    e.last_name AS employee_last_name,
    r.title AS role_title,
    d.name AS department_name,
    r.salary AS role_salary,
    m.first_name AS manager_first_name,
    m.last_name AS manager_last_name
FROM 
    employee e
JOIN 
    role r ON e.role_id = r.id
JOIN 
    department d ON r.department_id = d.id
LEFT JOIN 
    employee m ON e.manager_id = m.id
;