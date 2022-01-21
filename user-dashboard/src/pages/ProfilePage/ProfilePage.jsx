import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import "./ProfilePage.scss";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { getProfile } from "../../Redux/User/fetch-action";

const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const [editable, setEditable] = useState(false);

  const handleEdit = () => {
    setEditable(!editable);
  };

  return (
    <Card
      className="container-profile"
      title={<h1 className="title">My Profile</h1>}
    >
      <Divider layout="horizontal" />
      <div className="avatar-wrapper pt-6">
        <Avatar
          icon="pi pi-user"
          shape="circle"
          className="avatar"
          size="xlarge"
        />
      </div>
      <div className="profile-info">
        <div className="edit-btn">
          <p onClick={handleEdit}>
            Edit <i className="pi pi-user-edit"></i>
          </p>
        </div>
        <div className="detail">
          <div className="left-side">
            <div className="form-field p-fluid">
              <p className="question">First Name</p>
              {editable ? (
                <InputText type="text" className="p-inputtext p-component" />
              ) : (
                <InputText
                  type="text"
                  className="p-inputtext p-component"
                  disabled
                />
              )}
            </div>
            <div className="form-field p-fluid">
              <p className="question">Last Name</p>
              {editable ? (
                <InputText type="text" className="p-inputtext p-component" />
              ) : (
                <InputText
                  type="text"
                  className="p-inputtext p-component"
                  disabled
                />
              )}
            </div>
          </div>
          <div className="spacing"></div>
          <div className="right-side">
            <div className="form-field p-fluid">
              <p className="question">E-mail</p>
              {editable ? (
                <InputText type="text" className="p-inputtext p-component" />
              ) : (
                <InputText
                  type="text"
                  className="p-inputtext p-component"
                  disabled
                />
              )}
            </div>
            <div className="form-field p-fluid">
              <p className="question">Phone Number</p>
              {editable ? (
                <InputText type="text" className="p-inputtext p-component" />
              ) : (
                <InputText
                  type="text"
                  className="p-inputtext p-component"
                  disabled
                />
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-3 mb-5">
          <Button
            label="SAVE"
            className="p-button-primary w-3 border-round"
            //   onClick={() => navigate("results")}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProfilePage;
