import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import "./header.component.scss";
import { Avatar } from "primereact/avatar";
import { logout } from "../../Context/action";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/context";

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    // localStorage.setItem("auth", JSON.stringify(user));
  }, [user]);

  console.log(user);

  const menu = useRef(null);

  const handleLogout = async () => {
    console.log("clicked");
    const req = await logout(dispatch);
    if (req === 200) {
      window.location.reload();
      return navigate("/");
    }
  };

  const items = [
    {
      label: "User 1",
      items: [
        {
          label: "Profile",
          icon: "pi pi-user",
          command: () => navigate("/profile"),
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: handleLogout,
        },
      ],
    },
  ];

  return (
    <div className="header-container">
      <div className="logo-wrapper" onClick={() => navigate("/")}>
        <p className="logo">CREAVEN</p>
      </div>
      <div className="spacing"></div>
      <div className="nav-links">
        <Link to="/consult" className="nav-item">
          CONSULT
        </Link>
        <Link to="/contact" className="nav-item">
          CONTACT US
        </Link>
      </div>
      {user.isAuthenticated === false ? (
        <div className="button-container">
          <Link to="/login" className="btn">
            <Button
              label="SIGN IN"
              className="p-button-primary p-button-rounded"
            />
          </Link>
          <Link to="/register" className="btn">
            <Button
              label="REGISTER"
              className="p-button-primary p-button-rounded"
            />
          </Link>
        </div>
      ) : (
        <div className="button-container">
          <div
            className="profile-btn"
            onClick={(e) => {
              menu.current.toggle(e);
            }}
          >
            <p>User 1</p>
            <Avatar
              icon="pi pi-user"
              shape="circle"
              className="avatar"
              size="medium"
            />
          </div>
          <Menu model={items} popup ref={menu} id="popup_menu" />
        </div>
      )}
    </div>
  );
};

export default Header;
