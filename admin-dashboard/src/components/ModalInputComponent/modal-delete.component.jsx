import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import React from "react";

const ModalDelete = ({ open, setOpen, deleteHandler }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          width: "300px",
          height: "200px",
          backgroundColor: "#Fff",
          marginX: "auto",
          marginTop: "10%",
          padding: "10px 15px",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "30px" }}>
          Delete Data
        </Typography>
        <Typography variant="body1" mb={3}>
          Sure wanna delete this data?
        </Typography>
        <ButtonGroup>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={deleteHandler}>
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
