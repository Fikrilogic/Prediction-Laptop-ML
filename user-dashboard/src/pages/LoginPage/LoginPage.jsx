import React, { useEffect, useState, useContext } from "react";
import Image from "../../assets/img/signin-page-image.png";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";

import "./LoginPage.scss";
import { AuthContext } from "../../Context/context";
import { login } from "../../Context/action";
import { getProfile } from "../../Redux/User/fetch-action";

const LoginPage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(dispatch, { data });
      setLoading(false);
      return navigate("/");
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(user));
  }, [user]);

  return (
    <div className="container-signin">
      <div className="container-signin-image">
        <img src={Image} alt="background-img" />
      </div>
      <Card className="inner-container-signin">
        <div className="container-signin-header">
          <h1>Welcome, Let's Sign In</h1>
          <p>
            Don't Have Account ?{" "}
            <Link to="/register" className="link-item">
              Register
            </Link>
          </p>
        </div>
        <div className="container-form p-card-content">
          <form noValidate onSubmit={handleClick} className="p-fluid">
            <span className="p-float-label form-field">
              <InputText
                id={"email"}
                className="p-inputtext p-component"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                required
              />
              <label htmlFor={"email"}>Email</label>
            </span>
            <span className="p-float-label form-field">
              <Password
                required
                toggleMask="true"
                id="password"
                feedback={false}
                className="p-password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <label htmlFor="password">Password</label>
            </span>
            <Button
              label="SIGN IN"
              className="p-button-primary"
              loading={loading}
            />
          </form>
        </div>
        <div className="p-card-footer">
          <p>
            Forgot Password ? <span className="link-item">Reset Password</span>
          </p>
          <Divider type="dashed" align="center">
            <p>or login with</p>
          </Divider>
          <Button
            label="Google"
            className="p-button p-component p-button-raised p-button-text p-button-plain"
            icon="pi pi-google"
          />
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
