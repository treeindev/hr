import user from '../../assets/user.svg';
import React, { useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {PAGES} from '../../utils/constants';
import {ModalContent} from '../../utils/models/modal';
import {ApiService} from '../../services/api.service';
import {Employee} from '../../utils/models/employee';

interface Params {
    id: string;
}

interface Props {
    setModal: Function;
    api: ApiService;
}

function ViewEmployee(props: Props) {
    const history = useHistory();
    const params: Params = useParams();
    const id = parseInt(params.id);
    const [employee, setEmployee] = useState<Employee | null>();

    useEffect(() =>{
        // useEffect does not support async methods natively, 
        // so a new async function has to be declared and latter called.
        async function getEmployees() {
            const data = await props.api.getEmployee(id);
            // If there has been an error while fetching data from API,
            // redirect user to the employee list.
            if (!data) {
                history.push(PAGES.EMPLOYEES);
                return;
            }
            setEmployee(data);
        }
        getEmployees();
    }, [history, id, props.api]);

    // Callback sent to the modal.
    // It gets executed once user confirms employee deletion.
    const removeUserCallback = async () => {
        // Remove user from system
        await props.api.removeEmployee(id);

        // Redirecting user to employee list
        history.push(PAGES.EMPLOYEES);
        const modal: ModalContent = {
            title: "User removed",
            body: "The user has been removed from the system successfully",
            showCaution: false,
            callback: null
        }
        props.setModal(modal);
    }
    // Prevent user from removing an employee directly.
    // Ask for a confirmation via modal.
    const removeUser = () => {
        const modal: ModalContent = {
            title: "Caution",
            body: "You are about to remove a user from the system. Are you sure you want to proceed?",
            showCaution: true,
            button: "Delete",
            callback: removeUserCallback
        }
        props.setModal(modal);
    }

    return(
        <>
            <ol className="cmp__breadcrumb">
                <li onClick={()=>{history.push(PAGES.EMPLOYEES)}}>Employee List</li>
                <li>{employee?.name} ({id})</li>
            </ol>
            <div className="cmp__cards user-profile w-30 m-t-30">
                <header></header>
                <div>
                    <img src={user} alt="employee-name" />
                    <h4>{employee?.name}</h4>
                </div>
                <section>
                    <ul>
                        <li>ID: {id}</li>
                        <li>Name: {employee?.name}</li>
                        <li>Salary: {employee?.salary}</li>
                    </ul>
                </section>
            </div>
            <button className="danger" onClick={removeUser}>Remove user</button>
        </>
    );
}

export default ViewEmployee;