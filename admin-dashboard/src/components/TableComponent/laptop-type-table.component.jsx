import React, { useEffect, useState } from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Button,
  CardContent,
  Divider,
  Box,
  Typography,
  Container,
  Card,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { FetchLaptopType } from "../../Redux/Data/fetch-action";
import ModalInput from "../ModalInputComponent/modal-input.component";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "100%",
    flexGrow: 1,
  },
}));

const LaptopTypeTable = ({ data, dispatch, sx }) => {
  const location = useLocation().pathname;
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(FetchLaptopType());
  }, [dispatch, location]);

  const saveHandler = () => {
    // window.location.reload();
  };

  return (
    <Container maxWidth="100%" className={classes.containerDashboard} sx={sx}>
      <ModalInput
        open={open}
        setOpen={setOpen}
        type="type"
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
              <Typography variant="h4">Tabel Tipe Laptop</Typography>
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
                  {["No", "Kode Tipe Laptop", "Nama Laptop", "Aksi"].map(
                    (label) => (
                      <TableCell>{label}</TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
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
                  data.map((data, i) => (
                    <TableRow key={data.id}>
                      <TableCell size="small">{i + 1}</TableCell>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="error">
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
};

const mapStateToProps = (state) => ({
  loading: state.data.loading,
  data: state.data.laptop_type,
  status: state.data.status,
});

export default connect(mapStateToProps)(LaptopTypeTable);
