import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {ApiService} from '../../services/api.service';
import {Employee} from '../../utils/models/employee';

interface Props {
    api: ApiService;
}

function ViewEmployees(props: Props) {
    const history = useHistory();
    const [employees, setEmployees] = useState<Array<Employee>>([]);

    useEffect(() =>{
        // useEffect does not support async methods natively, 
        // so a new async function has to be declared and latter called.
        async function getEmployees() {
            setEmployees(await props.api.getEmployees());
        }
        getEmployees();
    }, [props.api]);


    const employeesHtml = employees.map(employee => {
        return(
            <div key={employee.id} onClick={()=>{history.push(`/employee/${employee.id}`)}}>
                <div className="w-10">
                    <span>{employee.id}</span>
                </div>
                <div className="w-30">
                    <span>{employee.name}</span>
                </div>
                <div className="w-30">
                    <span>{employee.department}</span>
                </div>
                <div className="w-30">
                    <span>{employee.salary}</span>
                </div>
            </div>
        );
    })


    return(
        <div data-testid="view-employees" className="cmp__cards">
            <h4 className="title">List of employees on the system</h4>
            <section className="cmp__table">
                <header className="header">
                    <div className="w-10 active-up">
                        <span>ID</span>
                    </div>
                    <div className="w-30">
                        <span>Name</span>
                    </div>
                    <div className="w-30">
                        <span>Department</span>
                    </div>
                    <div className="w-30">
                        <span>Salary (€)</span>
                    </div>
                </header>
                <div className="content hover">
                    {employeesHtml}
                </div>
            </section>
        </div>
    );
}

export default ViewEmployees;