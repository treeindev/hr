<?php
require_once __DIR__ . '/../services/departments.service.php';
require_once __DIR__ . '/../utils/constants.php';

class DepartmentsController 
{
    private $departmentsService;

    public function __construct()
    {
        $this->departmentsService = new DepartmentsService();
    }

    /**
     * Loads all departments in the system.
     */
    public function load_departments()
    {
        try {
            if (isset($_GET['salary_filter'])) {
                exit($this->departmentsService->get_departments_high_salary());
            }
            exit($this->departmentsService->get_departments_all());
        } catch (Exception $e) {
            // There has been an internal error on the application.
            http_response_code(500);
            exit(ERROR_APP_INTERNAL);
        }
    }

    /**
     * Loads a single department based on a given id.
     */
    public function load_department($params)
    {
        $department = $this->departmentsService->get_department($params['id']);
        if ($department) {
            exit($department);
        }

        // If department is not part of the system, returning invalid client code.
        http_response_code(404);
        exit("{}");
    }

    /**
     * Creates a new department.
     */
    public function create_department()
    {
        $department = json_decode(file_get_contents('php://input'), false);
        if (!isset($department) || !isset($department->name)) {
            // The request sent by the client is not correct.
            // Returning invalid response code.
            http_response_code(400);
            exit("{}");
        }
        try {
            $this->departmentsService->create_department($department);
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
}