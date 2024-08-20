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
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Quit"
            ]
        },
    ]);

    switch (answers.choice) {
        case "View All Employees":
            viewEmployees();
            break;
        case "View All Departments":
            viewDepartments();
            break;
        case "View All Roles":
            viewRoles();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "Update Employee Role":
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
        SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_name
        FROM employee
        LEFT JOIN role ON employee.title = role.title
        LEFT JOIN department ON role.department = department.name
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
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        LEFT JOIN department ON role.department = department.name
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
    const departments = await pool.query(`
        SELECT * FROM department
    `);
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));
    const employeeChoices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));
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
            name: "title",
            message: "Select employee's role:",
            choices: roleChoices
        },
        {
            type: "input",
            name: "salary",
            message: "Enter employee's salary:"
        },
        {
            type: "list",
            name: "manager",
            message: "Select employee's manager:",
            choices: employeeChoices
        }
    ]);
    const manager = employees.rows.find(employee => employee.id === answers.manager);
    const managerName = manager ? `${manager.first_name} ${manager.last_name}` : null;
    const department = departments.rows.find(department => department.id === answers.title);
    await pool.query(`
        INSERT INTO employee (first_name, last_name, title, department, salary, manager_name)
        VALUES ($1, $2, $3, $4, $5, $6)
    `,
        [answers.first_name, answers.last_name, answers.title, department, answers.salary, managerName]);
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
    console.log(`${answers.name} Department added to the database!`);
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
            message: "Enter the title of the new role:"
        },
        {
            type: "list",
            name: "department",
            message: "Select a department this role belongs to:",
            choices: departmentChoices
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary for this role:"
        },

    ]);
    await pool.query(`
        INSERT INTO role (title, department, salary)
        VALUES ($1, $2, $3)
    `, [answers.title, answers.department, answers.salary]);
}


//function to update an employee's role
const updateEmployeeRole = async () => {
    try {
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
        const selectedRole = roles.rows.find(role => role.id === answers.role_id);
        await pool.query(`
            UPDATE employee
            SET title = $1, salary = $2
            WHERE id = $3
        `, [selectedRole.title, selectedRole.salary, answers.employee_id]);
        console.log("Employee role updated!");
    } catch (error) {
        console.error('Error updating employee role:', error.message);
    } finally {
        mainMenu();
    }
}

//function to quit
const quit = () => {
    console.log("Thanks for using Employee Tracker! See you soon!");
    process.exit();
}

start();

