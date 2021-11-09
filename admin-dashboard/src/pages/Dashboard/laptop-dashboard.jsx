import React from "react";

import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";

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

function LaptopDashboard({ laptop, theme, dispatch }) {
  const classes = useStyle(theme);

  return (
    <Container maxWidth="lg" sx={{ display: "flex", margin: "10px 0px" }}>
      <SideMenu />
      <Box className={classes.mainDashboard}>Laptop Dashboard</Box>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  laptop: state.laptop.laptops,
});

export default connect(mapStateToProps)(LaptopDashboard);
