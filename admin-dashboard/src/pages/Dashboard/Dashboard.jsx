import React, { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";
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

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";
import { FetchDataset } from "../../Redux/Dataset/fetch-action";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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
  dataset,
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
  const classes = useStyle();

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
        <Box display={"flex"} justifyContent={"space-around"}>
          <Card sx={{ my: "20px", width: "70%" }} raised>
            <CardHeader title="Banyak Data" />
            <Divider />
            <CardContent>
              <Box
                sx={{ width: "500px" }}
                display="flex"
                justifyContent="space-around"
              >
                <Box flexItem>
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
                            "rgba(255, 99, 132)",
                            "rgba(54, 162, 235)",
                            "rgba(255, 206, 86)",
                            "rgba(75, 192, 192)",
                            "rgba(153, 102, 255)",
                            "rgba(255, 159, 64)",
                            "rgba(50, 240, 64)",
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
                <Divider orientation="vertical" flexItem />
                <Bar
                  data={{
                    labels: ["Banyak Dataset"],
                    datasets: [
                      {
                        label: "CPU",
                        data: cpu === undefined ? [0] : [cpu.length],
                        borderColor: "rgba(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132)",
                      },
                      {
                        label: "GPU",
                        data: gpu === undefined ? [0] : [gpu.length],
                        borderColor: "rgba(54, 162, 235)",
                        backgroundColor: "rgba(54, 162, 235)",
                      },
                      {
                        label: "Storage",
                        data: storage === undefined ? [0] : [storage.length],
                        borderColor: "rgba(255, 206, 86)",
                        backgroundColor: "rgba(255, 206, 86)",
                      },
                      {
                        label: "Screen Type",
                        data: screen === undefined ? [0] : [screen.length],
                        borderColor: "rgba(75, 192, 192)",
                        backgroundColor: "rgba(75, 192, 192)",
                      },
                      {
                        label: "Screen Resolution",
                        data:
                          resolution === undefined ? [0] : [resolution.length],
                        borderColor: "rgba(153, 102, 255)",
                        backgroundColor: "rgba(153, 102, 255)",
                      },
                      {
                        label: "Company",
                        data: company === undefined ? [0] : [company.length],
                        borderColor: "rgba(255, 159, 64)",
                        backgroundColor: "rgba(255, 159, 64)",
                      },
                      {
                        label: "Laptop Type",
                        data: type === undefined ? [0] : [type.length],
                        borderColor: "rgba(50, 240, 64)",
                        backgroundColor: "rgba(50, 240, 64)",
                      },
                    ],
                  }}
                  options={{
                    indexAxis: "x",
                    elements: {
                      bar: {
                        borderWidth: 1,
                      },
                    },
                    responsive: true,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
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
  dataset: state.dataset.results,
});
export default connect(mapStateToProps)(Dashboard);
