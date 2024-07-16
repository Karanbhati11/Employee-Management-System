import React from "react";
import { Link } from "react-router-dom";
import DeleteEmployee from "./utils/DeleteEmployee.jsx";

class EmployeeTable extends React.Component {
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Age</th>
                            <th scope="col">DateOfJoining</th>
                            <th scope="col">Title</th>
                            <th scope="col">Department</th>
                            <th scope="col">EmployeeType</th>
                            <th scope="col">CurrentStatus</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.employees.map((employee) => {
                            const {
                                id,
                                firstname,
                                lastname,
                                age,
                                dateOfJoining,
                                title,
                                department,
                                employeeType,
                                currentStatus,
                            } = employee;
                            return (
                                <tr key={id}>
                                    <th scope="row">{id}</th>
                                    <td>{firstname}</td>
                                    <td>{lastname}</td>
                                    <td>{age}</td>
                                    <td>{dateOfJoining}</td>
                                    <td>{title}</td>
                                    <td>{department}</td>
                                    <td>{employeeType}</td>
                                    <td>{currentStatus ? "Working" : "Retired"}</td>
                                    <td>
                                        <Link className="btn btn-primary btn-sm me-2" to={`/employee/${id}`}>View</Link>
                                        <Link className="btn btn-secondary btn-sm me-2" to={`/edit/${id}`}>Edit</Link>
                                        <DeleteEmployee id={id} onDeleteComplete={this.props.onDeleteComplete} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EmployeeTable;
