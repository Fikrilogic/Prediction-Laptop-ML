import { Card } from "primereact/card";
import React from "react";
import Laptop from "../../assets/img/laptop-catalog.png";
import "./card-data.component.scss";

const CardData = ({ name, cpu, gpu, ram, storage, screen }) => {
  return (
    <Card className="container-result-laptop" title={name}>
      {/* <div className="container-result-image">
        <img src={Laptop} alt="" />
      </div> */}
      <div className="container-result-detail">
        {/* <div className="title">
          <p>{name}</p>
        </div> */}
        <div className="specs">
          <p>CPU : {cpu}</p>
          <p>GPU : {gpu}</p>
          <p>RAM : {ram}</p>
          <p>Storage : {storage}</p>
          <p>Screen : {screen}</p>
        </div>
      </div>
    </Card>
  );
};

export default CardData;
