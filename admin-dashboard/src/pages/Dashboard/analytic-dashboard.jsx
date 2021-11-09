import React from "react";

import { Container, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import SideMenu from "../../components/SideMenuDashboard/side-menu";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "80%",
    boxShadow: 3,
    border: "1px solid #000",
    padding: "10px 15px",
    marginLeft: "10px",
  },
}));

function AnalyticDashboard(props) {
  const classes = useStyle(props);

  return (
    <Container maxWidth="lg" sx={{ display: "flex", margin: "10px 0px" }}>
      <SideMenu />
      <Box className={classes.mainDashboard}>Analytic Dashboard</Box>
    </Container>
  );
}

export default AnalyticDashboard;
