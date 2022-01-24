import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { LoadingButton } from "@mui/lab";

import { AuthContext } from "../../Context/context";
import { login } from "../../Context/action";

const useStyle = makeStyles({
  login: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(180deg, #7AB1D0 0%, #00669F 100%)",
    padding: 0,
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    width: "400px",
    height: "230px",
    textAlign: "center",
    padding: "15px 0px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid rgb(0,0,0,0.3)",
  },
  textfield: {
    color: "white",
  },
  logo: {
    color: "white",
    position: "absolute",
    left: "20px",
    top: "10px",
  },
});

export default function LoginDashboard(props) {
  const classes = useStyle();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(dispatch, { email, password });
      setLoading(false);
      return navigate("/dataset");
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(user));
  }, [user]);

  return (
    <div className={classes.login}>
      <Box className={classes.logo}>
        <Typography
          variant="h2"
          sx={{ fontSize: 30, mb: 3 }}
          fontFamily="Sansita, sans-serif"
          fontWeight="bold"
        >
          CREAVEN
        </Typography>
      </Box>
      <Box className={classes.container} boxShadow={4} borderRadius={3}>
        <Typography
          variant="h2"
          sx={{ fontSize: 30, mb: 3 }}
          fontWeight="bold"
          color="primary"
        >
          Admin Login Page
        </Typography>

        <form onSubmit={handleClick}>
          <Box component="div" sx={{ mb: 2 }}>
            <TextField
              id="email"
              label="email"
              type="text"
              size="small"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box component="div">
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              sx={{ color: "#fff" }}
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <LoadingButton
            variant="outlined"
            loading={loading}
            title="submit"
            label="submit"
            type="submit"
            size="medium"
            color="primary"
            sx={{ mt: 2, backgroundColor: "#fff" }}
          >
            Submit
          </LoadingButton>
        </form>
      </Box>
    </div>
  );
}
