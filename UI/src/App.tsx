import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { 
    ViewEmployee, 
    ViewEmployees, 
    ViewEmployeeNew, 
    ViewDepartments, 
    ViewDepartmentNew, 
    ViewDepartment 
} from './views';
import { Navigation, Modal } from './components';
import { PAGES } from './utils/constants';
import { ApiService } from './services/api.service';

function App() {
    // Modal and API Services are defined on the App component so they can reference the same instance of the state.
    // This allows all components to reference the same in-memory instances.
    const [modalContent, setModal] = useState(undefined);
    const [apiService] = useState<ApiService>(new ApiService());

	return (
		<>
            <Navigation />
            <section data-testid="layout" className="layout-main">
                <Switch>
                    <Route exact path={PAGES.EMPLOYEES}>
                        <ViewEmployees api={apiService} />
                    </Route>
                    <Route path={`${PAGES.EMPLOYEE}/:id`}>
                        <ViewEmployee api={apiService} setModal={setModal} />
                    </Route>
                    <Route path={PAGES.EMPLOYEE_NEW}>
                        <ViewEmployeeNew api={apiService} setModal={setModal} />
                    </Route>
                    <Route path={PAGES.DEPARTMENTS}>
                        <ViewDepartments api={apiService} />
                    </Route>
                    <Route path={`${PAGES.DEPARTMENT}/:id`}>
                        <ViewDepartment api={apiService} />
                    </Route>
                    <Route path={PAGES.DEPARTMENT_NEW}>
                        <ViewDepartmentNew api={apiService} setModal={setModal} />
                    </Route>
                    <Route path="*">
                        <h2 data-testid="view-404">404 - The page you are looking for does not exist.</h2>
                    </Route>
                </Switch>
            </section>
            <Modal content={modalContent} set={setModal} />
        </>
	);
}

export default App;
