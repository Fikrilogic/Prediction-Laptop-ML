import React from "react";
import Footer from "../components/Footer/footer.component";
import Header from "../components/Header/header.component";

const Layout = ({ element, avatar }) => {
  return (
    <div>
      <Header avatar={avatar} />
      <div className="container-body">{element}</div>
      <Footer />
    </div>
  );
};

export default Layout;
