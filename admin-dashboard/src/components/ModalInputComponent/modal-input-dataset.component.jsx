import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import React from "react";

import { useSelector } from "react-redux";

const ModalInputDataset = ({ open, setOpen, saveHandler, setData, data }) => {
  const cpuList = useSelector((state) => state.data.cpu);
  const gpuList = useSelector((state) => state.data.gpu);
  const storageList = useSelector((state) => state.data.storage);
  const screenList = useSelector((state) => state.data.screen);
  const resolutionList = useSelector((state) => state.data.resolution);
  const typeList = useSelector((state) => state.data.laptop_type);
  const kebutuhanList = useSelector((state) => state.data.kebutuhan);
  const companyList = useSelector((state) => state.data.company);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          width: "60vw",
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

        <Divider />

        <form noValidate autoComplete="off">
          <Grid container>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <TextField
                label="Nama Laptop"
                variant="outlined"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="cpu-select">CPU</InputLabel>
                <Select
                  labelId="cpu-select"
                  value={data.cpu}
                  label="CPU"
                  onChange={(e) => setData({ ...data, cpu: e.target.value })}
                >
                  {cpuList.map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="gpu-select">GPU</InputLabel>
                <Select
                  labelId="gpu-select"
                  value={data.gpu}
                  label="GPU"
                  onChange={(e) => setData({ ...data, gpu: e.target.value })}
                >
                  {gpuList.map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="ram-select">RAM</InputLabel>
                <Select
                  labelId="ram-select"
                  value={data.ram}
                  label="RAM"
                  onChange={(e) => setData({ ...data, ram: e.target.value })}
                >
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={32}>32</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="storage-select">Tipe Storage</InputLabel>
                <Select
                  labelId="storage-select"
                  value={data.storage}
                  label="Memory Type"
                  onChange={(e) =>
                    setData({ ...data, storage: e.target.value })
                  }
                >
                  {storageList.map((data) => (
                    <MenuItem key={data.id} value={data.type}>
                      {data.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="company-select">Perusahaan</InputLabel>
                <Select
                  labelId="company-select"
                  value={data.company}
                  label="Company"
                  onChange={(e) =>
                    setData({ ...data, company: e.target.value })
                  }
                >
                  {companyList.map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="screen-select">Tipe Layar</InputLabel>
                <Select
                  labelId="screen-select"
                  value={data.screen}
                  label="Screen Type"
                  onChange={(e) => setData({ ...data, screen: e.target.value })}
                >
                  {screenList.map((data) => (
                    <MenuItem key={data.id} value={data.type}>
                      {data.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="resolution-select">Resolusi Layar</InputLabel>
                <Select
                  labelId="resolution-select"
                  value={data.resolution}
                  label="Screen Resolution"
                  onChange={(e) =>
                    setData({ ...data, resolution: e.target.value })
                  }
                >
                  {resolutionList.map((data) => (
                    <MenuItem key={data.id} value={data.resolution}>
                      {data.resolution}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <TextField
                label="Berat"
                variant="outlined"
                onChange={(e) =>
                  setData({ ...data, weight: parseInt(e.target.value) })
                }
                fullWidth
              />
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="type-select">Tipe Laptop</InputLabel>
                <Select
                  labelId="type-select"
                  value={data.type}
                  label="Laptop Type"
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                >
                  {typeList.map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <TextField
                label="Budget"
                variant="outlined"
                onChange={(e) =>
                  setData({ ...data, budget: parseInt(e.target.value) })
                }
                fullWidth
              />
            </Grid>
            <Grid items xs={6} sx={{ margin: "12px 0" }}>
              <TextField
                label="Harga"
                variant="outlined"
                onChange={(e) =>
                  setData({ ...data, price: parseInt(e.target.value) })
                }
                fullWidth
              />
            </Grid>
          </Grid>
          <ButtonGroup>
            <Button variant="contained" onClick={saveHandler}>
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalInputDataset;