import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const ModalInput = ({ open, setOpen, saveHandler }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          width: "600px",
          height: "auto",
          backgroundColor: "#Fff",
          marginX: "auto",
          marginTop: "10%",
          padding: "20px",
          borderRadius: 8,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "30px" }}>
          Input New Data
        </Typography>

        <form noValidate autoComplete="off">
          <TextField
            sx={{ margin: "12px 0", display: "block" }}
            label="Full Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            sx={{ margin: "12px 0", display: "block" }}
            label="E-mail"
            variant="outlined"
            fullWidth
          />
          <TextField
            sx={{ margin: "12px 0", display: "block" }}
            label="Phone Number"
            variant="outlined"
            fullWidth
          />
          <TextField
            sx={{ margin: "12px 0", display: "block" }}
            label="E-mail"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" onClick={saveHandler}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalInput;
