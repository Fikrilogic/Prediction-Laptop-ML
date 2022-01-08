import React, {useEffect} from "react";
import {connect} from "react-redux";

import {makeStyles} from "@mui/styles";
import {Container, Box, Card, Typography} from "@mui/material";

import SideMenuComponent from "../../components/SideMenuDashboard/side-menu.component";
import {fetchUser} from "../../Redux/User/fetch-action";
import UserTableComponent from "../../components/TableComponent/user-table.component";
import AppBarCustome from "../../components/AppBar/appbar-custome.component";

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

const UserDashboard = ({dispatch, user, status, theme}) => {
    const classes = useStyle(theme);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <Container maxWidth="100%" disableGutters className={classes.containerDashboard}>
            <AppBarCustome/>
            <Box className={classes.containerDashboard}>
                <SideMenuComponent/>
                <Box className={classes.mainDashboard}>

                    <Card sx={{mx: 'auto', my: '20px', width: '75%'}}>
                        <UserTableComponent data={user} dispatch={dispatch}/>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    loading: state.user.loading,
    user: state.user.users,
    status: state.user.status,
});

export default connect(mapStateToProps)(UserDashboard);
