import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import api_url from "./api/api.js";
import {
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  FormHelperText,
} from "@mui/material";

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
        [name]: name === "currentStatus" ? parseInt(value, 10) : value,
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

    if (loading)
      return (
        <div className="text-center mt-5">
          <CircularProgress />
        </div>
      );

    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Edit Employee
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstname"
                value={employee.firstname}
                InputProps={{
                  readOnly: true,
                  style: { backgroundColor: "#f0f0f0", color: "#888" },
                }}
                variant="outlined"
                sx={{ borderColor: "text.disabled" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastname"
                value={employee.lastname}
                InputProps={{
                  readOnly: true,
                  style: { backgroundColor: "#f0f0f0", color: "#888" },
                }}
                variant="outlined"
                sx={{ borderColor: "text.disabled" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={employee.age}
                InputProps={{
                  readOnly: true,
                  style: { backgroundColor: "#f0f0f0", color: "#888" },
                }}
                variant="outlined"
                sx={{ borderColor: "text.disabled" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
                value={employee.dateOfJoining}
                InputProps={{
                  readOnly: true,
                  style: { backgroundColor: "#f0f0f0", color: "#888" },
                }}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ borderColor: "text.disabled" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee Type"
                name="employeeType"
                value={employee.employeeType}
                InputProps={{
                  readOnly: true,
                  style: { backgroundColor: "#f0f0f0", color: "#888" },
                }}
                variant="outlined"
                sx={{ borderColor: "text.disabled" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Title</InputLabel>
                <Select
                  name="title"
                  value={formData.title}
                  onChange={this.handleChange}
                  label="Title"
                >
                  <MenuItem value="Employee">Employee</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Director">Director</MenuItem>
                  <MenuItem value="VP">VP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={this.handleChange}
                  label="Department"
                >
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Status"
                name="currentStatus"
                type="number"
                value={formData.currentStatus}
                onChange={this.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default EmployeeEdit(EmployeeEditWrapper);
