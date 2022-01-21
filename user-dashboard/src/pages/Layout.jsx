import React from "react";
import Footer from "../components/Footer/footer.component";
import Header from "../components/Header/header.component";

const Layout = ({ element }) => {
  return (
    <div>
      <Header />
      <div className="container-body">{element}</div>
      <Footer />
    </div>
  );
};

export default Layout;
