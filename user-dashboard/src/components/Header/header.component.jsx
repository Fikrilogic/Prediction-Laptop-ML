import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import "./header.component.scss";
import { Avatar } from "primereact/avatar";
import Avatar1 from "../../assets/img/avatar2.png";
import { logout } from "../../Context/action";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/context";
import { getProfile } from "../../Redux/User/fetch-action";
import { useSelector } from "react-redux";

const Header = ({ avatar }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const userProfile = useSelector((state) => state.user.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const checkAuth = () => {
    const check = localStorage.getItem("auth") || "";
    if (check.includes(`"isAuthenticated":true`)) return true;
    return false;
    // if (status.isAuthenticated !== true) return false;
  };

  const auth = checkAuth();

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
      label: "Options",
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
        <Link to="/consult" className="nav-item p-button p-button-text">
          CONSULT
        </Link>
        <Link to="/contact" className="nav-item p-button p-button-text">
          CONTACT US
        </Link>
      </div>
      {auth === false ? (
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
            className="profile-btn p-button"
            onClick={(e) => {
              menu.current.toggle(e);
            }}
          >
            <p>{userProfile !== null ? userProfile.first_name : "User 1"}</p>
            <Avatar
              image={avatar}
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
