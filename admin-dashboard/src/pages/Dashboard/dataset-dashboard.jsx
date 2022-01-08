import React, {useEffect} from "react";
import {connect} from "react-redux";

import {makeStyles} from "@mui/styles";
import {Container, Box, Card, Typography, AppBar, Toolbar} from "@mui/material";

import SideMenuComponent from "../../components/SideMenuDashboard/side-menu.component";
import DatasetTable from "../../components/TableComponent/dataset-table.component";
import AppBarCustome from "../../components/AppBar/appbar-custome.component";
import { FetchDataset } from '../../Redux/Dataset/fetch-action.js'

const useStyle = makeStyles((theme) => ({
    containerDashboard: {
        display: 'flex',
        width: '100vw'
    },
    sideComponent:{
        flexGrow: 0,
    },
    mainDashboard: {
        width: "100%",
        boxShadow: 3,
        flexGrow: 1
    },
}));

const DatasetDashboard = ({dispatch, dataset, status, loading, theme}) => {
    
    useEffect(() => {
        dispatch(FetchDataset());
    }, [dispatch]);

    const classes = useStyle(theme);

    return (
        <Container maxWidth="100%" disableGutters>
            <AppBarCustome/>
            <Box className={classes.containerDashboard}>
                <SideMenuComponent/>
                <Box className={classes.mainDashboard}>

                    <Card sx={{mx: 'auto', my: '20px', width: '75%'}}>
                        <DatasetTable data={dataset} dispatch={dispatch}/>
                    </Card>
                </Box>
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
