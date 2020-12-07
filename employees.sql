DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- * **department**:
CREATE TABLE department (
--   * **id** - INT PRIMARY KEY
id INT AUTO_INCREMENT NOT NULL,
--   * **name** - VARCHAR(30) to hold department name
name VARCHAR(30)
);

-- * **role**:
CREATE TABLE role (
--   * **id** - INT PRIMARY KEY
id INT AUTO_INCREMENT NOT NULL,
--   * **title** -  VARCHAR(30) to hold role title
title VARCHAR(30),
--   * **salary** -  DECIMAL to hold role salary
salary DECIMAL(10,2),
--   * **department_id** -  INT to hold reference to department role belongs to
department_id INT(10)
);

-- * **employee**:
CREATE TABLE employee (
--   * **id** - INT PRIMARY KEY
id INT AUTO_INCREMENT NOT NULL,
--   * **first_name** - VARCHAR(30) to hold employee first name
first_name VARCHAR(30)
--   * **last_name** - VARCHAR(30) to hold employee last name
last_name VARCHAR(30)
--   * **role_id** - INT to hold reference to role employee has
role_id INT(10)
--   * **manager_id** - INT to hold reference to another employee that manages the 
manager_id INT(10)
);