import React, { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";
import {
  Container,
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";

import { fetchUser } from "../../Redux/User/fetch-action";
import UserTableComponent from "../../components/TableComponent/user-table.component";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "100%",
    flexGrow: 1,
  },
  containerDashboard: {
    backgroundColor: "#F4F4F4",
  },
  titlePage: {
    opacity: 0.2,
    position: "relative",
    left: "-50px",
    fontSize: 32,
  },
}));

const UserDashboard = ({ dispatch, user, status, theme }) => {
  const classes = useStyle(theme);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Container
      maxWidth="100%"
      disableGutters
      className={classes.containerDashboard}
    >
      <Box className={classes.mainDashboard}>
        <Container maxWidth="100%" sx={{ width: "75%", mt: 5 }} disableGutters>
          <Typography
            variant="h3"
            component="h1"
            className={classes.titlePage}
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: 64,
            }}
          >
            Dashboard
          </Typography>
        </Container>
        <Card sx={{ mx: "auto", my: "20px", width: "75%" }} raised>
          <CardHeader
            title={<Typography variant="h4">User Table</Typography>}
          />
          <Divider />
          <CardContent>
            <UserTableComponent data={user} dispatch={dispatch} />
          </CardContent>
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
