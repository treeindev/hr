import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { ApiService } from '../../services/api.service';
import {Department} from '../../utils/models/department';

interface Props {
    api: ApiService;
}

function ViewDepartments(props: Props) {
    const history = useHistory();
    const [departments, setDepartments] = useState<Array<Department>>([]);
    const [filter, setFilter] = useState<boolean>(false);

    useEffect(() =>{
        // useEffect does not support async methods natively, 
        // so a new async function has to be declared and latter called.
        async function getDepartments() {
            setDepartments(await props.api.getDepartments(filter));
        }
        getDepartments();
    }, [filter, props.api]);

    const deparmentsHtml = departments.map(department => {
        return(
            <div key={department.id} onClick={()=>{history.push(`/department/${department.id}`)}}>
                <div className="w-10">
                    <span>{department.id}</span>
                </div>
                <div className="w-30">
                    <span>{department.name}</span>
                </div>
                <div className="w-60">
                    <span>{department.salary}</span>
                </div>
            </div>
        );
    })


    return(
        <div data-testid="view-departments" className="cmp__tab-navigation">
            <ul>
                <li onClick={()=>{setFilter(false)}} className={!filter ? 'active' : ''}>All departments</li>
                <li onClick={()=>{setFilter(true)}} className={filter ? 'active' : ''}>High Salary Departments</li>
            </ul>
            <div className="cmp__cards">
                <h4 className="title">List of departments on the system</h4>
                <section className="cmp__table">
                    <header className="header">
                        <div className="w-10">
                            <span>ID</span>
                        </div>
                        <div className="w-30">
                            <span>Name</span>
                        </div>
                        <div className="w-60">
                            <span>Salary</span>
                        </div>
                    </header>
                    <div className="content hover">
                        {deparmentsHtml}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ViewDepartments;