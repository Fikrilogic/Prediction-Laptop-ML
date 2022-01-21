import "./ContactPage.scss";
import React from "react";

const ContactPage = () => {
  return (
    <div className="container-contact p-card my-8">
      <div className="p-card-title text-center">
        <h2>Contact Us</h2>
      </div>
      <div className="p-card-content">
        <p>
          <span className="pi pi-calendar"></span>
          Open Monday - Friday: 09.00 - 18.00 WIB
        </p>

        <p>
          <span className="pi pi-phone"></span>
          021 - xxxxxxxx
        </p>
        <p>
          <span className="pi pi-envelope"></span>
          sales@craven.com
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
