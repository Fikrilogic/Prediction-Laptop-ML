import Image from "../../assets/img/signin-page-image.png";
import React, { useEffect, useState, useContext, useRef } from "react";

import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";

import "./RegisterPage.scss";
import { AuthContext } from "../../Context/context";
import { register } from "../../Context/action";
import { Password } from "primereact/password";

const RegisterPage = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    profile: {
      first_name: "",
      last_name: "",
      phone: "",
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(dispatch, {
        data,
      });
      setLoading(false);
      if (res !== undefined) {
        setData({
          username: "",
          email: "",
          password: "",
          profile: {
            first_name: "",
            last_name: "",
            phone: "",
          },
        });
        toast.current.show({
          severity: "success",
          summary: "Register Success",
          life: 3000,
        });
        return;
      }
      toast.current.show({
        severity: "error",
        summary: "Register Failed",
        life: 3000,
      });
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="container-register">
      <Toast ref={toast} />
      <div className="container-register-image">
        <img src={Image} alt="background-img" />
      </div>

      <Card className="inner-container-register">
        <div className="container-register-header">
          <h1>Create Account Now</h1>
          <p>
            Have an account ?{" "}
            <Link to="/login" className="link-item">
              Sign In
            </Link>
          </p>
        </div>
        <div className="container-form p-card-content">
          <form onSubmit={handleClick} className="p-fluid p-formgrid p-grid">
            <div className="form-group">
              <span className="p-float-label form-field">
                <InputText
                  required
                  value={data.profile.first_name}
                  className="p-inputtext p-component"
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, first_name: e.target.value },
                    })
                  }
                />
                <label>First Name</label>
              </span>
              <span className="p-float-label form-field">
                <InputText
                  required
                  value={data.profile.last_name}
                  className="p-inputtext p-component"
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, last_name: e.target.value },
                    })
                  }
                />
                <label>Last Name</label>
              </span>
            </div>
            <div className="form-group">
              <span className="p-float-label form-field">
                <InputText
                  value={data.username}
                  required
                  className="p-inputtext p-component"
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
                <label>Username</label>
              </span>
              <span className="p-float-label form-field">
                <InputText
                  value={data.email}
                  required
                  type="email"
                  className="p-inputtext p-component"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <label>Email</label>
              </span>
            </div>
            <span className="p-float-label form-field">
              <InputText
                required
                value={data.profile.phone}
                className="p-inputtext p-component"
                onChange={(e) =>
                  setData({
                    ...data,
                    profile: { ...data.profile, phone: e.target.value },
                  })
                }
              />
              <label>Phone</label>
            </span>
            <span className="p-float-label form-password">
              <Password
                value={data.password}
                required
                toggleMask="true"
                id="password"
                className="p-password p-component"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <label>Password</label>
            </span>
            <Button
              loading={loading}
              label="REGISTER"
              className="p-button-primary"
            />
          </form>
        </div>
        <div className="p-card-footer">
          <Divider type="dashed" align="center">
            <p>or register with</p>
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

export default RegisterPage;
