import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import api_url from "./api/api.js";
import EmployeeTable from "./EmployeeTable.jsx";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";

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

const EmployeeSearch = (EmployeeSearchWrapper) => {
  return (props) => {
    const navigate = useNavigate();
    const { type } = useParams();
    return <EmployeeSearchWrapper navigate={navigate} type={type} />;
  };
};

class EmployeeSearchWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      employeeType: props.type || "all",
      initialType: props.type || "all",
      showUpcomingRetirements: false,
    };
  }

  componentDidMount() {
    this.searchEmployees(
      this.state.initialType,
      this.state.showUpcomingRetirements
    );
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props;
    if (type !== this.state.initialType) {
      this.props.navigate(`/search/${this.state.initialType}`);
    }
  }

  async searchEmployees(employeeType, showUpcomingRetirements) {
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
      let filteredResults = result.data.searchEmployees;

      if (showUpcomingRetirements) {
        const sixMonthsInMillis = 6 * 30 * 24 * 60 * 60 * 1000;
        const currentDate = new Date();
        filteredResults = filteredResults.filter((employee) => {
          const retirementAge = 65;
          const yearsLeft = retirementAge - employee.age;
          const retirementDate = new Date(employee.dateOfJoining);
          retirementDate.setFullYear(retirementDate.getFullYear() + yearsLeft);
          const timeDiff = retirementDate - currentDate;
          return timeDiff > 0 && timeDiff <= sixMonthsInMillis;
        });
      }

      this.setState({ results: filteredResults });
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      employeeType: value,
      initialType: value,
    });
    this.props.navigate(`/search/${value}`);
    this.searchEmployees(value, this.state.showUpcomingRetirements);
  };

  handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    this.setState({ showUpcomingRetirements: isChecked }, () => {
      this.searchEmployees(this.state.employeeType, isChecked);
    });
  };

  render() {
    const { results, employeeType, showUpcomingRetirements } = this.state;

    return (
      <Container sx={{ marginTop: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Employee Search
        </Typography>
        <form>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ marginBottom: 4 }}
          >
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="employeeType-label" sx={{ color: "black" }}>
                  Employee Type
                </InputLabel>
                <Select
                  labelId="employeeType-label"
                  id="employeeType"
                  name="employeeType"
                  value={employeeType}
                  onChange={this.handleChange}
                  label="Employee Type"
                  sx={{ color: "black", borderColor: "black", borderRadius: 0 }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="FullTime">FullTime</MenuItem>
                  <MenuItem value="PartTime">PartTime</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Seasonal">Seasonal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showUpcomingRetirements}
                    onChange={this.handleCheckboxChange}
                    sx={{ color: "black" }}
                  />
                }
                label="Show Upcoming Retirements (6 months)"
                sx={{ color: "black" }}
              />
            </Grid>
          </Grid>
        </form>
        <div style={{ marginTop: "24px" }}>
          <EmployeeTable employees={results} />
        </div>
      </Container>
    );
  }
}

export default EmployeeSearch(EmployeeSearchWrapper);
