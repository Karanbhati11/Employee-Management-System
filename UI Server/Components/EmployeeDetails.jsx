import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import api_url from "./api/api.js";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Box,
  Paper,
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
      retirementDetails: {},
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
      const employee = result.data.getEmployee;
      const retirementDetails = this.calculateRetirement(employee);
      this.setState({
        employee,
        retirementDetails,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  calculateRetirement(employee) {
    const retirementAge = 65;
    const currentAge = employee.age; 
    const yearsLeft = retirementAge - currentAge; 

    if (yearsLeft <= 0) {
      return { daysLeft: 0, monthsLeft: 0, yearsLeftFinal: 0 };
    }

    const retirementDate = new Date(employee.dateOfJoining); 

    retirementDate.setFullYear(retirementDate.getFullYear() + yearsLeft); 

    const currentDate = new Date();
    const timeDiff = retirementDate - currentDate;

    if (timeDiff <= 0) {
      return { daysLeft: 0, monthsLeft: 0, yearsLeftFinal: 0 };
    }

    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const monthsLeft = Math.floor(daysLeft / 30.44);
    const yearsLeftFinal = Math.floor(monthsLeft / 12);

    return {
      daysLeft: Math.floor(daysLeft % 30.44),
      monthsLeft: Math.floor(monthsLeft % 12),
      yearsLeftFinal,
    };
  }

  render() {
    const { employee, loading, retirementDetails } = this.state;

    if (loading) {
      return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Container>
      );
    }

    if (!employee) {
      return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h6">Employee not found</Typography>
        </Container>
      );
    }

    const { daysLeft, monthsLeft, yearsLeftFinal } = retirementDetails;

    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Employee Details
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                <strong>ID:</strong> {employee.id}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>First Name:</strong> {employee.firstname}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Last Name:</strong> {employee.lastname}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Age:</strong> {employee.age}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Date of Joining:</strong> {employee.dateOfJoining}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Title:</strong> {employee.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Department:</strong> {employee.department}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Employee Type:</strong> {employee.employeeType}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Current Status:</strong>{" "}
                {employee.currentStatus ? "Working" : "Retired"}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                <strong>Retirement Countdown:</strong> {yearsLeftFinal} years,{" "}
                {monthsLeft} months, {daysLeft} days left
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default EmployeeDetails(EmployeeDetailsWrapper);
