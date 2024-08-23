import React from "react";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api_url from "../api/api.js";

const DELETE_EMPLOYEE_MUTATION = `
  mutation deleteEmployee($id: Int!) {
    deleteEmployee(id: $id)
  }
`;

class DeleteEmployee extends React.Component {
  async handleDelete() {
    const { id, onDeleteComplete } = this.props;

    // Confirm deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      // delete operation
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
      if (result.errors) {
        toast.error(result.errors[0].message);
      } else if (result.data && result.data.deleteEmployee) {
        toast.success("Employee deleted successfully!");
        onDeleteComplete();
      } else {
        toast.error("Failed to delete employee.");
      }
    }
  }

  render() {
    return (
      <>
        <Button
          variant="contained"
          color="error"
          onClick={() => this.handleDelete()}
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: 0,
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Delete
        </Button>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

export default DeleteEmployee;
