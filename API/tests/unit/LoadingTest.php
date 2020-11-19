<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

require_once './controllers/employees.controller.php';
require_once './controllers/departments.controller.php';
require_once './services/departments.service.php';
require_once './services/employees.service.php';
require_once './services/database.php';

final class LoadingTest extends TestCase
{
    public function test_that_controllers_initialize(): void
    {
        $this->assertClassHasAttribute('departmentsService', 'DepartmentsController');
        $this->assertClassHasAttribute('employeesService', 'EmployeesController');
    }

    public function test_that_services_initialize(): void
    {
        // Services extend from abstract service correctly.
        $this->assertClassHasAttribute('database', 'DepartmentsService');
        $this->assertClassHasAttribute('database', 'EmployeesService');
        
        // Database sets up environment correctly.
        $this->assertClassHasAttribute('connection', 'Database');
        $database = new Database();
        $this->assertTrue( method_exists($database, 'log_error'), 'Database has no log error method.');
        $this->assertTrue( method_exists($database, 'query'), 'Database has no query method.');
    }
}