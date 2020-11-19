import { Department } from "../utils/models/department";
import { Employee } from "../utils/models/employee";

export class ApiService {

    /**
     * Gets the lists of employees from backend service.
     */
    public async getEmployees(): Promise<Array<Employee>> {
        
        const response: Array<Employee> = await this.sendRequest('/employees');
        if (!response) {
            return [];
        }
        return response;
    }

    /**
     * Gets list of departments from backend service.
     */
    public async getDepartments(salaryFilter: boolean = false): Promise<Array<Department>> {
        let url = '/departments';
        url += salaryFilter ? '?salary_filter=true' : '';
        const response: Array<Department> = await this.sendRequest(url);
        if (!response) {
            return [];
        }
        return response;
    }

    /**
     * Returns a single department from backend service.
     * @param id - the department id.
     */
    public async getDepartment(id: number): Promise<Department | null> {
        const response: Department = await this.sendRequest(`/department/${id}`);
        if (!response) {
            return null;
        }
        return response;
    }

    /**
     * Creates a new department
     * @param name - The new department name.
     */
    public async createDepartment(name: string): Promise<void> {
        const body = {
            name: name
        }
        await this.sendRequest('/department', "PUT", JSON.stringify(body));
    }

    /**
     * Creates a new employee.
     * Body should contain an object with following parameters:
     * @param name - Employee name
     * @param salary - Employee name
     * @param department - Department ID of the new employee
     */
    public async createEmployee(body: any): Promise<void> {
        await this.sendRequest('/employee', "PUT", JSON.stringify(body));
    }

    /**
     * Returns a single employee from backend service.
     * @param id - the employee id.
     */
    public async getEmployee(id: number): Promise<Employee | null> {
        const response: Employee = await this.sendRequest(`/employee/${id}`);
        if (!response) {
            return null;
        }
        return response;
    }

    /**
     * Removes a employee from the system.
     * @param id - employee id.
     */
    public async removeEmployee(id: number): Promise<void> {
        await this.sendRequest(`/employee/${id}`, 'DELETE');
        return;
    }

    /**
     * Reusable method that handles the API connection.
     * This is a basic implementation using the javascript native "fetch" functionality.
     * For more robust applications an API library could be used.
     * @param url - The path to send the request to.
     */
    private async sendRequest(path: string, method="GET", body=''): Promise<any> {
        try {
            let options: any = {
                method: method
            };
            if (method === 'PUT' || method === 'POST') {
                options = {
                    method: method,
                    body: body
                }
            }
            return fetch(process.env.REACT_APP_API_DOMAIN_URL+path, options)
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                }
                return false;
            });
        } catch(error: any) {
            // If any error occours during the API connection,
            // show console error with the exeption.
            // An improvement on the code would be to show up a modal to the user.
            console.error(error);
            return false;
        }
    }
}