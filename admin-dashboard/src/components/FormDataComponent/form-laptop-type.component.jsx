import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  ButtonGroup,
  Button,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  formContainer: {
    marginTop: "15px",
    height: "auto",
    padding: "10px 15px",
    display: "flex",
    flexDirection: "column",
  },
  inputField: {
    height: "50px",
    padding: "10px",
    display: "flex",
    justifyContent: "start",
    marginTop: "5px",
    alignItems: "center",
  },
  label: {
    fontSize: "1.2rem",
    marginRight: "15px",
  },
});

function LaptopTypeFormData() {
  const classes = useStyles();
  let { id } = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard/laptop-type");
    // id = null;
    window.location.reload();
  };

  useEffect(() => {}, []);

  return (
    <Box>
      <Typography variant="h5">
        {id ? "Update Type Laptop" : "Add New Type Laptop"}
      </Typography>
      <form className={classes.formContainer}>
        <Stack spacing={3}>
          <div className={classes.inputField}>
            <TextField
              size="small"
              id="code"
              value={id ? id : ""}
              placeholder="Unique Code"
              // helperText="something Error"
            />
          </div>
          <div className={classes.inputField}>
            <TextField size="small" id="name" placeholder="Name" />
          </div>
        </Stack>
        <ButtonGroup sx={{ mt: 5, alignItems: "end" }}>
          <Button variant="contained" color="success">
            {id ? "Update" : "Add"}
          </Button>
          <Button variant="contained" color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
}

export default LaptopTypeFormData;
