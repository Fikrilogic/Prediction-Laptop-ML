import React, { useRef, useState } from 'react'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { ButtonGroup } from '@mui/material';

const UploadFile = ({ handleChange, uploadExcel, open, setOpen, loading, fileInput }) => {

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "500px",
            height: "auto",
            backgroundColor: "#Fff",
            marginX: "auto",
            marginTop: "10%",
            padding: "80px 20px",
            borderRadius: 8,
          }}
        >
          <form>
            <label htmlFor="contained-button-file">
              <Container>
                <Typography
                  variant="h4"
                  sx={{ marginBottom: "30px" }}
                  textAlign={"center"}
                >
                  Upload Dataset
                </Typography>

                <Divider />
                <Stack spacing={5}>
                  <input
                    hidden
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    id="contained-button-file"
                    type="file"
                    onChange={handleChange}
                    ref={fileInput}
                  />
                  <Button variant="contained" component="span">
                    Select Dataset File (.csv)
                  </Button>
                  <Box display={"flex"} justifyContent={"center"}>
                    <ButtonGroup>
                      <LoadingButton
                        loading={loading}
                        variant="contained"
                        onClick={uploadExcel}
                      >
                        Save
                      </LoadingButton>
                      <Button
                        variant="outlined"
                        onClick={() => setOpen(false)}
                        sx={{ ml: 2 }}
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Stack>
              </Container>
            </label>
          </form>
        </Box>
      </Modal>
  )
}

export default UploadFile