import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import React from "react";
import { ButtonGroup } from "@mui/material";

const ModalEdit = ({ open, setOpen, editHandler, type, data, setData }) => {
  const selectModal = () => {
    switch (type) {
      case "cpu":
        return "Input Nama CPU";
      case "gpu":
        return "Input Nama GPU";
      case "storage":
        return "Input Tipe Storage";
      case "company":
        return "Input Nama Produsen Laptop";
      case "type":
        return "Input Tipe Laptop";
      case "screen":
        return "Input Jenis Layar";
      case "resolution":
        return "Input Resolusi Layar";
      case "kebutuhan":
        return "Input Jenis Kebutuhan";
      default:
        return;
    }
  };

  const typeInput = selectModal();

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
          Edit Data
        </Typography>

        <form noValidate autoComplete="off">
          <TextField
            sx={{ margin: "12px 0", display: "block" }}
            label={typeInput}
            variant="outlined"
            onChange={(e) => setData(e.target.value)}
            fullWidth
            value={data}
            required
          />
          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 5,
            }}
          >
            <Button variant="contained" onClick={editHandler}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
