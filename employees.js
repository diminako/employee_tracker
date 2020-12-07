const mysql = require('mysql');
const table = require('console.table');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connect as id" + connection.threadId)
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};