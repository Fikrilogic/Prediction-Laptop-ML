import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import {
  FetchCompany,
  FetchCpu,
  FetchGpu,
  FetchScreenType,
  FetchStorage,
} from "../../Redux/Data/fetch-action";

import axios from "axios";
import { URL } from "../../Context/action";
import { FailRequest } from "../../Redux/User/action";
import { ButtonGroup, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Skeleton, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import ModalDelete from "../../components/ModalInputComponent/modal-delete.component";
import ModalEditDataset from "../../components/ModalInputComponent/modal-edit-dataset.component";
import { useTheme } from "@emotion/react";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ModalInputDataset from "../../components/ModalInputComponent/modal-input-dataset.component";
import { FetchDatasetPage, FetchLaptop } from "../../Redux/Dataset/fetch-action";
import { deleteDatasetById } from "../../Redux/Dataset/action";
import UploadFile from "../../components/UploadFile/upload-file.component";

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


const LaptopDashboard = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const formData = new FormData();
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  
    useEffect(() => {
      dispatch(FetchCpu());
      dispatch(FetchGpu());
      dispatch(FetchScreenType());
      dispatch(FetchStorage());
      dispatch(FetchCompany())
    }, [dispatch]);
    
    const [data, setData] = useState({
      processor: "",
      gpu: "",
      memory: "",
      memory_size: "",
      screen: "",
      description: "",
      company: "",
      weight: "",
      ram: "",
      price: 0,
      name: "",
    });
    
    const saveHandler = async (e) => {
      e.preventDefault();
      try {
        const req = await axios.post(URL + "laptop/", data, {
          withCredentials: true,
        });
        if (req.data) console.log("add data berhasil");
      } catch (e) {
        console.log(e);
        dispatch(FailRequest());
      }
      window.location.reload();
    };

    const handleChange = (e) => {
      setFile(null);
      const fileUploaded = e.target.files[0];
      setFile(fileUploaded);
    };
  
    const uploadExcel = async () => {
      setLoading(true);
      formData.append("file", file);
      try {
        const req = await axios.post(
          URL + "laptop/upload/",
          formData,
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (req.data) {
          setLoading(false);
          console.log("upload berhasil");
          window.location.reload();
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
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
          laptop={true}
        />

        <UploadFile 
          handleChange={handleChange} 
          uploadExcel={uploadExcel} 
          open={open2} 
          setOpen={setOpen2}
          loading={loading}
          fileInput={fileInput}
        />
    
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
                <Typography variant="h4">Tabel Laptop</Typography>
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
              <LaptopTable data={data} setData={setData} />
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
};

const LaptopTable = ({data, setData}) => {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const laptopData = useSelector((state) => state.dataset.laptop);
    const results = useSelector((state) => state.dataset.results);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const companyList = useSelector(state => state.data.company);
    
    const getCompany = (id) => {
      if(companyList){
        const company =  companyList.filter(data => data.id === id) || []
        return company.map(item => item.name)
      }
    }
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    useEffect(() => {
      dispatch(FetchLaptop())
    }, [dispatch])
  
    const getData = async (id) => {
      try {
        const req = await axios.get(URL + `laptop/${id}/`, {
          withCredentials: true,
        });
        if (req.status === 200) {
          setData({
            processor: req.data.processor,
            gpu: req.data.gpu,
            memory: req.data.memory,
            screen: req.data.screen,
            description: req.data.description,
            memory_size: req.data.memory_size,
            company: req.data.company,
            weight: req.data.weight,
            ram: req.data.ram,
            price: req.data.price,
            name: req.data.name
          });
        }
      } catch (e) {
        console.log(e);
        dispatch(FailRequest());
      }
    };
    
    const selectData = (e) => {
      e.preventDefault();
      const id = e.currentTarget.parentNode.parentNode.getAttribute("data-key");
      setId(id);
      getData(id);
      if (e.target.textContent === "Edit") {
        setOpen2(true);
      }
      if (e.target.textContent === "Delete") {
        setOpen(true);
      }
    };
  
    const editHandler = async (e) => {
      e.preventDefault();
      try {
        const req = await axios.patch(URL + `laptop/${id}/`, data, {
          withCredentials: true,
        });
        if (req.status === 200) console.log("edit data berhasil");
      } catch (e) {
        console.log(e);
        dispatch(FailRequest());
      }
      window.location.reload();
    };
  
    const deleteData = async (e) => {
      e.preventDefault();
      try {
        await axios.delete(URL + `laptop/${id}/`, { withCredentials: true });
        dispatch(deleteDatasetById());
      } catch (e) {
        dispatch(FailRequest());
      }
      setOpen(false);
      window.location.reload();
    };
  
    const formatMoney = (number) => {
      return number.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    };
  
    return (
      <>
        <ModalDelete open={open} deleteHandler={deleteData} setOpen={setOpen} />
        <ModalEditDataset
          laptop={true}
          open={open2}
          data={data}
          editHandler={editHandler}
          setOpen={setOpen2}
          setData={setData}
        />
  
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                "Nama",
                "CPU",
                "GPU",
                "RAM",
                "Storage",
                "Size Storage",
                "Tipe Layar",
                "Berat",
                "Perusahaan",
                "Harga",
                "Deskripsi",
                "Aksi",
              ].map((label, i) => (
                <TableCell key={i} size="small">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {laptopData === undefined || laptopData.length === 0 ? (
              <TableRow>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" />
                </TableCell>
              </TableRow>
            ) : (
              laptopData.map((data, i) => (
                <TableRow key={i} hover>
                  <TableCell size="small" sx={{ fontSize: 12 }}>
                    {data.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>
                    {data.processor === null ? "" : data.processor}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>
                    {data.gpu === null ? "" : data.gpu}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} size="small">
                    {data.ram}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>
                    {data.memory === null ? "" : data.memory}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} size="small">
                    {data.memory_size === null ? "" : data.memory_size}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>
                    {data.screen === null ? "" : data.screen}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{data.weight}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>
                    {
                      getCompany(data.company)
                    }
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }} size="small">
                    {formatMoney(data.price)}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>
                    {data.description === null ? "" : data.description}
                  </TableCell>
                  <TableCell data-key={data.id}>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => selectData(e)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => selectData(e)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={results.count}
                rowsPerPage={rowsPerPage}
                page={page}
                rowsPerPageOptions={[20]}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </>
    );
  };

  function TablePaginationActions(props) {
    const dispatch = useDispatch();
    const results = useSelector((state) => state.dataset.results) || [];
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleBackButtonClick = (event) => {
      dispatch(FetchLaptop({ path: results.previous }));
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      dispatch(FetchLaptop({ path: results.next }));
      onPageChange(event, page + 1);
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </Box>
    );
  }

export default LaptopDashboard

