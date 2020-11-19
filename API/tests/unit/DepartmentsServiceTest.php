<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

require_once './tests/unit/mocks/database-mock.php';
require_once './services/departments.service.php';

final class DepartmentsServiceTest extends TestCase
{
    protected $service;

    /**
     * This method is going to mock the dependencies of the service.
     * That is to avoid using the real database. Instead the DatabaseMock class is used.
     */
    protected function mock_service()
    {
        $this->service = new DepartmentsService();
        $reflection = new ReflectionClass($this->service);
        $reflection_property = $reflection->getProperty('database');
        $reflection_property->setAccessible(true);
        $reflection_property->setValue($this->service, new DatabaseMock());
    }

    public function test_department_service_returns_departments(): void
    {
        $this->mock_service();
        
        // Test for all departments
        $departments = $this->service->get_departments_all();
        $this->assertIsString($departments);

        // Test for filtered departments
        $departments = $this->service->get_departments_high_salary();
        $this->assertIsString($departments);
    }

    public function test_department_service_returns_a_department(): void
    {
        $this->mock_service();
        $departments = $this->service->get_department(3);
        $this->assertIsString($departments);
    }

    public function test_department_service_creates_new_department(): void
    {
        $this->mock_service();

        $department = new stdClass();
        $department->name = "New";
        $result = $this->service->create_department($department);
        $this->assertEquals($result, true);
    }
}