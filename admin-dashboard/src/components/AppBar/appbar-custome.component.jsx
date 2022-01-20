import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import { makeStyles } from "@mui/styles";

import React from "react";

const useStyle = makeStyles(() => ({
  userProfile: {
    cursor: "pointer",
  },
}));

const AppBarCustome = () => {
  const classes = useStyle();

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
            className={classes.userProfile}
          >
            CREAVEN
          </Typography>

          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}
            className={classes.userProfile}
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
