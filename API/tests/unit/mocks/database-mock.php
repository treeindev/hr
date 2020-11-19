<?php
class DatabaseMock
{
    public function get_employees()
    {
        return '[{"id":3,"name":"George","salary":55000,"department":2},{"id":4,"name":"Cyrus","salary":55000,"department":2},{"id":5,"name":"Lily","salary":25000,"department":1}]';
    }

    public function get_employee($id)
    {
        return '{"id": 3,"name": "George","salary": 55000,"department": 2}';
    }

    public function create_employee($name, $salary, $department_id)
    {
        return true;
    }

    public function remove_employee($id)
    {
        return true;
    }

    public function get_departments()
    {
        $departments = [];

        $department = new stdClass();
        $department->id = 1;
        $department->name = 'Tech';

        $departments[] = $department;

        $department = new stdClass();
        $department->id = 2;
        $department->name = 'Marketing';

        $departments[] = $department;
        return $departments;
    }

    public function get_departments_high_salary()
    {
        $departments = [];

        $department = new stdClass();
        $department->id = 1;
        $department->name = 'Tech';

        $departments[] = $department;

        $department = new stdClass();
        $department->id = 2;
        $department->name = 'Marketing';

        $departments[] = $department;
        return $departments;
    }

    public function get_department($id)
    {
        $department = new stdClass();
        $department->id = 1;
        $department->name = 'Tech';

        return $department;
    }

    public function create_department($name)
    {
        return true;
    }
}