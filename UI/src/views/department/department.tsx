import React, { useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { ApiService } from '../../services/api.service';
import { PAGES } from '../../utils/constants';
import { Department } from '../../utils/models/department';

interface Params {
    id: string;
}

interface Props {
    api: ApiService;
}

function ViewDepartment(props: Props) {
    const history = useHistory();
    const params: Params = useParams();
    const id = parseInt(params.id);
    const [department, setDepartment] = useState<Department | null>();

    useEffect(() =>{
        // useEffect does not support async methods natively, 
        // so a new async function has to be declared and latter called.
        async function getDepartment() {
            const data = await props.api.getDepartment(id)
            // If there has been an error while fetching data from API,
            // redirect user to the departments list.
            if (!data) {
                history.push(PAGES.DEPARTMENTS);
                return;
            }
            setDepartment(data);
        }
        getDepartment();
    }, [id, history, props.api]);

    return(
        <>
            <ol data-testid="breadcrumb" className="cmp__breadcrumb">
                <li onClick={()=>{history.push(PAGES.DEPARTMENTS)}}>Department List</li>
                <li>{department?.name} ({id})</li>
            </ol>
            <div className="cmp__cards user-profile w-30 m-t-30">
                <section>
                    <ul>
                        <li>Department Name: {department?.name}</li>
                        <li>Department ID: {department?.id}</li>
                    </ul>
                </section>
            </div>
        </>
    );
}

export default ViewDepartment;