import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@mui/styles";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";

import DatasetTable from "../../components/TableComponent/dataset-table.component";
import {
  FetchCompany,
  FetchCpu,
  FetchGpu,
  FetchKebutuhan,
  FetchLaptopType,
  FetchScreenResolution,
  FetchScreenType,
  FetchStorage,
} from "../../Redux/Data/fetch-action";
import ModalInputDataset from "../../components/ModalInputComponent/modal-input-dataset.component";

import axios from "axios";
import { URL } from "../../Context/action";
import { FailRequest } from "../../Redux/User/action";
import { FetchDataset } from "../../Redux/Dataset/fetch-action";
import { ButtonGroup } from "@mui/material";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchDataset());
    dispatch(FetchDataset());
    dispatch(FetchCpu());
    dispatch(FetchGpu());
    dispatch(FetchScreenResolution());
    dispatch(FetchScreenType());
    dispatch(FetchCompany());
    dispatch(FetchStorage());
    dispatch(FetchLaptopType());
    dispatch(FetchKebutuhan());
  }, [dispatch]);

  const [data, setData] = useState({
    cpu: "",
    gpu: "",
    memory: "",
    company: "",
    screen: "",
    sc_res: "",
    type: "",
    kebutuhan: "",
    budget: 0,
    weight: "",
    ram: "",
    price: 0,
    name: "",
  });

  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const formData = new FormData();
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  const saveHandler = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post(URL + "dataset/", data, {
        withCredentials: true,
      });
      if (req.status === 201) console.log("add data berhasil");
    } catch (e) {
      console.log(e);
      dispatch(FailRequest());
    }
    console.log(data);
    window.location.reload();
  };

  const handleChange = (e) => {
    setFile(null);
    const fileUploaded = e.target.files[0];
    setFile(fileUploaded);
  };

  const uploadExcel = async () => {
    formData.append("file", file);
    try {
      const req = await axios.post(
        URL + "dataset/upload/",
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (req.status === 201) console.log("upload berhasil");
    } catch (e) {
      console.log(e);
      dispatch(FailRequest());
    }
  };

  return (
    <Container maxWidth="100%" className={classes.containerDashboard}>
      <ModalInputDataset
        open={open}
        setOpen={setOpen}
        saveHandler={saveHandler}
        setData={setData}
        data={data}
      />
      <Modal open={open2} onClose={() => setOpen2(false)}>
        <Box
          sx={{
            width: "500px",
            height: "auto",
            backgroundColor: "#Fff",
            marginX: "auto",
            marginTop: "10%",
            padding: "80px 20px",
            borderRadius: 8,
          }}
        >
          <form>
            <label htmlFor="contained-button-file">
              <Container>
                <Typography
                  variant="h4"
                  sx={{ marginBottom: "30px" }}
                  textAlign={"center"}
                >
                  Upload Dataset
                </Typography>

                <Divider />
                <Stack spacing={5}>
                  <Input
                    sx={{ display: "none" }}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    id="contained-button-file"
                    type="file"
                    onChange={handleChange}
                    ref={fileInput}
                  />
                  <Button variant="contained" component="span">
                    Select Dataset File (.csv)
                  </Button>
                  <Box display={"flex"} justifyContent={"center"}>
                    <ButtonGroup>
                      <Button variant="contained" onClick={uploadExcel}>
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setOpen2(false)}
                        sx={{ ml: 2 }}
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Stack>
              </Container>
            </label>
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
              <Typography variant="h4">Tabel Dataset</Typography>
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
                onClick={() => setOpen2(true)}
              >
                Upload Dataset
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

export default DatasetDashboard;
