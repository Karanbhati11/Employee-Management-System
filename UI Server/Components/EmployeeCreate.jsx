import React from "react";
import api_url from "./api/api";
import { useNavigate } from 'react-router-dom';

const EmployeeCreate = (CreateEmployee) => {
    return (props) => {
        const navigate = useNavigate();
        return <CreateEmployee navigate={navigate} />;
    }
}

class CreateEmployee extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            redirect: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createEmployee = this.createEmployee.bind(this);
    }

    async createEmployee(employee) {
        const mutation = `
        mutation {
          insertEmployee(
            firstname: "${employee.firstname}",
            lastname: "${employee.lastname}",
            age: ${employee.age},
            dateOfJoining: "${employee.dateOfJoining}",
            title: "${employee.title}",
            department: "${employee.department}",
            employeeType: "${employee.employeeType}",
            currentStatus: ${employee.currentStatus}
          ) {
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

        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: mutation }),
        });

        const result = await response.json();
        if (result.data) {
            this.props.navigate('/');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.addEmployee;
        const errors = {};

        const employee = {
            firstname: form.firstname.value.trim(),
            lastname: form.lastname.value.trim(),
            age: parseInt(form.age.value.trim()),
            dateOfJoining: form.dateOfJoining.value,
            title: form.title.value,
            department: form.department.value,
            employeeType: form.employeeType.value,
            currentStatus: 1,
        };

        if (!employee.firstname) errors.firstname = "First name is required.";
        if (!employee.lastname) errors.lastname = "Last name is required.";
        if (!employee.age) errors.age = "Age is required.";
        else if (employee.age < 20 || employee.age > 70)
            errors.age = "Age must be between 20 and 70.";
        if (!employee.dateOfJoining)
            errors.dateOfJoining = "Date of joining is required.";
        if (!employee.title) errors.title = "Title is required.";
        if (!employee.department) errors.department = "Department is required.";
        if (!employee.employeeType)
            errors.employeeType = "Employee type is required.";

        this.setState({ errors });

        if (Object.keys(errors).length > 0) return;

        this.createEmployee(employee);

        form.firstname.value = "";
        form.lastname.value = "";
        form.age.value = "";
        form.dateOfJoining.value = "";
        form.title.value = "";
        form.department.value = "";
        form.employeeType.value = "";
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="text-center mb-4">Create Employee</h2>
                <form
                    className="row g-3"
                    name="addEmployee"
                    onSubmit={this.handleSubmit}
                >
                    <div className="col-md-4">
                        <label htmlFor="firstname" className="form-label">
                            Firstname
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            placeholder="Firstname"
                        />
                        {errors.firstname && (
                            <small className="text-danger">{errors.firstname}</small>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="lastname" className="form-label">
                            Lastname
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            placeholder="Lastname"
                        />
                        {errors.lastname && (
                            <small className="text-danger">{errors.lastname}</small>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="age" className="form-label">
                            Age
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            name="age"
                            placeholder="Age"
                        />
                        {errors.age && <small className="text-danger">{errors.age}</small>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="dateOfJoining" className="form-label">
                            Date of Joining
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateOfJoining"
                            name="dateOfJoining"
                            placeholder="Date of Joining"
                        />
                        {errors.dateOfJoining && (
                            <small className="text-danger">{errors.dateOfJoining}</small>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <select className="form-select" id="title" name="title">
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="VP">VP</option>
                        </select>
                        {errors.title && (
                            <small className="text-danger">{errors.title}</small>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="department" className="form-label">
                            Department
                        </label>
                        <select className="form-select" id="department" name="department">
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                        {errors.department && (
                            <small className="text-danger">{errors.department}</small>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="employeeType" className="form-label">
                            Employee Type
                        </label>
                        <select
                            className="form-select"
                            id="employeeType"
                            name="employeeType"
                        >
                            <option value="FullTime">FullTime</option>
                            <option value="PartTime">PartTime</option>
                            <option value="Contract">Contract</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                        {errors.employeeType && (
                            <small className="text-danger">{errors.employeeType}</small>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="currentStatus" className="form-label">
                            Current Status
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="currentStatus"
                            name="currentStatus"
                            placeholder="1"
                            disabled
                            value={1}
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-dark mt-3">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EmployeeCreate(CreateEmployee);
