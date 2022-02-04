import React from "react";

import { makeStyles } from "@mui/styles";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

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

const UserDashboard = ({ theme }) => {
  const classes = useStyle(theme);

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
            title={<Typography variant="h4">Tabel User</Typography>}
          />
          <Divider />
          <CardContent>
            <UserTableComponent />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default UserDashboard;
