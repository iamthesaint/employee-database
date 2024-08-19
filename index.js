import inquirer from "inquirer";
import { pool, connectToDb } from "./connection.js";

const start = async () => {
  await connectToDb();
  console.log("Welcome to Employee Tracker!");
  mainMenu();
}

const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add employee",
                "Add department",
                "Add role",
                "Update employee role",
                "Quit"
            ]
        },
    ]);

    switch (answers.choice) {
        case "View all employees":
            viewEmployees();
            break;
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "Add employee":
            addEmployee();
            break;
        case "Add department":
            addDepartment();
            break;
        case "Add role":
            addRole();
            break;
        case "Update employee role":
            updateEmployeeRole();
            break;
        case "Quit":
            quit();
            break;
    }
}

//function to view all employees
const viewEmployees = async () => {
    const employees = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    console.table(employees.rows);
    mainMenu();
}

//function to view all departments
const viewDepartments = async () => {
    const departments = await pool.query(`
        SELECT * FROM department
    `);
    console.table(departments.rows);
    mainMenu();
}

//function to view all roles
const viewRoles = async () => {
    const roles = await pool.query(`
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        LEFT JOIN department ON role.department_id = department.id
    `);
    console.table(roles.rows);
    mainMenu();
}

//function to add an employee
const addEmployee = async () => {
    const roles = await pool.query(`
        SELECT * FROM role
    `);
    const employees = await pool.query(`
        SELECT * FROM employee
    `);
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));
    const employeeChoices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));
    employeeChoices.unshift({ name: "None", value: null });
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee's first name:"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employee's last name:"
        },
        {
            type: "list",
            name: "role_id",
            message: "Select employee's job role:",
            choices: roleChoices
        },
        {
            type: "list",
            name: "manager_id",
            message: "Select employee's direct manager (if applicable):",
            choices: employeeChoices
        }
    ]);
    await pool.query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ($1, $2, $3, $4)
    `, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
    console.log(`${answers.first_name} ${answers.last_name} added to the database!`);
    mainMenu();
}

//function to add a department
const addDepartment = async () => {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter department name:"
        }
    ]);
    await pool.query(`
        INSERT INTO department (name)
        VALUES ($1)
    `, [answers.name]);
    //print department name added
    console.log(`${answers.name} department added to the database!`);
    mainMenu();
}

//function to add a role
const addRole = async () => {
    const departments = await pool.query(`
        SELECT * FROM department
    `);
    const departmentChoices = departments.rows.map(department => ({
        name: department.name,
        value: department.id
    }));
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the name of the role:"
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary for this role:"
        },
        {
            type: "list",
            name: "department_id",
            message: "Select a department this role belongs to:",
            choices: departmentChoices
        }
    ]);
    await pool.query(`
        INSERT INTO role (title, salary, department_id)
        VALUES ($1, $2, $3)
    `, [answers.title, answers.salary, answers.department_id]);
    console.log("Role added!");
    mainMenu();
}

//function to update an employee's role
const updateEmployeeRole = async () => {
    const employees = await pool.query(`
        SELECT * FROM employee
    `);
    const roles = await pool.query(`
        SELECT * FROM role
    `);
    const employeeChoices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Select an employee to update:",
            choices: employeeChoices
        },
        {
            type: "list",
            name: "role_id",
            message: "Select the employee's new role:",
            choices: roleChoices
        }
    ]);
    await pool.query(`
        UPDATE employee
        SET role_id = $1
        WHERE id = $2
    `, [answers.role_id, answers.employee_id]);
    console.log(`${employeeChoices.find(employee => employee.value === answers.employee_id).name}'s role updated!`);
    mainMenu();
}

//function to quit
const quit = () => {
    console.log("Goodbye!");
    process.exit();
}

start();

