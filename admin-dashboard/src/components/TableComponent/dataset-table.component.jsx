import React, { useEffect, useState } from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Button,
  TableFooter,
  TablePagination,
  IconButton,
} from "@mui/material";
import { connect, useDispatch, useSelector } from "react-redux";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
import {
  FetchDataset,
  FetchDatasetPage,
} from "../../Redux/Dataset/fetch-action";

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    console.log(results.next);
    console.log(results.previous);
    setPage(newPage);
  };

  const formatMoney = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  return (
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
              <TableCell>{data.type.name}</TableCell>
              <TableCell size="small">{formatMoney(data.budget)}</TableCell>
              <TableCell size="small">{formatMoney(data.price)}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error">
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
  );
};

const mapStateToProps = (state) => ({
  loading: state.dataset.loading,
  data: state.dataset.dataset,
  results: state.dataset.results,
  status: state.dataset.status,
});

export default connect(mapStateToProps)(DatasetTable);
