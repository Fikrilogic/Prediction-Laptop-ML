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
  const [method, setMethod] = useState([])
  const [knnMethod, setKnnMethod] = useState([])

  useEffect(() => {
    getCrossVal();
    setTimeout(() => getKnnCrossVal(), 5000);
  }, []);

  const getKnnCrossVal = async () => {
    try {
      const req = await axios.get(URL + "ml/cross-val/knn/", {
        withCredentials: true,
      });
      if(req.data){
        setKnnMethod(req.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getCrossVal = async () => {
    try {
      const req = await axios.get(URL + "ml/cross-val/get_graph/", {
        withCredentials: true,
      });
      if(req.data){
        setMethod(req.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  
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
          {
            method !== [] ?
            method.map((item, i) => (
              <Card sx={{ mx: "auto" }} className={classes.cardAnalytic} raised key={i}>
                <CardHeader
                  title={item.name}
                  subheader={`Hasil perbandingan cross validation akurasi pada ${item.name}`}
                />
                <Divider />
                <CardContent>
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${item.graph}`}
                    alt="Accuracy Model"
                  />
                </CardContent>
              </Card>
            ))
            :
            <Card sx={{ mx: "auto" }} className={classes.cardAnalytic} raised>
              <CardHeader
                title=""
                subheader=""
              />
              <Divider />
              <CardContent>
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  height={510}
                />
              </CardContent>
            </Card>
          }
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
          {
            knnMethod !== undefined ?
            knnMethod.map((item, i) => (
            <Grid item xs={6} key={i}>
              <Card sx={{ width: '800px' }} raised>
                <CardHeader
                  title={item.name}
                  subheader={`Hasil perbandingan cross validation akurasi pada ${item.name}`}
                />
                <Divider />
                <CardContent>
                  <img
                    sx={{ width: "500px", height: "500px" }}
                    className={classes.imgAnalytic}
                    src={`data:image/png;base64,${item.graph}`}
                    alt="F1 Score Model"
                  />
                </CardContent>
              </Card>
            </Grid>
            ))
            :
            (
            <Grid item xs={6}>
              <Card sx={{ width: '800px' }} raised>
                <CardHeader
                  title=""
                  subheader=""
                />
                <Divider />
                <CardContent>
                    <Skeleton
                      variant="rectangular"
                      animation="pulse"
                      height={510}
                    />
                </CardContent>
              </Card>
            </Grid>
            )
          }
        </Grid>
      </Box>
    </Container>
  );
};

export default CrossValDashboard;
// export default connect(mapStateToProps)(CrossValDashboard);
