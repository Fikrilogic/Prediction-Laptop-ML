import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles(() => ({
  userProfile: {
    cursor: "pointer",
  },
}));

const AppBarCustome = () => {
  const classes = useStyle();
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            fontFamily="Sansita, sans-serif"
            sx={{ flexGrow: 1, display: { xs: "flex" } }}
          >
            CREAVEN
          </Typography>

          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}
            className={classes.userProfile}
            onClick={() => navigate("../profile")}
          >
            <Typography variant="h5">Admin</Typography>
            <IconButton size="large">
              <Avatar />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppBarCustome;
