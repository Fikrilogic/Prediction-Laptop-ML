import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const ModalInput = ({ open, setOpen, saveHandler, type }) => {
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
          {type === "cpu" ? (
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Nama CPU"
              variant="outlined"
              fullWidth
              required
            />
          ) : (
            <></>
          )}
          {type === "gpu" ? (
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Nama GPU"
              variant="outlined"
              fullWidth
              required
            />
          ) : (
            <></>
          )}
          {type === "storage" ? (
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Tipe Storage"
              variant="outlined"
              fullWidth
              required
            />
          ) : (
            <></>
          )}
          {type === "company" ? (
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Nama Perusahaan"
              variant="outlined"
              fullWidth
              required
            />
          ) : (
            <></>
          )}
          {type === "type" ? (
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Nama Tipe Laptop"
              variant="outlined"
              fullWidth
              required
            />
          ) : (
            <></>
          )}
          {type === "screen" ? (
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Tipe Layar"
              variant="outlined"
              fullWidth
              required
            />
          ) : (
            <></>
          )}
          {type === "resolution" ? (
            <TextField
              sx={{ margin: "12px 0", display: "block" }}
              label="Resolusi Layar"
              variant="outlined"
              fullWidth
              required
            />
          ) : (
            <></>
          )}
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
