import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";

import { useDispatch, useSelector } from "react-redux";

import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import { useTheme } from "@mui/styles";

import {
  deleteDataset,
  FetchDataset,
  FetchDatasetPage,
} from "../../Redux/Dataset/fetch-action";

import ModalDelete from "../ModalInputComponent/modal-delete.component";
import { ButtonGroup } from "@mui/material";
import ModalEditDataset from "../ModalInputComponent/modal-edit-dataset.component";
import { FailRequest } from "../../Redux/User/action";
import axios from "axios";
import { URL } from "../../Context/action";

function TablePaginationActions(props) {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.dataset.results) || [];
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    dispatch(FetchDatasetPage({ path: results.previous }));
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    dispatch(FetchDatasetPage({ path: results.next }));
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

const DatasetTable = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const results = useSelector((state) => state.dataset.results);
  const dataset = useSelector((state) => state.dataset.dataset);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [data, setData] = useState({
    cpu: "",
    gpu: "",
    memory: "",
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

  useEffect(() => {
    dispatch(FetchDataset());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getData = async (id) => {
    try {
      const req = await axios.get(URL + `dataset/${id}/`, {
        withCredentials: true,
      });
      if (req.status === 200) {
        setData({
          cpu: req.data.cpu.name,
          gpu: req.data.gpu.name,
          memory: req.data.memory.type,
          screen: req.data.screen.type,
          sc_res: req.data.resolution.resolution,
          type: req.data.type.name,
          kebutuhan: req.data.kebutuhan.name,
          budget: req.data.budget,
          weight: req.data.weight,
          ram: req.data.ram,
          price: req.data.price,
          name: req.data.name,
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
      const req = await axios.patch(URL + `dataset/${id}/`, data, {
        withCredentials: true,
      });
      if (req.status === 200) console.log("edit data berhasil");
    } catch (e) {
      console.log(e);
      dispatch(FailRequest());
    }
    console.log(data);
    window.location.reload();
  };

  const deleteData = (e) => {
    e.preventDefault();
    dispatch(deleteDataset(id));
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
              "Tipe Storage",
              "Tipe Layar",
              "Resolusi",
              "Berat",
              "Tipe Laptop",
              "Kebutuhan",
              "Budget",
              "Harga",
              "Aksi",
            ].map((label, i) => (
              <TableCell key={i} size="small">
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataset === undefined || dataset.length === 0 ? (
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
              <TableCell>
                <Skeleton variant="rectangular" />
              </TableCell>
            </TableRow>
          ) : (
            dataset.map((data, i) => (
              <TableRow key={i} hover>
                <TableCell size="small" sx={{ fontSize: 12 }}>
                  {data.name}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }}>
                  {data.cpu === null ? "" : data.cpu.name}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }}>
                  {data.gpu === null ? "" : data.gpu.name}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} size="small">
                  {data.ram}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }}>
                  {data.memory === null ? "" : data.memory.type}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} size="small">
                  {data.screen === null ? "" : data.screen.type}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }}>
                  {data.resolution === null ? "" : data.resolution.resolution}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }}>{data.weight}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>
                  {data.type === null ? "" : data.type.name}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }}>
                  {data.kebutuhan === null ? "" : data.kebutuhan.name}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} size="small">
                  {formatMoney(data.budget)}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} size="small">
                  {formatMoney(data.price)}
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

export default DatasetTable;
