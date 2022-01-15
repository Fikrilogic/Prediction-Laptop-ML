import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";
import {
  Container,
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  Modal,
  TextField,
  ButtonGroup,
  Divider,
  Grid,
} from "@mui/material";

import { FetchDataset } from "../../Redux/Dataset/fetch-action.js";
import CpuTable from "../../components/TableComponent/cpu-table.component";
import GpuTable from "../../components/TableComponent/gpu-table.component.jsx";
import { useLocation } from "react-router-dom";
import StorageTable from "../../components/TableComponent/storage-table.component.jsx";
import ScreenTable from "../../components/TableComponent/screen-table.component.jsx";
import ResolutionTable from "../../components/TableComponent/screen-resolution-table.component.jsx";
import LaptopTypeTable from "../../components/TableComponent/laptop-type-table.component.jsx";
import CompanyTable from "../../components/TableComponent/company-table.component.jsx";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "100%",
    flexGrow: 1,
    paddingBottom: "20px",
  },
  containerDashboard: {
    backgroundColor: "#F4F4F4",
  },
  titlePage: {
    opacity: 0.2,
    position: "relative",
    left: "10px",
    fontSize: 32,
  },
}));

const DatasetTablesDashboard = ({ dispatch, dataset, status, loading }) => {
  const location = useLocation().pathname;
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // dispatch(FetchDataset());
  }, [dispatch, location]);

  const saveHandler = () => {
    // window.location.reload();
  };

  return (
    <Container maxWidth="100%" className={classes.containerDashboard}>
      <Box className={classes.mainDashboard}>
        <Typography
          variant="h3"
          component="h1"
          className={classes.titlePage}
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: 64,
            mt: 5,
          }}
        >
          Dataset
        </Typography>

        <Grid container>
          <Grid item xs={6} id="CPU">
            <CpuTable data={dataset} dispatch={dispatch} />
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6} id="GPU">
            <GpuTable data={dataset} dispatch={dispatch} />
          </Grid>

          <Grid item xs={6} id="storage">
            <StorageTable data={dataset} dispatch={dispatch} />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} id="company">
            <CompanyTable data={dataset} dispatch={dispatch} />
          </Grid>

          <Grid item xs={6} id="type">
            <LaptopTypeTable data={dataset} dispatch={dispatch} />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} id="screen">
            <ScreenTable data={dataset} dispatch={dispatch} />
          </Grid>

          <Grid item xs={12} id="resolution">
            <ResolutionTable data={dataset} dispatch={dispatch} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.dataset.loading,
  dataset: state.dataset.data,
  status: state.dataset.status,
});

export default connect(mapStateToProps)(DatasetTablesDashboard);
