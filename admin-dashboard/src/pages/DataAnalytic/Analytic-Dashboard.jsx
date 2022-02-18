import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

import { Grid, Stack } from "@mui/material";
import axios from "axios";
import { URL } from "../../Context/action.js";
import { useState } from "react";

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
    fontSize: 32,
  },
  imgAnalytic: {
    width: "100%",
    height: "auto",
  },
  cardAnalytic: {
    width: "1030px",
    height: "auto",
  },
}));

const KnnAnalyticDashboard = () => {
  const classes = useStyle();
  const [knn, setKnn] = useState(null);

  useEffect(() => {
    setTimeout(() => getKnnGraph(), 5000)
  }, [])

  const knnAccuracy = knn !== null ? knn[0].accuracy : "";
  const knnPrecision = knn !== null ? knn[1].precision : "";
  const knnRecall = knn !== null ? knn[2].recall : "";
  const knnF1 = knn !== null ? knn[3].f1_score : "";
  
  const getKnnGraph = async () => {
    try{
      const req = await axios.get(URL + 'ml/train-result/knn/', {
        withCredentials: true
      })
      if(req.data) setKnn(req.data)
    }catch(e){
      console.log(e)
    }
  }

  return(
    <>
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
            KNN Comparisons
          </Typography>

        <Grid container spacing={4}>
          <Grid item xs={6}>
          <Card
              sx={{width: '800px'}}
              raised
            >
              <CardHeader
                title="KNN Accuracy Chart"
                subheader="Perbandingan nilai akurasi dari model machine learning KNN yang telah di training"
              />
              <Divider />
              <CardContent>
                {knnAccuracy === undefined || knnAccuracy === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${knnAccuracy}`}
                    alt="KNN accuracy chart"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
          <Card
          sx={{width: '800px'}}
              className={classes.cardAnalytic}
              raised
            >
              <CardHeader
                title="KNN Precision Chart"
                subheader="Perbandingan nilai presisi dari model machine learning KNN yang telah di training"
              />
              <Divider />
              <CardContent>
                {knnPrecision === undefined || knnPrecision === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${knnPrecision}`}
                    alt="KNN precision chart"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
          <Card
          sx={{width: '800px'}}
              className={classes.cardAnalytic}
              raised
            >
              <CardHeader
                title="KNN Recall Chart"
                subheader="Perbandingan nilai recall dari model machine learning KNN yang telah di training"
              />
              <Divider />
              <CardContent>
                {knnRecall === undefined || knnRecall === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${knnRecall}`}
                    alt="KNN Recall Model"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
          <Card
          sx={{width: '800px'}}
              className={classes.cardAnalytic}
              raised
            >
              <CardHeader
                title="KNN F1 Score Chart"
                subheader="Perbandingan nilai F1 dari model machine learning KNN yang telah di training"
              />
              <Divider />
              <CardContent>
                {knnF1 === undefined || knnF1 === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${knnF1}`}
                    alt="KNN F1 Score Model"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </>
  )
}

const AnalyticDashboard = () => {
  const classes = useStyle();
  const [graph, setGraph] = useState(null)

  useEffect(() => {
    getResultGraph();
  }, []);


  const getResultGraph = async () => {
    try {
      const req = await axios.get(URL + "ml/train-result/result_graph/", {
        withCredentials: true,
      });
      if(req.data) setGraph(req.data)
    } catch (e) {
      console.log(e)
    }
  }

  const accuracy = graph !== null ? graph[0].accuracy : "";
  const precision = graph !== null ? graph[1].precision : "";
  const recall = graph !== null ? graph[2].recall : "";
  const f1_score = graph !== null ? graph[3].f1_score : "";

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

        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Card
            className={classes.cardAnalytic}
            raised
          >
            <CardHeader
              title="Accuracy Chart"
              subheader="Perbandingan akurasi dari model machine learning yang telah di training"
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
                  sx={{ width: "500px", height: "500px" }}
                  className={classes.imgAnalytic}
                  src={`data:image/png;base64,${accuracy}`}
                  alt="Accuracy Model"
                />
              )}
            </CardContent>
          </Card>
          <Card
            className={classes.cardAnalytic}
            raised
          >
            <CardHeader
              title="Precision Chart"
              subheader="Perbandingan presisi dari model machine learning yang telah di training"
            />
            <Divider />
            <CardContent>
              {precision === undefined || precision === "" ? (
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  height={510}
                />
              ) : (
                <img
                  sx={{ width: "500px", height: "500px" }}
                  className={classes.imgAnalytic}
                  src={`data:image/png;base64,${precision}`}
                  alt="Precision Model"
                />
              )}
            </CardContent>
          </Card>
          <Card
            className={classes.cardAnalytic}
            raised
          >
            <CardHeader
              title="Recall Chart"
              subheader="Perbandingan recall dari model machine learning yang telah di training"
            />
            <Divider />
            <CardContent>
              {recall === undefined || recall === "" ? (
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  height={510}
                />
              ) : (
                <img
                  sx={{ width: "500px", height: "500px" }}
                  className={classes.imgAnalytic}
                  src={`data:image/png;base64,${recall}`}
                  alt="Recall Model"
                />
              )}
            </CardContent>
          </Card>
          <Card
            className={classes.cardAnalytic}
            raised
          >
            <CardHeader
              title="F1 Score Chart"
              subheader="Perbandingan nilai F1 dari model machine learning yang telah di training"
            />
            <Divider />
            <CardContent>
              {f1_score === undefined || f1_score === "" ? (
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  height={510}
                />
              ) : (
                <img
                  sx={{ width: "500px", height: "500px" }}
                  className={classes.imgAnalytic}
                  src={`data:image/png;base64,${f1_score}`}
                  alt="F1 Score Model"
                />
              )}
            </CardContent>
          </Card>
        </Stack>
        <KnnAnalyticDashboard />
      </Box>
    </Container>
  );
};

export default AnalyticDashboard;