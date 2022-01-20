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

import { FetchCrossValidation } from "../../Redux/Analytics/fetch-action";

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
    width: "100%",
    height: "auto",
  },
  cardAnalytic: {
    width: "600px",
    height: "auto",
  },
}));

const CrossValDashboard = ({ dispatch, data }) => {
  useEffect(() => {
    dispatch(FetchCrossValidation());
  }, [dispatch]);
  const classes = useStyle();

  const method1 = {
    graph: data[0] !== undefined ? data[0].graph : "",
    name: data[0] !== undefined ? data[0].metode : "",
  };
  const method2 = {
    graph: data[1] !== undefined ? data[1].graph : "",
    name: data[1] !== undefined ? data[1].metode : "",
  };
  const method3 = {
    graph: data[2] !== undefined ? data[2].graph : "",
    name: data[2] !== undefined ? data[2].metode : "",
  };
  const method4 = {
    graph: data[3] !== undefined ? data[3].graph : "",
    name: data[3] !== undefined ? data[3].metode : "",
  };
  console.log(data);

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

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Card sx={{ mx: "auto" }} className={classes.cardAnalytic} raised>
              <CardHeader
                title={method1.name}
                subheader="Hasil perbandingan cross validation akurasi pada Naive Bayes"
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
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ mx: "auto" }} className={classes.cardAnalytic} raised>
              <CardHeader
                title={method2.name}
                subheader="Hasil perbandingan cross validation akurasi pada K-Nearest Neighbors"
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
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ mx: "auto" }} className={classes.cardAnalytic} raised>
              <CardHeader
                title={method3.name}
                subheader="Hasil perbandingan cross validation akurasi pada Decision Tree"
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
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ mx: "auto" }} className={classes.cardAnalytic} raised>
              <CardHeader
                title={method4.name}
                subheader="Hasil perbandingan cross validation akurasi pada Gradient Boosting"
              />
              <Divider />
              <CardContent>
                {method4.graph === undefined || method4.graph === "" ? (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    height={510}
                  />
                ) : (
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${method4.graph}`}
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
  method: state.analytic.method,
  data: state.analytic.crossVal,
  status: state.analytic.status,
});

export default connect(mapStateToProps)(CrossValDashboard);
