import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

import { Stack } from "@mui/material";
import { URL } from "../../Context/action";
import axios from "axios";
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

const CrossValDashboard = () => {
  const classes = useStyle();
  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null);

  useEffect(() => {
    getCrossVal();
    setTimeout(() => getKnnCrossVal(), 5000);
  }, []);

  const getKnnCrossVal = async () => {
    try {
      const req = await axios.get(URL + "ml/cross-val/knn/", {
        withCredentials: true,
      });
      if(req.data) setData2(req.data)
    } catch (e) {
      console.log(e)
    }
  }

  const getCrossVal = async () => {
    try {
      const req = await axios.get(URL + "ml/cross-val/get_graph/", {
        withCredentials: true,
      });
      if(req.data) setData(req.data)
    } catch (e) {
      console.log(e)
    }
  }

  const method1 = {
    graph: data !== null ? data[0].graph : "",
    name: data !== null ? data[0].metode : "",
  };
  const method2 = {
    graph: data !== null ? data[1].graph : "",
    name: data !== null ? data[1].metode : "",
  };
  const method3 = {
    graph: data !== null ? data[2].graph : "",
    name: data !== null ? data[2].metode : "",
  };

  const knnMethod1 = {
    graph: data2 !== null ? data2[0].graph : "",
    name: data2 !== null ? data2[0].metode : "",
  };
  const knnMethod2 = {
    graph: data2 !== null ? data2[1].graph : "",
    name: data2 !== null ? data2[1].metode : "",
  };
  const knnMethod3 = {
    graph: data2 !== null ? data2[2].graph : "",
    name: data2 !== null ? data2[2].metode : "",
  };
  const knnMethod4 = {
    graph: data2 !== null ? data2[3].graph : "",
    name: data2 !== null ? data2[3].metode : "",
  };

  console.log(data2);

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
            Cross Validation
          </Typography>
        </Container>

        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Card sx={{ mx: "auto" }} className={classes.cardAnalytic} raised>
            <CardHeader
              title={method1.name}
              subheader={`Hasil perbandingan cross validation akurasi pada ${method1.name}`}
            />
            <Divider />
            <CardContent>
              {method1.graph === undefined || method1.graph === "" ? (
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  height={510}
                />
              ) : (
                <img
                  sx={{ width: "500px", height: "500px" }}
                  className={classes.imgAnalytic}
                  src={`data:image/png;base64,${method1.graph}`}
                  alt="Accuracy Model"
                />
              )}
            </CardContent>
          </Card>
          <Card sx={{ mx: "auto" }} className={classes.cardAnalytic} raised>
            <CardHeader
              title={method2.name}
              subheader={`Hasil perbandingan cross validation akurasi pada ${method2.name}`}
            />
            <Divider />
            <CardContent>
              {method2.graph === undefined || method2.graph === "" ? (
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  height={510}
                />
              ) : (
                <img
                  sx={{ width: "500px", height: "500px" }}
                  className={classes.imgAnalytic}
                  src={`data:image/png;base64,${method2.graph}`}
                  alt="Precision Model"
                />
              )}
            </CardContent>
          </Card>
          <Card sx={{ mx: "auto" }} className={classes.cardAnalytic} raised>
            <CardHeader
              title={method3.name}
              subheader={`Hasil perbandingan cross validation akurasi pada ${method3.name}`}
            />
            <Divider />
            <CardContent>
              {method3.graph === undefined || method3.graph === "" ? (
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  height={510}
                />
              ) : (
                <img
                  sx={{ width: "500px", height: "500px" }}
                  className={classes.imgAnalytic}
                  src={`data:image/png;base64,${method3.graph}`}
                  alt="Recall Model"
                />
              )}
            </CardContent>
          </Card>
        </Stack>

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
            Cross Validation on KNN
          </Typography>

        <Grid container spacing={4}>
          <Grid item xs={6}>
          <Card sx={{ width: '800px' }} raised>
              <CardHeader
                title={knnMethod1.name}
                subheader={`Hasil perbandingan cross validation akurasi pada ${knnMethod1.name}`}
              />
              <Divider />
              <CardContent>
                {knnMethod1.graph === undefined || knnMethod1.graph === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${knnMethod1.graph}`}
                    alt="F1 Score Model"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
          <Card sx={{ width: '800px' }} raised>
              <CardHeader
                title={knnMethod2.name}
                subheader={`Hasil perbandingan cross validation akurasi pada ${knnMethod2.name}`}
              />
              <Divider />
              <CardContent>
                {knnMethod2.graph === undefined || knnMethod2.graph === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${knnMethod2.graph}`}
                    alt="F1 Score Model"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
          <Card sx={{ width: '800px' }} raised>
              <CardHeader
                title={knnMethod3.name}
                subheader={`Hasil perbandingan cross validation akurasi pada ${knnMethod3.name}`}
              />
              <Divider />
              <CardContent>
                {knnMethod3.graph === undefined || knnMethod3.graph === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${knnMethod3.graph}`}
                    alt="F1 Score Model"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ width: '800px' }} raised>
              <CardHeader
                title={knnMethod4.name}
                subheader={`Hasil perbandingan cross validation akurasi pada ${knnMethod4.name}`}
              />
              <Divider />
              <CardContent>
                {knnMethod4.graph === undefined || knnMethod4.graph === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${knnMethod4.graph}`}
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

export default CrossValDashboard;
// export default connect(mapStateToProps)(CrossValDashboard);
