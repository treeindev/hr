import React from 'react';
import { ModalContent } from '../../utils/models/modal';
import { ApiService } from '../../services/api.service';
import { Department } from '../../utils/models/department';

interface Props {
    api: ApiService;
    setModal: Function;
}

interface State {
    departments: Array<Department>;
    invalidForm: boolean;
    form: {
        name?: string;
        salary?: number;
        department?: number;
    }
}
class ViewEmployeeNew extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * When component gets created, stablish API call to get the list of available departments.
     */
    public async componentDidMount() {
        const departments = await this.props.api.getDepartments();
        this.setState({
            departments: departments,
            invalidForm: false,
            form: {
                name: '',
                salary: 0,
                department: departments[0].id
            }
        });
    }

    public handleChange(event: any) {
        let update: any= {}
        update[event.target.id] = event.target.value;
        this.setState({
            form: {...this.state.form, ...update}
        });
    }

    public async handleSubmit(event: any) {
        event.preventDefault();

        // Validate fields are valid
        if (!this.state.form.name || !this.state.form.salary || !this.state.form.department) {
            this.setState({
                invalidForm: true
            });
            return;
        }
        
        // Send API request to create new employee.
        await this.props.api.createEmployee(this.state.form);

        // Show confirmation modal after creation.
        const modal: ModalContent = {
            title: `New Employee: ${this.state.form.name}`,
            body: "The new emlpoyee has been added to the system successfully.",
            showCaution: false,
            callback: null
        }
        this.props.setModal(modal);
        this.setState({
            invalidForm: false,
            form: {
                name: '',
                salary: 0,
                department: this.state.departments[0].id
            }
        });
    }

    /**
     * Do not render any DOM elements until the state is set.
     */
    public render() {
        return ( <> { this.state ? 
            <div data-testid="view-employee-new" className="cmp__cards">
                <form className="cmp__form" onSubmit={this.handleSubmit}>
                    <h4 className="title">Create New Employee</h4>
                    <div className="group">
                        <label>Employee Name</label>
                        <input id="name" 
                                value={this.state.form.name} 
                                className="fifth" 
                                onChange={this.handleChange} 
                                type="text" 
                                placeholder="Employee Name" />
                    </div>
                    <div className="group">
                        <label>Employee Salary</label>
                        <input id="salary" 
                                value={this.state.form.salary} 
                                className="fifth" 
                                onChange={this.handleChange} 
                                type="number" 
                                placeholder="Salary in €" />
                    </div>
                    <div className="group">
                        <label>Employee Department</label>
                        <select id="department" value={this.state.form.department} className="fifth" onChange={this.handleChange}>
                            <option key="0" disabled={true}>Select Department</option>
                            {this.state.departments.map(department => 
                                <option key={department.id} value={department.id}>{department.name}</option>
                            )}
                        </select>
                    </div>
                    <button type="submit">Create</button>
                    {this.state.invalidForm ? <span className="small m-t-20">Invalid form, please check.</span> : ''}
                </form>
            </div>
        : '' } </>);  
    }
}

/*function ViewEmployeeNew(props: Props) {
    const history = useHistory();

    const create = (event: any) => {
        event.preventDefault();
        const modal: ModalContent = {
            title: "New employee: {{name}}",
            body: "The new employee has been added to the system successfully.",
            showCaution: false,
            callback: null
        }
        props.setModal(modal);
        history.push(PAGES.EMPLOYEES);
    }

    return (
        <div className="cmp__cards">
            <form className="cmp__form" onSubmit={create}>
                <h4 className="title">Create New Employee</h4>
                <div className="group">
                    <label>Employee Name</label>
                    <input className="fifth"  type="text" placeholder="Employee Name" />
                </div>
                <div className="group">
                    <label>Employee Salary</label>
                    <input className="fifth"  type="number" placeholder="Salary in €" />
                </div>
                <div className="group">
                    <label>Employee Department</label>
                    <select className="fifth">
                        <option selected={true}>Select Department</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </div>
                <button>Create</button>
                <button className="spinner m-t-20">
                    <div className="cmp__spinner"></div>
                    Creating
                </button>
            </form>
        </div>
    );
}*/

export default ViewEmployeeNew;