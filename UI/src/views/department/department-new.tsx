import React from 'react';
import { ApiService } from '../../services/api.service';
import { ModalContent } from '../../utils/models/modal';

interface Props {
    api: ApiService;
    setModal: Function;
}

interface State {
    form: {
        name: string;
    }
}

class ViewDepartmentNew extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            form: {
                name: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: any) {
        this.setState({
            form: {
                name: event.target.value
            }
        });
    }

    public async handleSubmit(event: any) {
        event.preventDefault();
        
        // Send API request to create new department.
        await this.props.api.createDepartment(this.state.form.name);

        // Show confirmation modal after creation.
        const modal: ModalContent = {
            title: `New department: ${this.state.form.name}`,
            body: "The new department has been added to the system successfully.",
            showCaution: false,
            callback: null
        }
        this.props.setModal(modal);
    }

    public render() {
        return (
            <div className="cmp__cards">
                <form className="cmp__form" onSubmit={this.handleSubmit}>
                    <h4 className="title">Create New Department</h4>
                    <div className="group">
                        <label>Department Name</label>
                        <input className="fifth" type="text" placeholder="Enter name..." value={this.state.form.name} onChange={this.handleChange} />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        );  
    }
}

export default ViewDepartmentNew;