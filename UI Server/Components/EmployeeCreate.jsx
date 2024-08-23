import React from "react";
import api_url from "./api/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Grid,
  FormHelperText,
} from "@mui/material";

const EmployeeCreate = (CreateEmployee) => {
  return (props) => {
    const navigate = useNavigate();
    return <CreateEmployee navigate={navigate} />;
  };
};

class CreateEmployee extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      redirect: false,
      employee: {
        firstname: "",
        lastname: "",
        age: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
        currentStatus: 1,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createEmployee = this.createEmployee.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      employee: {
        ...prevState.employee,
        [name]: value,
      },
    }));
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
      this.props.navigate("/");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { employee } = this.state;
    const errors = {};

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
  }

  render() {
    const { errors, employee } = this.state;

    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Create Employee
        </Typography>
        <form name="addEmployee" onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Firstname"
                name="firstname"
                variant="outlined"
                value={employee.firstname}
                onChange={this.handleChange}
                error={Boolean(errors.firstname)}
                helperText={errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Lastname"
                name="lastname"
                variant="outlined"
                value={employee.lastname}
                onChange={this.handleChange}
                error={Boolean(errors.lastname)}
                helperText={errors.lastname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                variant="outlined"
                value={employee.age}
                onChange={this.handleChange}
                error={Boolean(errors.age)}
                helperText={errors.age}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
                variant="outlined"
                value={employee.dateOfJoining}
                onChange={this.handleChange}
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.dateOfJoining)}
                helperText={errors.dateOfJoining}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={Boolean(errors.title)}
              >
                <InputLabel>Title</InputLabel>
                <Select
                  name="title"
                  label="Title"
                  value={employee.title}
                  onChange={this.handleChange}
                >
                  <MenuItem value="Employee">Employee</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Director">Director</MenuItem>
                  <MenuItem value="VP">VP</MenuItem>
                </Select>
                <FormHelperText>{errors.title}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={Boolean(errors.department)}
              >
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  label="Department"
                  value={employee.department}
                  onChange={this.handleChange}
                >
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                </Select>
                <FormHelperText>{errors.department}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={Boolean(errors.employeeType)}
              >
                <InputLabel>Employee Type</InputLabel>
                <Select
                  name="employeeType"
                  label="Employee Type"
                  value={employee.employeeType}
                  onChange={this.handleChange}
                >
                  <MenuItem value="FullTime">FullTime</MenuItem>
                  <MenuItem value="PartTime">PartTime</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Seasonal">Seasonal</MenuItem>
                </Select>
                <FormHelperText>{errors.employeeType}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Status"
                name="currentStatus"
                value={employee.currentStatus}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "#002D72",
                  },
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default EmployeeCreate(CreateEmployee);
