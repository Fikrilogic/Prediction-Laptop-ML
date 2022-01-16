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
  Divider,
} from "@mui/material";

import DatasetTable from "../../components/TableComponent/dataset-table.component";
import { FetchDataset } from "../../Redux/Dataset/fetch-action.js";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    maxwidth: "70vw",
    flexGrow: 1,
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

const DatasetDashboard = () => {
  // useEffect(() => {
  //   dispatch(FetchDataset());
  //   console.log(results);
  // }, [dispatch]);

  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const saveHandler = () => {
    // window.location.reload();
  };

  return (
    <Container maxWidth="100%" className={classes.containerDashboard}>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "600px",
            height: "auto",
            backgroundColor: "#Fff",
            marginX: "auto",
            marginTop: "10%",
            padding: "20px",
            borderRadius: 8,
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Input New Data
          </Typography>

          <form noValidate autoComplete="off">
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Full Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              className={classes.inputField}
              label="E-mail"
              variant="outlined"
              fullWidth
            />
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Phone Number"
              variant="outlined"
              fullWidth
            />
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              className={classes.inputField}
              label="E-mail"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" onClick={saveHandler}>
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>

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
          Dashboard
        </Typography>

        <Card sx={{ mx: "auto", my: "20px", width: "100%" }} raised>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "25px",
            }}
          >
            <Box sx={{}}>
              <Typography variant="h4">Dataset Table</Typography>
            </Box>

            <Box component="div" sx={{}}>
              <Button
                sx={{ flexGrow: 0, mr: 2 }}
                className={classes.btnDataset}
                variant="contained"
                disableElevation
                onClick={() => setOpen(true)}
              >
                Input Data
              </Button>
              <Button
                sx={{ flexGrow: 0 }}
                className={classes.btnDataset}
                variant="outlined"
                disableElevation
                onClick={() => navigate("/analytic/result")}
              >
                Train Model
              </Button>
            </Box>
          </Box>
          <Divider />
          <CardContent>
            <DatasetTable />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

// const mapStateToProps = (state) => ({
//   method: state.dataset.method,
//   dataset: state.dataset.data,
//   status: state.dataset.status,
//   results: state.dataset.results,
// });
// export default connect(mapStateToProps)(DatasetDashboard);

export default DatasetDashboard;
