<?php

/**
 * Database related logic is defiend on a separate class.
 * This enforces the DAO pattern by encapsulating everything related to DB connections outside of the logic layer. 
 */
class Database
{
    private $connection;

    /**
     * Details about the database are set as class properties for further database quering.
     * The database credentials are not stored in the code. This allows easier deployments across environments.
     */
    public function __construct()
    {
        $environment = parse_ini_file( 'config/database.ini' );

        $this->connection = new mysqli(
            $environment['servername'],
            $environment['username'],
            $environment['password'],
            $environment['dbname']
        );

        if ( $this->connection->connect_error ) {
            $this->log_error( 'Failed to connect to MySQL - ' . $this->connection->connect_error );
        }
        
        $this->connection->set_charset( $environment['charset'] );
    }

    public function get_employees()
    {
        $query = $this->query("SELECT * FROM employee");
        return $this->get_results_as_array($query);
    }

    public function get_employee($id)
    {
        $query = $this->query("SELECT * FROM employee WHERE id=$id");
        return $this->get_single_result($query);
    }

    public function create_employee($name, $salary, $department_id)
    {
        $query = $this->query("INSERT INTO employee (id, name, salary, department) VALUES (NULL, '$name', $salary, $department_id)");
        return $query->get_result();
    }

    public function remove_employee($id)
    {
        $query = $this->query("DELETE FROM employee WHERE id=$id");
        return $query->get_result();
    }

    public function get_departments()
    {
        $query = $this->query(
            "SELECT 
                d.id,
                d.name,
                IFNULL(e.salary, 0) AS salary
            FROM department AS d
            LEFT JOIN employee AS e
            ON e.id = (
                SELECT p.id
                FROM employee AS p
                WHERE d.id=p.department
                ORDER BY p.salary DESC
                LIMIT 1
            )"
        );
        return $this->get_results_as_array($query);
    }

    public function get_departments_high_salary()
    {
        $query = $this->query(
            "SELECT 
                d.id,
                d.name,
                IFNULL(e.salary, 0) AS salary
            FROM department AS d
            LEFT JOIN employee AS e
            ON e.id = (
                SELECT p.id
                FROM employee AS p
                WHERE d.id=p.department
                ORDER BY p.salary DESC
                LIMIT 1
            )
            WHERE d.id IN (
                SELECT department as id
                FROM employee
                WHERE salary > 50000
                GROUP BY department
                HAVING COUNT(department) > 1
            )"
        );
        return $this->get_results_as_array($query);
    }

    public function get_department($id)
    {
        $query = $this->query("SELECT * FROM department WHERE id=$id");
        return $this->get_single_result($query);
    }

    public function create_department($name)
    {
        $query = $this->query("INSERT INTO department (id, name) VALUES (NULL, '$name')");
        return $query->get_result();
    }

    /**
     * Reusable method that sends a query to the database based on a given string.
     */
    private function query($query_string)
    {
        if ($query = $this->connection->prepare($query_string)) {
            // Run the query.
            // The query result gets updated on the self $query object.
            $query->execute();
            return $query;
        } else {
            throw new Exception("Unable to prepare query - " . $this->connection->error);
        }
    }

    /**
     * Returns an array of objects from a given database query.
     */
    private function get_results_as_array($query)
    {
        $result = $query->get_result();
        $array = [];
        while ($row = mysqli_fetch_assoc($result)) {
            // Each item on the iteration is converted into (object)
            // This allows future accessed like: $item->property
            $array[] = (object) $row;
        }
        return $array;
    }

    /**
     * Method used to get a single record from the database from a given query.
     */
    private function get_single_result($query)
    {
        $result = $query->get_result();
        $row = mysqli_fetch_assoc($result);
        // Item is converted into (object)
        // for future accessed like: $item->property
        return (object) $row;
    }

    /**
     * Log of the error, i.e. to a file, should be handled here.
     * For demo purposes the current execution is just been terminated.
     */
    private function log_error($error)
    {
        exit($error);
    }
}