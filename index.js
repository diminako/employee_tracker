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
    init()
});

function afterConnection() {
    let query = connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        // console.table(res);
        // connection.end();
    });
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        // console.table(res);
        // connection.end();
    });
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        // console.table(res);
        // connection.end();
    });
};
// // ----------------------------

const options =
    [{
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: [
            "Add Department",
            "Add Roles",
            "Add Employee",
            "Remove Employee",
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
            case 'Remove Employee':
                removeEmployee();
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
        }]).then(answer => {
            console.log(`Adding ${answer.department} department...\n`);
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: answer.department
                }, function (err, res) {
                    if (err) throw err;
                    console.log("department added!\n");
                    console.log("What else would you like to do?\n");
                    init();
                }
            )
        })
}

const addRoles = () => {
    connection.query("SELECT * FROM departments;", (err, results) => {

        if (err) console.log(err);
        const departmentList = results.map(({ name, id }) => { return { name: name, value: id } })
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of the role to add?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary of the added? (example...  "15.00"',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Which Department do they belong to?',
                name: 'department_id',
                choices: departmentList
            }]).then(answer => {
                connection.query("INSERT INTO roles SET ?", answer, function (err, res) {
                    if (err) throw err;
                    console.log("Role added!\n");
                    console.log("What else would you like to do?\n");
                    init();
                })
            })
    })
}

const addEmployee = () => {
    connection.query("Select * From roles;", (err, results) => {
        if (err) console.log(err);
        const roleList = results.map(role => { return { name: role.title, value: role.id } })
        connection.query("SELECT * FROM employees;", (err, results) => {
            const employeeList = results.map(employ => { return { name: `${employ.first_name} ${employ.last_name}`, value: employ.id } })

            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the employees first name?',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'What is the employees last name?',
                    name: 'last_name'
                },
                {
                    type: 'list',
                    message: 'What is the employees role?',
                    choices: roleList,
                    name: 'role_id'
                },
                {
                    type: 'list',
                    message: 'Who is your manager?',
                    name: 'manager_id',
                    choices: employeeList
                }]).then(answer => {
                    connection.query(
                        "INSERT INTO employees SET ?", answer, function (err, res) {
                            if (err) throw err;
                            console.log("department added!\n");
                            console.log("What else would you like to do?\n");
                            init();
                        })
                })
        })
    })
}

const removeEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the last name of the employee you wish to remove?',
            name: "last_name"
        },]).then(answer => {
            connection.query(
                `DELETE FROM employees WHERE last_name = '${answer.last_name}';`, function (err, res) {
                    if (err) console.log(err);
                    console.log("Employee Booted!\n");
                    console.log("What else would you like to do?\n");
                    init();
                })
        })
}

const viewDepartments = () => {
    connection.query("Select * from departments;", (err, results) => {
        if (err) console.log(err);
        console.table(results);
        init()
    })

}

const viewRoles = () => {
    connection.query("Select * from roles;", (err, results) => {
        if (err) console.log(err);
        console.table(results);
        init()
    })

}

const viewEmployees = () => {
    connection.query("Select * from employees;", (err, results) => {
        if (err) console.log(err);
        console.table(results);
        init()
    })

}

const updateEmployeeRoles = () => {
    console.log("yo")

}

