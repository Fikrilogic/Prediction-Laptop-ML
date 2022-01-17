import React, { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";
import {
  FetchCompany,
  FetchCpu,
  FetchGpu,
  FetchLaptopType,
  FetchScreenResolution,
  FetchScreenType,
  FetchStorage,
} from "../../Redux/Data/fetch-action";
import {
  Container,
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "100%",
    flexGrow: 1,
  },
  containerDashboard: {
    backgroundColor: "#F4F4F4",
  },
  titlePage: {
    opacity: 0.2,
    position: "relative",
    left: "-50px",
    fontSize: 32,
  },
}));

const Dashboard = ({
  cpu,
  gpu,
  storage,
  screen,
  resolution,
  type,
  company,
  dispatch,
}) => {
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

  console.log(cpu.length, gpu.length);

  return (
    <Container
      maxWidth="100%"
      disableGutters
      className={classes.containerDashboard}
    >
      <Box className={classes.mainDashboard}>
        <Container maxWidth="100%" sx={{ width: "75%", mt: 5 }} disableGutters>
          <Typography
            variant="h3"
            component="h1"
            className={classes.titlePage}
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: 64,
            }}
          >
            Dashboard
          </Typography>
        </Container>
        <Card sx={{ my: "20px", width: "fit-content" }} raised>
          <CardHeader title="Banyak Data" />
          <Divider />
          <CardContent>
            <Box sx={{ width: "500px" }}>
              <Doughnut
                data={{
                  labels: [
                    "CPU",
                    "GPU",
                    "Storage",
                    "Screen Type",
                    "Screen Resolution",
                    "Company",
                    "Laptop Type",
                  ],
                  datasets: [
                    {
                      label: "# of Datas",
                      data: [
                        cpu.length,
                        gpu.length,
                        storage.length,
                        screen.length,
                        resolution.length,
                        company.length,
                        type.length,
                      ],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(50, 240, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(50, 240, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  cpu: state.data.cpu,
  gpu: state.data.gpu,
  storage: state.data.storage,
  screen: state.data.screen,
  resolution: state.data.resolution,
  type: state.data.laptop_type,
  company: state.data.company,
});
export default connect(mapStateToProps)(Dashboard);
