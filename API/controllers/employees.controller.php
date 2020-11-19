<?php
require_once __DIR__ . '/../services/employees.service.php';
require_once __DIR__ . '/../utils/constants.php';

class EmployeesController 
{
    private $employeesService;

    public function __construct()
    {
        $this->employeesService = new EmployeesService();
    }

    /**
     * Loads all employees in the system.
     */
    public function load_employees()
    {
        try {
            exit($this->employeesService->get_employees());
        } catch (Exception $e) {
            // There has been an internal error on the application.
            http_response_code(500);
            exit(ERROR_APP_INTERNAL);
        }
    }

    /**
     * Loads a single employee based on a given id.
     */
    public function load_employee($params)
    {
        $employee = $this->employeesService->get_employee($params['id']);
        if ($employee) {
            exit($employee);
        }

        // If department is not part of the system, returning invalid client code.
        http_response_code(404);
        exit("{}");
    }

    /**
     * Creates a new employee.
     * Employee details is passed in the body as JSON.
     */
    public function create_employee()
    {
        $employee = json_decode(file_get_contents('php://input'), false);
        if (!isset($employee) || !isset($employee->name) || !isset($employee->department) || !isset($employee->salary)) {
            // The request sent by the client is not correct.
            // Returning invalid response code.
            http_response_code(400);
            exit("{}");
        }
        try {
            $this->employeesService->create_employee($employee);
        } catch (Exception $e) {
            // There has been an error when inserting data into the database.
            // Returning invalid response code.
            http_response_code(400);
            exit(ERROR_CLIENT_INPUT);
        }
        
        // Return valid creation code.
        http_response_code(201);
        exit("{}");
    }

    /**
     * Deletes an employee from the system.
     */
    public function delete_employee($params)
    {
        try {
            $employee = $this->employeesService->remove_employee($params['id']);
        } catch (Exception $e) {
            // There has been an error when remove employee from the database.
            // Returning invalid response code.
            http_response_code(400);
            exit(ERROR_CLIENT_INPUT);
        }

        http_response_code(200);
        exit("{}");
    }
}