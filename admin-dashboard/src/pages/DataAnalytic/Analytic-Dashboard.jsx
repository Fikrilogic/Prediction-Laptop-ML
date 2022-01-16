import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  Container,
  Box,
  Card,
  Typography,
  CardContent,
  Skeleton,
  Grid,
  CardHeader,
  Divider,
} from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";

import {
  FetchAnalyticGraph,
  FetchAnalyticResults,
} from "../../Redux/Dataset/fetch-action.js";

const useStyle = makeStyles((theme) => ({
  mainDashboard: {
    width: "100%",
    flexGrow: 1,
  },
  containerDashboard: {
    backgroundColor: "#F4F4F4",
    paddingBottom: "60px",
  },
  titlePage: {
    opacity: 0.2,
    position: "relative",
    left: "10px",
    fontSize: 32,
  },
  imgAnalytic: {
    width: "500px",
  },
  cardAnalytic: {
    width: "600px",
    height: "auto",
  },
}));

const AnalyticDashboard = ({ dispatch, graph, data, analytic }) => {
  useEffect(() => {
    dispatch(FetchAnalyticGraph());
  }, [dispatch]);
  const classes = useStyle();

  const accuracy = graph[0] !== undefined ? graph[0].accuracy : "";
  const precision = graph[1] !== undefined ? graph[1].precision : "";
  const recall = graph[2] !== undefined ? graph[2].recall : "";
  const f1_score = graph[3] !== undefined ? graph[3].f1_score : "";

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

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Card
              sx={{ mx: "auto" }}
              className={classes.cardAnalytic}
              raised
              id="accuracy"
            >
              <CardHeader
                title="Accuracy Chart"
                subheader="Perbandingan akurasi dari keempat model machine learing yang telah di training"
              />
              <Divider />
              <CardContent>
                {accuracy === undefined || accuracy === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${accuracy}`}
                    alt="Accuracy Model"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{ mx: "auto" }}
              className={classes.cardAnalytic}
              raised
              id="precision"
            >
              <CardHeader
                title="Precision Chart"
                subheader="Perbandingan presisi dari keempat model machine learing yang telah di training"
              />
              <Divider />
              <CardContent>
                {accuracy === undefined || accuracy === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${precision}`}
                    alt="Precision Model"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{ mx: "auto" }}
              className={classes.cardAnalytic}
              raised
              id="recall"
            >
              <CardHeader
                title="Recall Chart"
                subheader="Perbandingan recall dari keempat model machine learing yang telah di training"
              />
              <Divider />
              <CardContent>
                {accuracy === undefined || accuracy === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${recall}`}
                    alt="Recall Model"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{ mx: "auto" }}
              className={classes.cardAnalytic}
              raised
              id="f1-score"
            >
              <CardHeader
                title="F1 Score Chart"
                subheader="Perbandingan nilai F1 dari keempat model machine learing yang telah di training"
              />
              <Divider />
              <CardContent>
                {accuracy === undefined || accuracy === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${f1_score}`}
                    alt="F1 Score Model"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  method: state.dataset.method,
  graph: state.dataset.graph,
  analytic: state.dataset.analytic,
  status: state.dataset.status,
});

export default connect(mapStateToProps)(AnalyticDashboard);
