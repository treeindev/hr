<?php

require_once './services/router.php';
require_once './controllers/employees.controller.php';
require_once './controllers/departments.controller.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// This API returns content as JSON
header('Content-Type: application/json');

// For demo purposes, this API is going to allow any request from any origin.
// To increase security, this should be changed to allow only secure origins.
header('Access-Control-Allow-Origin: *');

// Allowed methods for this API.
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');


// Class initialization for router and controllers
$router = new Router();
$employeesController = new EmployeesController();
$departmentsController = new DepartmentsController();

// Map available endpoints according to HTTP method
$router->map('OPTIONS', '*', 'options', 'options');
$router->map('GET', '/employees', 'employeesController#load_employees', 'employees');
$router->map('GET', '/employee/[:id]', 'employeesController#load_employee', 'employee');
$router->map('PUT', '/employee', 'employeesController#create_employee', 'employee_create');
$router->map('DELETE', '/employee/[:id]', 'employeesController#delete_employee', 'employee_delete');
$router->map('GET', '/departments', 'departmentsController#load_departments', 'departments');
$router->map('GET', '/department/[:id]', 'departmentsController#load_department', 'department');
$router->map('PUT', '/department', 'departmentsController#create_department', 'department_create');

// Current request should match one of the listed above
$match = $router->match();
if (is_array($match) && isset($match['target'])) {
    // If options request, allow current request
    if ($match['target'] === 'options') {
        http_response_code(200);
        exit();
    }

    // The request has matched a route.
    // Trigger destination method of controller by calling the function.
    list($controller, $action) = explode('#', $match['target']);
    $$controller->$action($match['params']);
    //$controller->$action(array($match['params']));
    //call_user_func_array(array($controller, $action), array($match['params']));
} else {
    print($match);
    // Current request does not match any route, return 404 code.
	http_response_code(404);
    exit();
}