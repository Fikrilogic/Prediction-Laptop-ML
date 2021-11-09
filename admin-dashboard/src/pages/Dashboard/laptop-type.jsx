import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import {
  Box,
  Container,
  Typography,
  Card,
  ButtonGroup,
  Button,
} from "@mui/material";
import { connect } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import SideMenu from "../../components/SideMenuDashboard/side-menu";
import LaptopTypeTable from "../../components/TableComponent/laptop-type.table";
import { fetchTypeData } from "../../Redux/laptop-tipe/fetch-action";

const useStyle = makeStyles((theme) => ({
  mainContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "5px 5px",
  },
  mainDashboard: {
    width: "80%",
    boxShadow: 3,
    padding: "10px 15px",
    marginLeft: "10px",
  },
}));

function LaptopTypeDashboard({ theme, dispatch, loading, data, status }) {
  const classes = useStyle(theme);
  const [display, setDisplay] = useState(false);
  const [typeId, setTypeId] = useState(1);

  const HandleFormDisplayClick = (e) => {
    e.preventDefault();
    setDisplay(true);
  };

  useEffect(() => {
    // window.location.reload();
    dispatch(fetchTypeData());
  }, [dispatch]);

  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        margin: "5px 0px",
      }}
    >
      <SideMenu />
      <Box className={classes.mainDashboard}>
        <Typography variant="h4">Data Tipe Laptop</Typography>
        <Card sx={{ mt: 5, width: "75%" }}>
          {display ? (
            <Outlet />
          ) : (
            <>
              <ButtonGroup>
                <Button
                  color="success"
                  variant="contained"
                  onClick={HandleFormDisplayClick}
                >
                  <Link
                    to={"add"}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    Add
                  </Link>
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={HandleFormDisplayClick}
                >
                  <Link
                    to={`${typeId}`}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    Update
                  </Link>
                </Button>
              </ButtonGroup>
              <LaptopTypeTable data={data} />
            </>
          )}
        </Card>
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  loading: state.type_laptop.loading,
  data: state.type_laptop.data,
  status: state.type_laptop.status,
});

export default connect(mapStateToProps)(LaptopTypeDashboard);
