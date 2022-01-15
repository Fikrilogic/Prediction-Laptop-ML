import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";
import {
  Container,
  Box,
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent,
  Modal,
  TextField,
  ButtonGroup,
  Divider,
} from "@mui/material";

import DatasetTable from "../../components/TableComponent/dataset-table.component";
import { FetchDataset } from "../../Redux/Dataset/fetch-action.js";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "100%",
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

const DatasetDashboard = ({ dispatch, dataset, status, loading }) => {
  useEffect(() => {
    // dispatch(FetchDataset());
  }, [dispatch]);

  const classes = useStyle();
  const [open, setOpen] = useState(false);

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
            <ButtonGroup>
              <Button variant="contained" onClick={saveHandler}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </ButtonGroup>
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
              >
                Train Model
              </Button>
            </Box>
          </Box>
          <Divider />
          <CardContent>
            <DatasetTable data={dataset} dispatch={dispatch} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.dataset.loading,
  dataset: state.dataset.data,
  status: state.dataset.status,
});

export default connect(mapStateToProps)(DatasetDashboard);
