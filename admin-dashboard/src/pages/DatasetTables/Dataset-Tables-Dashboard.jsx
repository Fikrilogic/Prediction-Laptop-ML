import React, { useState } from "react";

import { makeStyles } from "@mui/styles";
import { Container, Box, Typography, Grid } from "@mui/material";

import CpuTable from "../../components/TableComponent/cpu-table.component";
import GpuTable from "../../components/TableComponent/gpu-table.component.jsx";
import StorageTable from "../../components/TableComponent/storage-table.component.jsx";
import ScreenTable from "../../components/TableComponent/screen-table.component.jsx";
import ResolutionTable from "../../components/TableComponent/screen-resolution-table.component.jsx";
import LaptopTypeTable from "../../components/TableComponent/laptop-type-table.component.jsx";
import CompanyTable from "../../components/TableComponent/company-table.component.jsx";
import ModalInput from "../../components/ModalInputComponent/modal-input.component";

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

const DatasetTablesDashboard = () => {
  const classes = useStyle();

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
            <CpuTable />
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6} id="GPU">
            <GpuTable />
          </Grid>

          <Grid item xs={6} id="storage">
            <StorageTable />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} id="company">
            <CompanyTable />
          </Grid>

          <Grid item xs={6} id="type">
            <LaptopTypeTable />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} id="screen">
            <ScreenTable />
          </Grid>

          <Grid item xs={12} id="resolution">
            <ResolutionTable />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DatasetTablesDashboard;
