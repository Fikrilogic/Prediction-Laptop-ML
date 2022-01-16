import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  Container,
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { fetchAnalyticResults } from "../../Redux/Dataset/fetch-action.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 14,
  },
};

const options = {
  responsive: true,
  title: {
    display: true,
    text: "Analytic Results",
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 1,
        },
      },
    ],
  },
};

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
    left: "10px",
    fontSize: 32,
  },
}));

const AnalyticDashboard = ({ dispatch, dataset, status, method }) => {
  useEffect(() => {
    dispatch(fetchAnalyticResults());
  }, [dispatch]);
  const classes = useStyle();
  console.log(dataset);

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
            Analytic Results
          </Typography>
        </Container>
        <Card sx={{ mx: "auto", my: "20px", width: "75%" }} raised>
          <CardContent>
            <Bar
              datasetIdKey={dataset.id}
              data={{
                labels: ["Accuracy", "Precision", "Recall", "F1 Score"],
                datasets: [
                  {
                    id: 1,
                    label: "KNN",
                    data: [33, 53, 85, 41],
                    fill: true,
                    backgroundColor: "rgba(209, 21, 21,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                  },
                  {
                    id: 2,
                    label: "Decision Tree",
                    data: [33, 25, 35, 51],
                    fill: false,
                    borderColor: "#742774",
                  },
                  {
                    id: 3,
                    label: "Naive Bayes",
                    data: [33, 53, 85, 41],
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                  },
                  {
                    id: 4,
                    label: "Gradient Boost Decision Tree",
                    data: [33, 25, 35, 51],
                    fill: false,
                    backgroundColor: "rgba(224, 227, 41, 0.2)",
                    borderColor: "#742774",
                  },
                  //   {
                  //     id: 1,
                  //     label: dataset.method.name,
                  //     data: [
                  //       dataset.accuracy,
                  //       dataset.precision,
                  //       dataset.recall,
                  //       dataset.f1_score,
                  //     ],
                  //     fill: true,
                  //     backgroundColor: "rgba(209, 21, 21,0.2)",
                  //     borderColor: "rgba(75,192,192,1)",
                  //   },
                  //   {
                  //     id: 2,
                  //     label: dataset.method.name,
                  //     data: [
                  //       dataset.accuracy,
                  //       dataset.precision,
                  //       dataset.recall,
                  //       dataset.f1_score,
                  //     ],
                  //     fill: false,
                  //     borderColor: "#742774",
                  //   },
                  //   {
                  //     id: 3,
                  //     label: dataset.method.name,
                  //     data: [
                  //       dataset.accuracy,
                  //       dataset.precision,
                  //       dataset.recall,
                  //       dataset.f1_score,
                  //     ],
                  //     fill: true,
                  //     backgroundColor: "rgba(75,192,192,0.2)",
                  //     borderColor: "rgba(75,192,192,1)",
                  //   },
                  //   {
                  //     id: 4,
                  //     label: dataset.method.name,
                  //     data: [
                  //       dataset.accuracy,
                  //       dataset.precision,
                  //       dataset.recall,
                  //       dataset.f1_score,
                  //     ],
                  //     fill: false,
                  //     backgroundColor: "rgba(224, 227, 41, 0.2)",
                  //     borderColor: "#742774",
                  //   },
                ],
              }}
              legend={legend}
              options={options}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  method: state.dataset.method,
  dataset: state.dataset.data,
  status: state.dataset.status,
});

export default connect(mapStateToProps)(AnalyticDashboard);
