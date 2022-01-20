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
import { FailRequest } from "../../Redux/User/action";
import { URL } from "../../Context/action";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "100%",
    flexGrow: 1,
  },
}));

function GpuTable() {
  const classes = useStyle();
  const gpuList = useSelector((state) => state.data.gpu);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const selectData = (e) => {
    e.preventDefault();
    const id = e.currentTarget.parentNode.getAttribute("data-key");
    setId(id);
    setOpen2(true);
  };

  const deleteData = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.delete(URL + `gpu/${id}/`, {
        withCredentials: true,
      });
      if (req.status === 204) console.log("data deleted");
    } catch (e) {
      dispatch(FailRequest());
    }
    setOpen2(false);
    window.location.reload();
  };
  const saveHandler = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post(
        URL + `gpu/`,
        { name: data },
        {
          withCredentials: true,
        }
      );
      if (req.status === 201) console.log("gpu data added");
    } catch (e) {
      dispatch(FailRequest());
    }
    setOpen(false);
    window.location.reload();
  };

  return (
    <Container maxWidth="100%" className={classes.containerDashboard}>
      <ModalDelete open={open2} setOpen={setOpen2} deleteHandler={deleteData} />
      <ModalInput
        open={open}
        setData={setData}
        setOpen={setOpen}
        type="gpu"
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
              <Typography variant="h4">Tabel Graphics Card</Typography>
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
                  {["No", "Kode GPU", "Tipe GPU", "Aksi"].map(
                    (label, index) => (
                      <TableCell key={index}>{label}</TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {gpuList === undefined || gpuList.length === 0 ? (
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
                  </TableRow>
                ) : (
                  gpuList.map((data, index) => (
                    <TableRow key={data.id}>
                      <TableCell size="small">{index + 1}</TableCell>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell data-key={data.id}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={(e) => selectData(e)}
                        >
                          Delete
                        </Button>
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
}

export default GpuTable;
