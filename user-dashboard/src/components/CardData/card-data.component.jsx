import axios from "axios";
import { Divider } from "primereact/divider";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Laptop from "../../assets/img/laptop-catalog.png";
import "./card-data.component.scss";

const CardData = ({ name, data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [laptopData, setLaptopData] = useState(null);

  useEffect(() => {
    getLaptopData(data);
  }, []);

  const formatMoney = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const getLaptopData = async (url) => {
    try {
      const req = await axios.get("http://localhost:8000" + url + "/", {
        withCredentials: true,
      });
      if (req.data) setLaptopData(req.data);
    } catch (e) {
      console.error(e);
    }
  };

  const details = (
    <div className="container-result-detail">
      <div className="title">
        <p>{name}</p>
      </div>
      <Divider />
      <div className="specs">
        <div className="info">
          <p>CPU : {laptopData !== null ? laptopData.processor : ""}</p>
        </div>
        <div className="info">
          <p>GPU : {laptopData !== null ? laptopData.gpu : ""}</p>
        </div>
        <div className="info">
          <p>RAM : {laptopData !== null ? laptopData.ram : ""} GB</p>
        </div>
        <div className="info">
          <p>
            Storage : {laptopData !== null ? laptopData.memory : ""}{" "}
            {laptopData !== null ? laptopData.memory_size : ""}
          </p>
        </div>
        <div className="info">
          <p>Layar : {laptopData !== null ? laptopData.screen : ""}</p>
        </div>
        <div className="info">
          <p>Berat : {laptopData !== null ? laptopData.weight : ""} Kg</p>
        </div>
      </div>
      <Divider />
      <div className="description">
        <p>Deskripsi</p>
        <p>{laptopData !== null ? laptopData.description : ""}</p>
      </div>
      <div className="button-wrapper">
        <div
          className="btn-details"
          onClick={() => setShowDetails(!showDetails)}
        >
          Show Less <i className="pi pi-angle-double-up"></i>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-result-laptop">
      <div className="container-result-image">
        <img src={Laptop} alt="laptop-img" className="img responsive" />
        {showDetails && (
          <p className="price">
            {formatMoney(laptopData !== null ? laptopData.price : "")}
          </p>
        )}
      </div>
      {showDetails ? (
        details
      ) : (
        <div className="container-result-detail">
          <div className="title">
            <p>{name}</p>
          </div>
          <div className="specs">
            <p>{formatMoney(laptopData !== null ? laptopData.price : "")}</p>
          </div>
          <div className="button-wrapper">
            <div
              className="btn-details"
              onClick={() => setShowDetails(!showDetails)}
            >
              Show More <i className="pi pi-angle-double-down"></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardData;
