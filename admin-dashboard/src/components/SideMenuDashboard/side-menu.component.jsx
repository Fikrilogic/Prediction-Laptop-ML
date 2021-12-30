import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  ButtonBase,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LogoutIcon from "@mui/icons-material/Logout";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../../Context/context";

import { logout } from "../../Context/action";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "18.75em",
    height: "auto",
    padding: "15px 10px",
    border: `1px solid ${theme.palette.neutral.transparent}`,
    backgroundColor: theme.palette.primary["300"],
    textAlign: "center",
    color: "white",
  },
  boxName: {
    margin: '20px 0px',

  },
  profile: {
    marginBlock: "2rem",
    padding: '20px 0px'
  },
  icon: {
    margin: "0 auto"
  },
  btnIcon: {
    marginRight: "2px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.neutral.main,
    display: "flex",
    cursor: "pointer",
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: "bold",
    border: "none",
  },
  btnBase: {
    width: "100%",
  },
}));

function SideMenuComponent(props) {
  const classes = useStyle(props.theme);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    const req = await logout(dispatch);
    if (req === 200) return navigate("/login");
  };

  return (
    <Box component="div" className={classes.container} boxShadow={5}>
      <Box>
        <Typography className={classes.boxName} sx={{mb: 2}} variant='h5'>Admin Dashboard</Typography>

        <Box component="div" className={classes.profile}>
          <Avatar className={classes.icon} sx={{ width: '60px', height: '60px'}}>
            {/* <SupervisedUserCircleRoundedIcon /> */}
          </Avatar>
          <Typography variant='h6'>ADMIN</Typography>
        </Box>

        <Stack
          spacing={2}
          sx={{ mt: 5, px: 4 }}
          divider={<Divider orientation="horizontal" />}
        >
          <Link to='../user' className={classes.link}>
            <Typography variant='h5'>Master User</Typography>
            <ArrowForwardIosIcon/>
          </Link>
          <Link to='../dataset' className={classes.link}>
            <Typography variant='h5'>Master Dataset</Typography>
            <ArrowForwardIosIcon/>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}

export default SideMenuComponent;
