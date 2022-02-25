import { Button } from "primereact/button";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardData from "../../../components/CardData/card-data.component";
import Laptop from "../../../assets/img/laptop-catalog.png";
import { Divider } from "primereact/divider";
import "./ConsultResultPage.scss";

const ConsultResultPage = () => {
  const consults = useSelector((state) => state.user.results);
  const navigate = useNavigate();
  console.log(consults);

  return (
    <div className="container-result">
      <div className="container-result-header">
        <div className="container-result-header-title">
          <h1>Hasil Konsultasi</h1>
        </div>
      </div>
      <div className="container-result-body">
        <div className="container-result-message">
          <p>
            Berikut merupakan beberapa rekomendasi laptop yang dapat kami
            berikan
          </p>
        </div>
        <div className="container-result-list">
          <CardData name="DELL" />
          <CardData name="ASUS" />
          <CardData name="MSI" />
          <CardData name="LENOVO" />
          {/* <div className="recommendation">
            <div className="recommendation-left">
              <div className="container-result-image">
                <img src={Laptop} alt="laptop-img" className="img" />
                <p>Harga: Rp.xxxxx</p>
              </div>
            </div>
            <div className="recommendation-right">
              <h1>Rekomendasi Laptop</h1>
              <Divider />
              <div className="info-nama">
                <p>Dell Latitude E7440</p>
              </div>
              <span className="info-cpu">
                <p>Processor  : Intel Core i5</p>
              </span>
              <div className="info-gpu">
                <p>GPU    : Intel HD Graphics</p>
              </div>
              <div className="info-gpu">
                <p>GPU    : Intel HD Graphics</p>
              </div>
            </div>
          </div>
          <div className="other-recommendation">
            <h2>Rekomendasi Lainnya</h2>
            <div className="card-list"> 
               {consults && consults.map((consult, i) => {
                console.log(consult);
                return (
                  <CardData
                    key={i}
                    name={consult.name}
                    predict={consult.predict[0]}
                  />
                );
              })} 
             </div>
          </div> */}
        </div>
        <div className="btn-wrapper">
          <Button
            label="Back to consult page"
            className="btn-back"
            onClick={() => navigate("/consult")}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultResultPage;
