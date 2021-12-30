import React, {useEffect} from "react";
import {connect} from "react-redux";

import {makeStyles} from "@mui/styles";
import {Container, Box, Card, Typography, AppBar, Toolbar} from "@mui/material";

import SideMenuComponent from "../../components/SideMenuDashboard/side-menu.component";
import DatasetTable from "../../components/TableComponent/dataset-table.component";
import AppBarCustome from "../../components/AppBar/appbar-custome.component";

const useStyle = makeStyles((theme) => ({
    mainDashboard: {
        width: "75%",
        boxShadow: 3,
        padding: "10px 15px",
    }
}));

const DatasetDashboard = ({dispatch, dataset, status, loading,theme}) => {
    const classes = useStyle(theme);

    return (
        <Container maxWidth="xl" disableGutters sx={{display: "flex", height: '100vh'}}>
            <SideMenuComponent/>
            <Box className={classes.mainDashboard}>
                <AppBarCustome MenuName='Master Dataset'/>
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
