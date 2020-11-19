<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

require_once './controllers/employees.controller.php';
require_once './controllers/departments.controller.php';

final class ControllersTest extends TestCase
{
    public function test_controller_department_has_methods(): void
    {
        $controller = new DepartmentsController();
        $this->assertTrue( method_exists($controller, 'load_departments'), 'Controller should expose a departments loading method.');
        $this->assertTrue( method_exists($controller, 'load_department'), 'Controller should expose a single department loading method.');
        $this->assertTrue( method_exists($controller, 'create_department'), 'Controller should expose a create department method.');

        // Update the controller's private service with a mocked one.
        /*$reflection = new ReflectionClass($controller);
        $reflection_property = $reflection->getProperty('departmentsService');
        $reflection_property->setAccessible(true);
        $reflection_property->setValue($controller, new DepartmentServiceMock());*/
    }

    public function test_controller_employees_has_methods(): void
    {
        $controller = new EmployeesController();
        $this->assertTrue( method_exists($controller, 'load_employees'), 'Controller should expose a method to load employees.');
        $this->assertTrue( method_exists($controller, 'load_employee'), 'Controller should expose a method to load a single employee.');
        $this->assertTrue( method_exists($controller, 'create_employee'), 'Controller should expose a method to crete a new employee.');
        $this->assertTrue( method_exists($controller, 'delete_employee'), 'Controller should expose a method to remove an employee.');
    }
}