<?php
require_once __DIR__ . '/abstract-service.php';

/**
 * This service is responsible for any business logic related to departments.
 * Logic is separated from controller and database to ensure responsaiblity independence.
 */
class DepartmentsService extends Service
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Returns all departments from the system in JSON format.
     */
    public function get_departments_all()
    {
        $departments = $this->database->get_departments();
        return json_encode($departments);
    }

    /**
     * Returns departments that have more than two employees that earn over 50k.
     */
    public function get_departments_high_salary()
    {
        $departments = $this->database->get_departments_high_salary();
        return json_encode($departments);
    }

    /**
     * Returns a single department based on a given id. 
     */
    public function get_department($id)
    {
        try {
            $department = $this->database->get_department($id);
        } catch (Exception $e) {}
        return isset($department->id) ? json_encode($department) : false;
    }

    /**
     * Creates a new department.
     */
    public function create_department($department)
    {
        return $this->database->create_department($department->name);
    }
}