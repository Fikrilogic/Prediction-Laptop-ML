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

import { connect, useDispatch, useSelector } from "react-redux";

import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import { useTheme } from "@mui/styles";

import {
  deleteDataset,
  FetchDataset,
  FetchDatasetPage,
} from "../../Redux/Dataset/fetch-action";

import ModalDelete from "../ModalInputComponent/modal-delete.component";

function TablePaginationActions(props) {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.dataset.results) || [];
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  // const handleFirstPageButtonClick = (event) => {
  //   dispatch(FetchDataset());
  //   onPageChange(event, 0);
  // };

  const handleBackButtonClick = (event) => {
    dispatch(FetchDatasetPage({ path: results.previous }));
    console.log(results.previous);
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    dispatch(FetchDatasetPage({ path: results.next }));
    console.log(results.next);
    onPageChange(event, page + 1);
  };

  // const handleLastPageButtonClick = (event) => {
  //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  // };

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

const DatasetTable = ({ dispatch, data, results }) => {
  useEffect(() => {
    dispatch(FetchDataset());
  }, [dispatch]);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    console.log(results.next);
    console.log(results.previous);
    setPage(newPage);
  };

  const selectData = (e) => {
    e.preventDefault();
    const id = e.currentTarget.parentNode.getAttribute("data-key");
    setId(id);
    setOpen(true);
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
      {/* <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "300px",
            height: "200px",
            backgroundColor: "#Fff",
            marginX: "auto",
            marginTop: "10%",
            padding: "10px 15px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Delete Data
          </Typography>
          <Typography variant="body1" mb={3}>
            Sure wanna delete this data?
          </Typography>
          <ButtonGroup>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button color="error" variant="contained" onClick={deleteData}>
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </Modal> */}

      <ModalDelete open={open} deleteHandler={deleteData} setOpen={setOpen} />

      <Table>
        <TableHead>
          <TableRow>
            {[
              "Nama",
              "CPU",
              "GPU",
              "RAM",
              "Tipe Storage",
              "Perusahaan",
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
          {data === undefined || data.length === 0 ? (
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
              <TableCell>
                <Skeleton variant="rectangular" />
              </TableCell>
            </TableRow>
          ) : (
            data.map((data) => (
              <TableRow>
                <TableCell size="small">{data.name}</TableCell>
                <TableCell>{data.cpu.name}</TableCell>
                <TableCell>{data.gpu.name}</TableCell>
                <TableCell size="small">{data.ram}</TableCell>
                <TableCell>{data.memory.type}</TableCell>
                <TableCell>{data.company.name}</TableCell>
                <TableCell size="small">{data.screen.type}</TableCell>
                <TableCell>{data.resolution.resolution}</TableCell>
                <TableCell>{data.weight}</TableCell>
                <TableCell>{data.type.name}</TableCell>
                <TableCell>{data.kebutuhan.name}</TableCell>
                <TableCell size="small">{formatMoney(data.budget)}</TableCell>
                <TableCell size="small">{formatMoney(data.price)}</TableCell>
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

const mapStateToProps = (state) => ({
  loading: state.dataset.loading,
  data: state.dataset.dataset,
  results: state.dataset.results,
  status: state.dataset.status,
});

export default connect(mapStateToProps)(DatasetTable);
