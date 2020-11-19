import { Department } from "../../utils/models/department";
import { Employee } from "../../utils/models/employee";

export class ApiMockService {
    public async getEmployees(): Promise<Array<Employee>> {
        return new Promise(resolve => {
            resolve([{
                id: 1,
                name: 'Test user',
                salary: 15000,
                department: '1'
            }]);
        });
    }
    public async getDepartments(salaryFilter: boolean = false): Promise<Array<Department>> {
        return new Promise(resolve => {
            resolve([{
                id: 1,
                name: 'Test department',
                salary: 15000
            }]);
        });
    }
    public async getDepartment(id: number): Promise<Department | null> {
        return new Promise(resolve => {
            resolve({
                id: 1,
                name: 'Test department',
                salary: 15000
            });
        });
    }
    public async createDepartment(name: string): Promise<void> {
        return;
    }
    public async createEmployee(body: any): Promise<void> {
        return
    }
    public async getEmployee(id: number): Promise<Employee | null> {
        return new Promise(resolve => {
            resolve({
                id: 1,
                name: 'Test user',
                salary: 15000,
                department: '1'
            });
        });
    }
    public async removeEmployee(id: number): Promise<void> {
        return;
    }
    private async sendRequest(path: string, method="GET", body=''): Promise<any> {
        return;
    }
}