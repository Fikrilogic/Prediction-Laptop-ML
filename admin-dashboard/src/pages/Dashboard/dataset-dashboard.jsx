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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import DatasetTable from "../../components/TableComponent/dataset-table.component";
import { FetchDataset } from "../../Redux/Dataset/fetch-action.js";
import { useNavigate } from "react-router-dom";
import {
  FetchCompany,
  FetchCpu,
  FetchGpu,
  FetchLaptopType,
  FetchScreenResolution,
  FetchScreenType,
  FetchStorage,
} from "../../Redux/Data/fetch-action";

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

const DatasetDashboard = ({
  cpuList,
  gpuList,
  storageList,
  screenList,
  resolutionList,
  typeList,
  companyList,
  dispatch,
}) => {
  const [data, setData] = useState({
    budget: 0,
    ram: "",
    weight: "",
    price: 0,
    name: "",
    cpu: "",
    gpu: "",
    memory: "",
    company: "",
    screen: "",
    resolution: "",
    type: "",
  });

  useEffect(() => {
    dispatch(FetchCpu());
    dispatch(FetchGpu());
    dispatch(FetchScreenResolution());
    dispatch(FetchScreenType());
    dispatch(FetchCompany());
    dispatch(FetchStorage());
    dispatch(FetchLaptopType());
  }, [dispatch]);

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
              label="Name"
              variant="outlined"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="cpu-select">CPU</InputLabel>
              <Select
                labelId="cpu-select"
                value={data.cpu}
                label="CPU"
                onChange={(e) => setData({ ...data, cpu: e.target.value })}
              >
                {cpuList.map((data) => (
                  <MenuItem key={data.id} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="gpu-select">GPU</InputLabel>
              <Select
                labelId="gpu-select"
                value={data.gpu}
                label="GPU"
                onChange={(e) => setData({ ...data, gpu: e.target.value })}
              >
                {gpuList.map((data) => (
                  <MenuItem key={data.id} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="ram-select">RAM</InputLabel>
              <Select
                labelId="ram-select"
                value={data.ram}
                label="RAM"
                onChange={(e) => setData({ ...data, ram: e.target.value })}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={32}>32</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="storage-select">Memory Type</InputLabel>
              <Select
                labelId="storage-select"
                value={data.storage}
                label="Memory Type"
                onChange={(e) => setData({ ...data, storage: e.target.value })}
              >
                {storageList.map((data) => (
                  <MenuItem key={data.id} value={data.type}>
                    {data.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="company-select">Company</InputLabel>
              <Select
                labelId="company-select"
                value={data.company}
                label="Company"
                onChange={(e) => setData({ ...data, company: e.target.value })}
              >
                {companyList.map((data) => (
                  <MenuItem key={data.id} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="screen-select">Screen Type</InputLabel>
              <Select
                labelId="screen-select"
                value={data.screen}
                label="Screen Type"
                onChange={(e) => setData({ ...data, screen: e.target.value })}
              >
                {screenList.map((data) => (
                  <MenuItem key={data.id} value={data.type}>
                    {data.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="resolution-select">Screen Resolution</InputLabel>
              <Select
                labelId="resolution-select"
                value={data.resolution}
                label="Screen Resolution"
                onChange={(e) =>
                  setData({ ...data, resolution: e.target.value })
                }
              >
                {resolutionList.map((data) => (
                  <MenuItem key={data.id} value={data.resolution}>
                    {data.resolution}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              className={classes.inputField}
              label="Weight"
              variant="outlined"
              onChange={(e) =>
                setData({ ...data, weight: parseInt(e.target.value) })
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="type-select">Laptop Type</InputLabel>
              <Select
                labelId="type-select"
                value={data.type}
                label="Laptop Type"
                onChange={(e) => setData({ ...data, type: e.target.value })}
              >
                {resolutionList.map((data) => (
                  <MenuItem key={data.id} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Budget"
              variant="outlined"
              onChange={(e) =>
                setData({ ...data, budget: parseInt(e.target.value) })
              }
              fullWidth
            />
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              className={classes.inputField}
              label="Price"
              variant="outlined"
              onChange={(e) =>
                setData({ ...data, price: parseInt(e.target.value) })
              }
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

const mapStateToProps = (state) => ({
  cpuList: state.data.cpu,
  gpuList: state.data.gpu,
  storageList: state.data.storage,
  screenList: state.data.screen,
  resolutionList: state.data.resolution,
  typeList: state.data.laptop_type,
  companyList: state.data.company,
});
export default connect(mapStateToProps)(DatasetDashboard);

// export default DatasetDashboard;
