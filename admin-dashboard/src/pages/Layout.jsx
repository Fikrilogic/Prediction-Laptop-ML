import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import SideMenuComponent from "../components/SideMenuDashboard/side-menu.component";
import AppBarCustome from "../components/AppBar/appbar-custome.component";

const useStyle = makeStyles((theme) => ({
  containerDashboard: {
    display: "flex",
    width: "100%",
    backgroundColor: "#F4F4F4",
  },
}));

const Layout = ({ theme, element }) => {
  const classes = useStyle(theme);

  return (
    <Container maxWidth="100%" disableGutters>
      <AppBarCustome />
      <SideMenuComponent />
      <Box className={classes.containerDashboard} sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}></Box>
        <Box
          sx={{
            minHeight: "93.25vh",
            flex: 5,
          }}
        >
          {element}
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.users,
  status: state.user.status,
});

export default connect(mapStateToProps)(Layout);
