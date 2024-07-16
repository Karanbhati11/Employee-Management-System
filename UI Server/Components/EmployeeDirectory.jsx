import React from "react";
import EmployeeTable from "./EmployeeTable.jsx";
import api_url from "./api/api.js";

class EmployeeDirectory extends React.Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            loading: false,
        };

        this.handleEditComplete = this.handleEditComplete.bind(this);
        this.handleDeleteComplete = this.handleDeleteComplete.bind(this);
    }

    componentDidMount() {
        this.loadData();
        console.log(api_url);
    }

    async loadData() {
        this.setState({ loading: true });
        const query = `
        query {
          employeeList {
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
            body: JSON.stringify({ query }),
        });

        const result = await response.json();
        if (result.data) {
            this.setState({ employees: result.data.employeeList });
        }
        this.setState({ loading: false });
    }

    handleEditComplete() {
        this.loadData();
    }

    handleDeleteComplete() {
        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading && <h2>Loading...</h2>}
                {!this.state.loading && (
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="text-center mb-4">Welcome to EMS</h2>
                                <EmployeeTable
                                    employees={this.state.employees}
                                    onEditComplete={this.handleEditComplete}
                                    onDeleteComplete={this.handleDeleteComplete}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default EmployeeDirectory;
