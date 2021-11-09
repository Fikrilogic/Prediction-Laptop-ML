import React, { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";
import { Container, Box, Card, Typography } from "@mui/material";

import SideMenu from "../../components/SideMenuDashboard/side-menu";
import { fetchUser } from "../../Redux/User/fetch-action";
import UserTable from "../../components/TableComponent/user-table";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "80%",
    boxShadow: 3,
    padding: "10px 15px",
    marginLeft: "10px",
  },
}));

const UserDashboard = ({ dispatch, user, status, theme }) => {
  const classes = useStyle(theme);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ display: "flex", margin: "5px 0px" }}>
      <SideMenu />
      <Box className={classes.mainDashboard}>
        <Typography variant="h4">Data User</Typography>

        <Card sx={{ mt: 5 }}>
          <UserTable data={user} dispatch={dispatch} />
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.users,
  status: state.user.status,
});

export default connect(mapStateToProps)(UserDashboard);
