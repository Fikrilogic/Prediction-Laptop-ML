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

const useStyle = makeStyles({});

const AppBarCustome = () => {
  const classes = useStyle();

  return (
    <AppBar position="relative" sx={{ width: "100%"} }>
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            fontFamily="Sansita, sans-serif"
            sx={{ flexGrow: 1, display: { xs: "flex" } }}
          >
            CREAVEN
          </Typography>
          
          <Typography
            variant="h5"
            sx={{ flexGrow: 0, display: { xs: "flex" } }}
          >
            Admin
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
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
