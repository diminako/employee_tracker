DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- * **department**:
CREATE TABLE departments (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
PRIMARY KEY (id)
);

-- * **role**:
CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT(10),
PRIMARY KEY (id)
);

-- * **employee**:
CREATE TABLE employees (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT(10),
manager_id INT(10),
PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES ("Service"), ("Sales"), ("Parts");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Ronnie", 34.00, 1),
("Samson", 22.00, 1),
("JJ", 20.00, 2),
("Justin", 22.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Ronnie", "Taylor", 34.00, 1),
("Samson", "Vang", 22.00, 1),
("JJ", 20.00, 2),
("Justin", 22.00, 3);