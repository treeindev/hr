import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {PAGES} from '../utils/constants';

function Navigation() {
    const history = useHistory();
    const location = useLocation().pathname;

    return(
        <aside data-testid="navigation-menu" className="cmp__navigation">
            <nav>
                <ol>
                    <li data-testid="navigation-employee-list" onClick={()=>{history.push(PAGES.EMPLOYEES)}} className={location === PAGES.EMPLOYEES ? 'active' : ''}>
                        <div>
                            <i className="icon ion-md-person"></i>
                            <span>Employee List</span>
                        </div>
                    </li>
                    <li data-testid="navigation-employee-new" onClick={()=>{history.push(PAGES.EMPLOYEE_NEW)}} className={location === PAGES.EMPLOYEE_NEW ? 'active' : ''}>
                        <div>
                            <i className="icon ion-md-person-add"></i>
                            <span>New Employee</span>
                        </div>
                    </li>
                    <li data-testid="navigation-deparments" onClick={()=>{history.push(PAGES.DEPARTMENTS)}} className={location === PAGES.DEPARTMENTS ? 'active' : ''}>
                        <div>
                            <i className="icon ion-ios-folder-open"></i>
                            <span>Department List</span>
                        </div>
                    </li>
                    <li onClick={()=>{history.push(PAGES.DEPARTMENT_NEW)}} className={location === PAGES.DEPARTMENT_NEW ? 'active' : ''}>
                        <div>
                            <i className="icon ion-ios-add-circle"></i>
                            <span>New Department</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </aside>
    );
}

export default Navigation;