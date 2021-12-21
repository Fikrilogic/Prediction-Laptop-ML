import React, {useEffect} from "react";
import {connect} from "react-redux";

import {makeStyles} from "@mui/styles";
import {Container, Box, Card, Typography} from "@mui/material";

import SideMenu from "../../components/SideMenuDashboard/side-menu";

const useStyle = makeStyles((theme) => ({
    mainDashboard: {
        width: "80%",
        boxShadow: 3,
        padding: "10px 15px",
        marginLeft: "10px",
    },
}));

const DatasetDashboard = ({dispatch, dataset, status, loading,theme}) => {
    const classes = useStyle(theme);

    return (
        <Container maxWidth="lg" sx={{display: "flex", margin: "5px 0px"}}>
            <SideMenu/>
            <Box className={classes.mainDashboard}>


            </Box>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    loading: state.dataset.loading,
    dataset: state.dataset.data,
    status: state.dataset.status,
});

export default connect(mapStateToProps)(DatasetDashboard);
