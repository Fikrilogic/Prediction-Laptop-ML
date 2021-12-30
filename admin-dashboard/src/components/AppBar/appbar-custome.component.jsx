import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";

const AppBarCustome = ({MenuName}) => {

    return (
        <AppBar position='relative' sx={{width: "100%-20%"}}>
            <Toolbar>
                <Typography variant='h4'>{MenuName}</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarCustome