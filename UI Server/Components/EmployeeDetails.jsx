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
const EmployeeDetails = (EmployeeDetailsWrapper) => {
    return (props) => {
        const navigate = useNavigate();
        const { id } = useParams();
        return <EmployeeDetailsWrapper navigate={navigate} id={id} />;
    };
};

class EmployeeDetailsWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            loading: true,
            initialId: parseInt(props.id),
        };
    }

    componentDidMount() {
        this.fetchEmployee();
    }

    componentDidUpdate(prevProps) {
        const { id } = this.props;
        if (parseInt(id) !== this.state.initialId) {
            this.props.navigate(`/employee/${this.state.initialId}`);
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
                loading: false,
            });
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const { employee, loading } = this.state;

        if (loading) return <div className="text-center mt-5"><h2>Loading...</h2></div>;

        if (!employee) return <div className="text-center mt-5"><h2>Employee not found</h2></div>;

        return (
            <div className="container mt-5">
                <h2 className="text-center mb-4">Employee Details</h2>
                <ul className="list-group">
                    <li className="list-group-item"><strong>ID:</strong> {employee.id}</li>
                    <li className="list-group-item"><strong>First Name:</strong> {employee.firstname}</li>
                    <li className="list-group-item"><strong>Last Name:</strong> {employee.lastname}</li>
                    <li className="list-group-item"><strong>Age:</strong> {employee.age}</li>
                    <li className="list-group-item"><strong>Date of Joining:</strong> {employee.dateOfJoining}</li>
                    <li className="list-group-item"><strong>Title:</strong> {employee.title}</li>
                    <li className="list-group-item"><strong>Department:</strong> {employee.department}</li>
                    <li className="list-group-item"><strong>Employee Type:</strong> {employee.employeeType}</li>
                    <li className="list-group-item"><strong>Current Status:</strong> {employee.currentStatus ? "Working" : "Retired"}</li>
                </ul>
            </div>
        );
    }
}

export default EmployeeDetails(EmployeeDetailsWrapper); 
