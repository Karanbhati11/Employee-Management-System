import React from "react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import EmployeeDirectory from "./EmployeeDirectory.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeDetails from "./EmployeeDetails.jsx";
import EmployeeEdit from "./EmployeeEdit.jsx";
import ErrorPage from "./ErrorPage.jsx";

class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Button component={RouterLink} to="/" sx={{ color: "white" }}>
                {this.props.name}
              </Button>
            </Typography>
            <Button
              component={RouterLink}
              to="/"
              sx={{ color: "white", marginRight: 2 }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/search/all"
              sx={{ color: "white", marginRight: 2 }}
            >
              Search
            </Button>
            <Button component={RouterLink} to="/create" sx={{ color: "white" }}>
              Create
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: 3, color: "black" }}>
          <Routes>
            <Route path="/" element={<EmployeeDirectory />} />
            <Route path="/search/:type" element={<EmployeeSearch />} />
            <Route path="/search" element={<EmployeeSearch />} />
            <Route path="/create" element={<EmployeeCreate />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/edit/:id" element={<EmployeeEdit />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>
      </React.Fragment>
    );
  }
}

export default Navbar;
