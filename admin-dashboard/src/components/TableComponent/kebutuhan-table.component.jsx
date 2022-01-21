import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

import { makeStyles } from "@mui/styles";

import { useDispatch, useSelector } from "react-redux";

import ModalInput from "../ModalInputComponent/modal-input.component";
import ModalDelete from "../ModalInputComponent/modal-delete.component";

import axios from "axios";
import { URL } from "../../Context/action";
import { FailRequest } from "../../Redux/User/action";
import ModalEdit from "../ModalInputComponent/modal-edit.component";
import { ButtonGroup } from "@mui/material";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "100%",
    flexGrow: 1,
  },
}));

const KebutuhanTable = () => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const kebutuhan = useSelector((state) => state.data.kebutuhan);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const getData = async (id) => {
    try {
      const req = await axios.get(URL + `kebutuhan/${id}/`, {
        withCredentials: true,
      });
      if (req.status === 200) {
        setData(req.data.name);
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
      setOpen3(true);
    }
    if (e.target.textContent === "Delete") {
      setOpen2(true);
    }
  };

  const deleteData = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.delete(URL + `kebutuhan/${id}/`, {
        withCredentials: true,
      });
      if (req.status === 204) console.log("data deleted");
    } catch (e) {
      dispatch(FailRequest());
    }
    setOpen2(false);
    window.location.reload();
  };

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.patch(
        URL + `kebutuhan/${id}/`,
        { name: data },
        {
          withCredentials: true,
        }
      );
      if (req.status === 200) console.log("edit data berhasil");
    } catch (e) {
      console.log(e);
      dispatch(FailRequest());
    }
    window.location.reload();
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post(
        URL + `kebutuhan/`,
        { name: data },
        {
          withCredentials: true,
        }
      );
      if (req.status === 201) console.log("kebutuhan data added");
    } catch (e) {
      dispatch(FailRequest());
    }
    setOpen(false);
    window.location.reload();
  };

  return (
    <Container maxWidth="100%" className={classes.containerDashboard}>
      <ModalDelete open={open2} setOpen={setOpen2} deleteHandler={deleteData} />

      <ModalEdit
        open={open3}
        data={data}
        setOpen={setOpen3}
        type="kebutuhan"
        setData={setData}
        editHandler={editHandler}
      />

      <ModalInput
        open={open}
        setData={setData}
        setOpen={setOpen}
        type="kebutuhan"
        saveHandler={saveHandler}
      />
      <Box className={classes.mainDashboard}>
        <Card sx={{ mx: "auto", my: "20px" }} raised>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "25px",
            }}
          >
            <Box sx={{}}>
              <Typography variant="h4">Tabel Kebutuhan</Typography>
            </Box>

            <Box component="div" sx={{}}>
              <Button
                sx={{ flexGrow: 0 }}
                className={classes.btnDataset}
                variant="contained"
                disableElevation
                onClick={() => setOpen(true)}
              >
                Input Data
              </Button>
            </Box>
          </Box>
          <Divider />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  {["No", "Kode Kebutuhan", "Nama Kebutuhan", "Aksi"].map(
                    (label, index) => (
                      <TableCell key={index}>{label}</TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {kebutuhan === undefined || kebutuhan.length === 0 ? (
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
                  </TableRow>
                ) : (
                  kebutuhan.map((data, index) => (
                    <TableRow key={data.id}>
                      <TableCell size="small">{index + 1}</TableCell>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>{data.name}</TableCell>
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
            </Table>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default KebutuhanTable;
