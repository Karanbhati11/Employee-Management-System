import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import api_url from "./api/api.js";

const GET_EMPLOYEE_QUERY = `
  query getEmployee($id: Int!) {
    getEmployee(id: $id) {
      id
      firstname
      lastname
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

const UPDATE_EMPLOYEE_MUTATION = `
  mutation updateEmployee($id: Int!, $title: String, $department: String, $currentStatus: Int) {
    updateEmployee(id: $id, title: $title, department: $department, currentStatus: $currentStatus) {
      id
      title
      department
      currentStatus
    }
  }
`;

const EmployeeEdit = (EmployeeEdit) => {
    return (props) => {
        const navigate = useNavigate();
        const { id } = useParams();
        return <EmployeeEdit navigate={navigate} id={id} />;
    };
};

class EmployeeEditWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            loading: true,
            initialId: parseInt(props.id),
            formData: {
                title: "",
                department: "",
                currentStatus: 1,
            },
        };
    }

    componentDidMount() {
        this.fetchEmployee();
    }

    componentDidUpdate(prevProps) {
        const { id } = this.props;
        if (parseInt(id) !== this.state.initialId) {
            this.props.navigate(`/edit/${this.state.initialId}`);
        }
    }

    async fetchEmployee() {
        const { initialId } = this.state;
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: GET_EMPLOYEE_QUERY,
                variables: { id: initialId },
            }),
        });

        const result = await response.json();
        if (result.data && result.data.getEmployee) {
            this.setState({
                employee: result.data.getEmployee,
                formData: {
                    title: result.data.getEmployee.title,
                    department: result.data.getEmployee.department,
                    currentStatus: result.data.getEmployee.currentStatus,
                },
                loading: false,
            });
        } else {
            this.setState({ loading: false });
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: name === 'currentStatus' ? parseInt(value, 10) : value,
            },
        }));
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { initialId, formData } = this.state;
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: UPDATE_EMPLOYEE_MUTATION,
                variables: {
                    id: initialId,
                    ...formData,
                },
            }),
        });

        const result = await response.json();
        if (result.data && result.data.updateEmployee) {
            this.props.navigate(`/employee/${initialId}`);
        }
    };

    render() {
        const { employee, loading, formData } = this.state;

        if (loading) return <div className="text-center mt-5"><h2>Loading...</h2></div>;

        return (
            <div className="container mt-5">
                <h2 className="text-center mb-4">Edit Employee</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstname" name="firstname" value={employee.firstname} disabled />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastname" name="lastname" value={employee.lastname} disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" className="form-control" id="age" name="age" value={employee.age} disabled />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="dateOfJoining" className="form-label">Date of Joining</label>
                            <input type="date" className="form-control" id="dateOfJoining" name="dateOfJoining" value={employee.dateOfJoining} disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="employeeType" className="form-label">Employee Type</label>
                            <input type="text" className="form-control" id="employeeType" name="employeeType" value={employee.employeeType} disabled />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="title" className="form-label">Title</label>
                            <select className="form-select" id="title" name="title" value={formData.title} onChange={this.handleChange}>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="department" className="form-label">Department</label>
                            <select className="form-select" id="department" name="department" value={formData.department} onChange={this.handleChange}>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="currentStatus" className="form-label">Current Status</label>
                            <input type="number" className="form-control" id="currentStatus" name="currentStatus" value={formData.currentStatus} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-dark">Update</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EmployeeEdit(EmployeeEditWrapper);
