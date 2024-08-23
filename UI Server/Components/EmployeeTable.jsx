import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Box,
} from "@mui/material";
import DeleteEmployee from "./utils/DeleteEmployee.jsx";

class EmployeeTable extends React.Component {
  render() {
    return (
      <TableContainer
        component={Paper}
        sx={{ marginBottom: 4 }} // Add margin-bottom here
      >
        <Table aria-label="employee table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell sx={{ color: "white" }}>Id</TableCell>
              <TableCell sx={{ color: "white" }}>FirstName</TableCell>
              <TableCell sx={{ color: "white" }}>LastName</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Date Of Joining</TableCell>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Department</TableCell>
              <TableCell sx={{ color: "white" }}>Employee Type</TableCell>
              <TableCell sx={{ color: "white" }}>Current Status</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                <TableRow key={id} hover>
                  <TableCell>{id}</TableCell>
                  <TableCell>{firstname}</TableCell>
                  <TableCell>{lastname}</TableCell>
                  <TableCell>{age}</TableCell>
                  <TableCell>{dateOfJoining}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{department}</TableCell>
                  <TableCell>{employeeType}</TableCell>
                  <TableCell>{currentStatus ? "Working" : "Retired"}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Button
                        component={Link}
                        to={`/employee/${id}`}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: 0,
                          "&:hover": {
                            backgroundColor: "#002D72",
                          },
                        }}
                      >
                        View
                      </Button>
                      <Button
                        component={Link}
                        to={`/edit/${id}`}
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: 0,
                          "&:hover": {
                            backgroundColor: "#F4C300",
                          },
                        }}
                      >
                        Edit
                      </Button>
                      <DeleteEmployee
                        id={id}
                        onDeleteComplete={this.props.onDeleteComplete}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default EmployeeTable;
