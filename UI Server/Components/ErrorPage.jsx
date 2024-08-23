import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";

const ErrorPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Card variant="outlined" sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h3" color="error" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="h6" paragraph>
            Sorry, the page you are looking for does not exist.
          </Typography>
          <Box mt={2}>
            <Button component={Link} to="/" variant="contained" color="primary">
              Go to Home
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ErrorPage;
