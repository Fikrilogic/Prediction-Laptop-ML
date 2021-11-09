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
    width: "20%",
    height: "auto",
    padding: "15px 10px",
    border: `1px solid ${theme.palette.neutral.transparent}`,
    borderRadius: "5px",
    backgroundColor: theme.palette.primary["300"],
    textAlign: "center",
    color: "white",
  },
  boxName: {
    fontSize: "1.2rem",
  },
  profile: {
    marginBlock: "1rem",
  },
  icon: {
    margin: "0 auto",
  },
  btnIcon: {
    marginRight: "2px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.neutral.main,
    display: "flex",
    cursor: "pointer",
    width: "100%",
    fontSize: 15,
    fontWeight: "bold",
    border: "none",
  },
  btnBase: {
    width: "100%",
  },
}));

function SideMenu(props) {
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
        <Typography className={classes.boxName}>Admin Dashboard</Typography>

        <Box component="div" className={classes.profile}>
          <Avatar className={classes.icon}>
            {/* <SupervisedUserCircleRoundedIcon /> */}
          </Avatar>
          <Typography>Admin</Typography>
        </Box>

        <Stack
          spacing={1}
          sx={{ mt: 4 }}
          divider={<Divider orientation="horizontal" />}
        >
          <ButtonBase className={classes.btnBase} sx={{ padding: "10px 15px" }}>
            <Link className={classes.link} to="../dashboard/user">
              <ArrowForwardIosIcon className={classes.btnIcon} /> Master User
            </Link>
          </ButtonBase>
          <ButtonBase className={classes.btnBase} sx={{ padding: "10px 15px" }}>
            <Link className={classes.link} to="../dashboard/laptop-type">
              <ArrowForwardIosIcon className={classes.btnIcon} /> Master Tipe
              Laptop
            </Link>
          </ButtonBase>
          <ButtonBase
            className={classes.btnBase}
            sx={{ padding: "10px 15px" }}
            centerRipple={true}
          >
            <Link className={classes.link} padding="" to="../dashboard/laptop">
              <ArrowForwardIosIcon className={classes.btnIcon} /> Master Laptop
            </Link>
          </ButtonBase>
          <ButtonBase className={classes.btnBase} sx={{ padding: "10px 15px" }}>
            <Link className={classes.link} to="../dashboard/spesifikasi">
              <ArrowForwardIosIcon className={classes.btnIcon} /> Master
              Spesifikasi
            </Link>
          </ButtonBase>
          <ButtonBase className={classes.btnBase} sx={{ padding: "10px 15px" }}>
            <Link className={classes.link} to="../dashboard/analytic">
              <ArrowForwardIosIcon className={classes.btnIcon} /> Data Analytic
            </Link>
          </ButtonBase>
          <ButtonBase
            className={classes.btnBase}
            sx={{ padding: "10px 15px" }}
            onClick={handleLogoutClick}
          >
            <div className={classes.link}>
              <LogoutIcon className={classes.btnIcon} /> Log Out
            </div>
          </ButtonBase>
        </Stack>
      </Box>
    </Box>
  );
}

export default SideMenu;
