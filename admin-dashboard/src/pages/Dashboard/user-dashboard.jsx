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
        display: 'flex'
    },
    mainDashboard: {
        width: "75%",
        boxShadow: 3,
        padding: "10px 15px"
    },
}));

const UserDashboard = ({dispatch, user, status, theme}) => {
    const classes = useStyle(theme);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <Container maxWidth="xl" disableGutters  sx={{display: 'flex', height: '100vh'}}>
            <SideMenuComponent/>
            <Box className={classes.mainDashboard}>
                <AppBarCustome MenuName='Master User'/>

                <Card sx={{mt: 5}}>
                    <UserTableComponent data={user} dispatch={dispatch}/>
                </Card>
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
