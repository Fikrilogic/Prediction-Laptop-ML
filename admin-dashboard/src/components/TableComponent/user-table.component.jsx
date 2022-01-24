import React, { useEffect, useState } from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  Box,
  Skeleton,
  ButtonGroup,
  Typography,
} from "@mui/material";

import { deleteUser, fetchUser } from "../../Redux/User/fetch-action";
import { useDispatch, useSelector } from "react-redux";

function UserTableComponent() {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const users = useSelector((state) => state.user.users);
  console.log(users);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const selectData = (e) => {
    e.preventDefault();
    const id = e.currentTarget.parentNode.getAttribute("data-key");
    setId(id);
    setOpen(true);
  };

  const deleteData = (e) => {
    e.preventDefault();
    dispatch(deleteUser(id));
    setOpen(false);
    window.location.reload();
  };

  const cancel = () => setOpen(false);

  return (
    <>
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
            Sure wanna delete this user?
          </Typography>
          <ButtonGroup>
            <Button color="primary" variant="contained" onClick={cancel}>
              Cancel
            </Button>
            <Button color="error" variant="contained" onClick={deleteData}>
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
      <Table>
        <TableHead>
          <TableRow>
            {["No", "First Name", "Last Name", "Phone", "Action"].map(
              (label) => (
                <TableCell>{label}</TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {users === undefined || users.length === 0 ? (
            <TableRow>
              <TableCell>
                <Skeleton variant="rectangular" />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" />
              </TableCell>
            </TableRow>
          ) : (
            users.map((data, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.first_name}</TableCell>
                <TableCell>{data.last_name}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell data-key={data.user_id}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => selectData(e)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div></div>
    </>
  );
}

export default UserTableComponent;
