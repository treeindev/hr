<?php
require_once __DIR__ . '/abstract-service.php';

/**
 * This service is responsible for any business logic related to employees.
 * Logic is separated from controller and database to ensure responsaiblity independence.
 */
class EmployeesService extends Service
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Returns all employees from the system in JSON format.
     */
    public function get_employees()
    {
        $employees = $this->database->get_employees();
        return json_encode($employees);
    }

    /**
     * Returns a single employee based on its given id.
     * If the provided ID does not match any database record, false gets returned.
     */
    public function get_employee($id)
    {
        try {
            $employee = $this->database->get_employee($id);
        } catch (Exception $e) {}
        return isset($employee->id) ? json_encode($employee) : false;
    }

    /**
     * Creates a new employee.
     * Name, department and salary are mandatory.
     */
    public function create_employee($employee)
    {
        return $this->database->create_employee(
            $employee->name,
            $employee->salary,
            $employee->department
        );
    }

    /**
     * Removes an employee from a given id.
     */
    public function remove_employee($id)
    {
        return $this->database->remove_employee($id);
    }
}