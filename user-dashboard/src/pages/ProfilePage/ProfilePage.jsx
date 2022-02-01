import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import "./ProfilePage.scss";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import Avatar1 from "../../assets/img/avatar2.png";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/User/fetch-action";
import axios from "axios";
import { URL } from "../../Context/action";
import { FailRequest } from "../../Redux/User/action";

const ProfilePage = ({ avatar }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.profile);
  const [editable, setEditable] = useState(false);
  const [data, setData] = useState({
    first_name: userProfile !== null ? userProfile.first_name : "",
    last_name: userProfile !== null ? userProfile.last_name : "",
    phone: userProfile !== null ? userProfile.phone : "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleEdit = () => {
    setEditable(!editable);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const { first_name, last_name, phone } = data;
      const req = await axios.patch(
        URL + `member/${userProfile.user_id}/`,
        { first_name, last_name, phone },
        {
          withCredentials: true,
        }
      );
      if (req.data) {
        console.log("edit data berhasil");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      dispatch(FailRequest());
    }
  };

  return (
    <Card
      className="container-profile"
      title={<h1 className="title">My Profile</h1>}
    >
      <Divider layout="horizontal" />
      <div className="avatar-wrapper pt-6">
        <Avatar image={avatar} className="avatar" size="xlarge" />
      </div>
      <div className="profile-info">
        <div className="edit-btn">
          <p onClick={handleEdit}>
            Edit <i className="pi pi-user-edit"></i>
          </p>
        </div>
        <div className="detail">
          <div className="form-field p-fluid">
            <p className="question">First Name</p>
            {editable ? (
              <InputText
                type="text"
                onChange={(e) =>
                  setData({ ...data, first_name: e.target.value })
                }
                className="p-inputtext p-component"
                value={data.first_name}
              />
            ) : (
              <InputText
                type="text"
                className="p-inputtext p-component"
                value={userProfile !== null ? userProfile.first_name : ""}
                disabled
              />
            )}
          </div>
          <div className="form-field p-fluid">
            <p className="question">Last Name</p>
            {editable ? (
              <InputText
                type="text"
                onChange={(e) =>
                  setData({ ...data, last_name: e.target.value })
                }
                className="p-inputtext p-component"
                value={data.last_name}
              />
            ) : (
              <InputText
                type="text"
                className="p-inputtext p-component"
                value={userProfile !== null ? userProfile.last_name : ""}
                disabled
              />
            )}
          </div>
          <div className="form-field p-fluid">
            <p className="question">Phone Number</p>
            {editable ? (
              <InputText
                type="text"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="p-inputtext p-component"
                value={data.phone}
              />
            ) : (
              <InputText
                type="text"
                className="p-inputtext p-component"
                value={userProfile !== null ? userProfile.phone : ""}
                disabled
              />
            )}
          </div>
        </div>
        <div className="text-center mt-3 mb-5">
          {editable ? (
            <Button
              label="SAVE"
              className="p-button-primary w-3 border-round"
              onClick={editHandler}
            />
          ) : (
            <Button
              label="SAVE"
              disabled
              className="p-button-primary w-3 border-round"
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfilePage;
