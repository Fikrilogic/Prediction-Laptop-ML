import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import { HashLink as Link } from "react-router-hash-link";

import TableViewIcon from "@mui/icons-material/TableView";
import LaptopIcon from '@mui/icons-material/Laptop';
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";

import { makeStyles } from "@mui/styles";
import { AuthContext } from "../../Context/context";

import { logout } from "../../Context/action";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "18em",
    height: "100vh",
    padding: "15px 10px",
    border: `1px solid ${theme.palette.neutral.transparent}`,
    backgroundColor: theme.palette.primary["300"],
    textAlign: "center",
    color: "white",
    flexGrow: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

function SideMenuComponent(props) {
  const classes = useStyle(props.theme);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const req = await logout(dispatch);
    if (req === 200) {
      return navigate("/login");
    }
  };

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <Drawer anchor="left" variant="permanent">
      <Toolbar />
      <Box component="div" className={classes.container} boxShadow={5}>
        <List>
          <ListItemButton onClick={() => navigate("/dataset")}>
            <ListItemIcon sx={{ color: "white" }}>
              <TableViewIcon />
            </ListItemIcon>
            <ListItemText primary="Master Dataset" />
            {open ? (
              <Tooltip title="Collapse">
                <ExpandLess onClick={() => setOpen(!open)} />
              </Tooltip>
            ) : (
              <Tooltip title="Expand">
                <ExpandMore onClick={() => setOpen(!open)} />
              </Tooltip>
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                "CPU",
                "GPU",
                "storage",
                "type",
                "screen",
                "resolution",
                "kebutuhan",
                "company"
              ].map((item, index) => (
                <ListItemButton sx={{ pl: 4 }} key={index}>
                  <ListItemIcon sx={{ color: "white" }}></ListItemIcon>
                  <Link
                    className={classes.link}
                    smooth
                    style={{
                      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                      margin: 0,
                      fontWeight: 400,
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      letterSpacing: "0.00938em",
                      display: "block",
                    }}
                    scroll={(el) => scrollWithOffset(el)}
                    to={`../dataset/tables#${item}`}
                  >{`Tabel ${item.replace(
                    item[0],
                    item[0].toUpperCase()
                  )}`}</Link>
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={() => navigate("/laptop")}>
            <ListItemIcon sx={{ color: "white" }}>
              <LaptopIcon />
            </ListItemIcon>
            <ListItemText primary="Master Laptop" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/user")}>
            <ListItemIcon sx={{ color: "white" }}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Master User" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Performance Testing" />
            {open2 ? (
              <Tooltip title="Collapse">
                <ExpandLess onClick={() => setOpen2(!open2)} />
              </Tooltip>
            ) : (
              <Tooltip title="Expand">
                <ExpandMore onClick={() => setOpen2(!open2)} />
              </Tooltip>
            )}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={{ color: "white" }}></ListItemIcon>
                <Link
                  className={classes.link}
                  smooth
                  style={{
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                    margin: 0,
                    fontWeight: 400,
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    letterSpacing: "0.00938em",
                    display: "block",
                  }}
                  scroll={(el) => scrollWithOffset(el)}
                  to="../analytic/result"
                >
                  Training Model Results
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={{ color: "white" }}></ListItemIcon>
                <Link
                  className={classes.link}
                  smooth
                  style={{
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                    margin: 0,
                    fontWeight: 400,
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    letterSpacing: "0.00938em",
                    display: "block",
                  }}
                  scroll={(el) => scrollWithOffset(el)}
                  to="../analytic/cross-validation"
                >
                  Cross Validation
                </Link>
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleLogoutClick}>
            <ListItemIcon sx={{ color: "white" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}

export default SideMenuComponent;
