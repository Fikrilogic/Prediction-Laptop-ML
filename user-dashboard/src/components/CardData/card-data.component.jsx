import React from "react";
import Laptop from "../../assets/img/laptop-catalog.png";
import "./card-data.component.scss";

const CardData = ({ name, predict }) => {
  const link =
    "https://www.google.com/search?q=Laptop+" + predict.replace(" ", "+");
  console.log(link);

  return (
    <div className="container-result-laptop">
      <div className="container-result-image">
        <img src={Laptop} alt="laptop-img" className="img" />
      </div>
      <div className="container-result-detail">
        <div className="title">
          <h2>Algoritma {name}</h2>
        </div>
        <div className="specs">
          <p>Laptop : {predict}</p>
          <a href={link} target="_blank" rel="noreferrer">
            Search For Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardData;
