import React from "react";
import api_url from "../api/api.js";

const DELETE_EMPLOYEE_MUTATION = `
  mutation deleteEmployee($id: Int!) {
    deleteEmployee(id: $id)
  }
`;

class DeleteEmployee extends React.Component {
    async handleDelete() {
        const { id, onDeleteComplete } = this.props;
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            const response = await fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: DELETE_EMPLOYEE_MUTATION,
                    variables: { id },
                }),
            });

            const result = await response.json();
            if (result.data && result.data.deleteEmployee) {
                onDeleteComplete();
            }
        }
    }

    render() {
        return (
            <button className="btn btn-danger" onClick={() => this.handleDelete()}>
                Delete
            </button>
        );
    }
}

export default DeleteEmployee;
