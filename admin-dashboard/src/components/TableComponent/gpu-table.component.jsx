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
  TextField,
  Modal,
  Card,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "100%",
    flexGrow: 1,
  },
}));

function GpuTable({ data, dispatch, sx }) {
  const location = useLocation().pathname;
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // dispatch(FetchDataset());
  }, [location]);

  const saveHandler = () => {
    // window.location.reload();
  };

  return (
    <Container maxWidth="100%" className={classes.containerDashboard} sx={sx}>
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
              <Typography variant="h4">Graphics Card Table</Typography>
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
                  {["No", "Kode GPU", "Tipe GPU", "Merk"].map((label) => (
                    <TableCell>{label}</TableCell>
                  ))}
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
                    <TableCell>
                      <Skeleton variant="rectangular" />
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((data) => (
                    <TableRow aria-labelledby={data.kode}>
                      <TableCell size="small">{data.kode}</TableCell>
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
}

export default GpuTable;
