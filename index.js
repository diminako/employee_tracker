const inquirer = require('inquirer');
const mysql = require('mysql');
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
const table = require('console.table');

// const employees_js = require('./employees.js')

// ---------------------------------------------
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'
});

connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});

function afterConnection() {
    let query = connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};
// ----------------------------

const options =
    [{
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: [
            "Add Department",
            "Add Roles",
            "Add Employee",
            "View Departments",
            "View Roles",
            "View Employees",
            "Update Employee Roles"
        ]
    }];

// function to initialize program
function init() {
    inquirer.prompt(options).then(data => {
        let choice = data.option
        switch (choice) {
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Roles':
                addRoles();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'Update Employees Roles':
                updateEmployeeRoles();
                break;
        }
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you would like to add?',
            name: 'department'
        }
    ]).then(answer => {
        console.log(`Adding ${answer.department} department...\n`);
        connection.query(
            "INSERT INTO departments SET ?",
            {
                name: answer.department
            }, function (err, res) {
                if (err) throw err;
                connection.end()
                res.console.log("department added!\n");
            }
        )
        console.log(query.sql)
    })
}

const addRoles = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role to add?',
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is the salary of the added? (example...  "15.00"',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Which Department do they belong to?',
            name: 'dept',
            choices: ["Sales", "Service", "Parts"]
        }
    ]).then(answer => {
        switch (answer.dept) {
            case 'Sales':
                answer.dept = 1;
                break;
            case 'Service':
                answer.dept = 2;
                break;
            case 'Parts':
                answer.dept = 3;
                break;
        }
        console.log(`Adding ${answer.role} role...\n`);
        connection.query(
            "INSERT INTO roles SET ?",
            {
                title: answer.role,
                salary: answer.salary,
                department_id: answer.dept
            }, function (err, res) {
                if (err) throw err;
                connection.end()
                res.console.log("Role added!\n");
            }
        )
        console.log(query.sql)
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'empFirstName'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'empLastName'
        },
        {
            type: 'input',
            message: 'What is the employees role?',
            name: 'empRole'
        }
    ]).then(answer => {
        console.log(`Adding ${answer.department} department...\n`);
        let query = connection.query(
            "INSERT INTO departments SET ?",
            {
                name: answer.department
            }, function (err, res) {
                if (err) throw err;
                connection.end()
                res.console.log("department added!\n");
            }
        )
        console.log(query.sql)
    })
}

const viewDepartments = () => {
    console.log("yo")

}

const viewRoles = () => {
    console.log("yo")

}

const viewEmployees = () => {
    console.log("yo")

}

const updateEmployeeRoles = () => {
    console.log("yo")

}

init();