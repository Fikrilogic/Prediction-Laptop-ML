import { Divider } from "primereact/divider";
import React from "react";
import { useState } from "react";
import Laptop from "../../assets/img/laptop-catalog.png";
import "./card-data.component.scss";

const CardData = ({ name }) => {
  const [showDetails, setShowDetails] = useState(false);

  const details = (
    <div className="container-result-detail">
        <div className="title">
          <p>{name}</p>
        </div>
        <Divider />
        <div className="specs">
          <div className="info">
            <p>Processor  : Intel Core i5</p>
          </div>
          <div className="info">
            <p>GPU    : Intel HD Graphics</p>
          </div>
          <div className="info">
            <p>RAM    : 4 GB</p>
          </div>
          <div className="info">
            <p>Storage  : SSD 256 GB</p>
          </div>
          <div className="info">
            <p>Screen    : FULL HD</p>
          </div>
          <div className="info">
            <p>Berat    : 3.8 KG</p>
          </div>
        </div>
        <Divider />
        <div className="description">
          <p>Deskripsi</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit non fugiat expedita nam numquam cum. Iusto enim consectetur similique corporis!</p>
        </div>
        <div className="button-wrapper">
          <div className="btn-details" onClick={() => setShowDetails(!showDetails)}>Show Less <i className="pi pi-angle-double-up"></i></div>
        </div>
     </div>
  )
  
  return (
    <div className="container-result-laptop">
      <div className="container-result-image">
        <img src={Laptop} alt="laptop-img" className="img responsive" />
        {
          showDetails && (
            <p className="price">Rp.xxx.xxx</p>
          )
        }
      </div>
      {
        showDetails ?
        details
        :
        <div className="container-result-detail">
          <div className="title">
            <p>{name}</p>
          </div>
          <div className="specs">
            {/* <p>Laptop : {predict}</p>
            <a href={link} target="_blank" rel="noreferrer">
              Search For Products
            </a> */}
            <p>Rp.xxx.xxx</p>
          </div>
          <div className="button-wrapper">
            <div className="btn-details" onClick={() => setShowDetails(!showDetails)}>Show More <i className="pi pi-angle-double-down"></i></div>
          </div>
        </div>
      }
    </div>
  );
};

export default CardData;
