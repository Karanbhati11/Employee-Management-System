import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import api_url from "./api/api.js";
import EmployeeTable from "./EmployeeTable.jsx";

const SEARCH_EMPLOYEES_QUERY = `
  query searchEmployees($employeeType: String) {
    searchEmployees(employeeType: $employeeType) {
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

const EmployeeSearch = (EmployeeSearch) => {
    EmployeeSearchWrapper
    return (props) => {
        const navigate = useNavigate();
        const { type } = useParams();
        return <EmployeeSearch navigate={navigate} type={type} />;
    };
};

class EmployeeSearchWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            employeeType: props.type || "all",
            initialType: props.type || "all",
        };
    }

    componentDidMount() {
        this.searchEmployees(this.state.initialType);
    }

    componentDidUpdate(prevProps) {
        const { type } = this.props;
        if (type !== this.state.initialType) {
            this.props.navigate(`/search/${this.state.initialType}`);
        }
    }

    async searchEmployees(employeeType) {
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: SEARCH_EMPLOYEES_QUERY,
                variables: { employeeType: employeeType === "all" ? "" : employeeType },
            }),
        });

        const result = await response.json();
        if (result.data && result.data.searchEmployees) {
            this.setState({ results: result.data.searchEmployees });
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            employeeType: value,
            initialType: value,
        });
        this.props.navigate(`/search/${value}`);
        this.searchEmployees(value);
    };

    render() {
        const { results, employeeType } = this.state;

        return (
            <React.Fragment>
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Employee Search</h2>
                    <form className="mb-4">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <label htmlFor="employeeType" className="form-label">
                                    Employee Type
                                </label>
                                <select
                                    id="employeeType"
                                    name="employeeType"
                                    value={employeeType}
                                    onChange={this.handleChange}
                                    className="form-select"
                                >
                                    <option value="all">All</option>
                                    <option value="FullTime">FullTime</option>
                                    <option value="PartTime">PartTime</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Seasonal">Seasonal</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <EmployeeTable employees={results} />
                </div>
            </React.Fragment>
        );
    }
}

export default EmployeeSearch(EmployeeSearchWrapper);
