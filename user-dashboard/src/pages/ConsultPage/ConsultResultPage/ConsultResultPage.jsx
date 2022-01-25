import { Button } from "primereact/button";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardData from "../../../components/CardData/card-data.component";
import "./ConsultResultPage.scss";

const ConsultResultPage = () => {
  const consults = useSelector((state) => state.user.results);
  const navigate = useNavigate();
  console.log(consults);

  return (
    <div className="container-result">
      <div className="container-result-header">
        <div className="container-result-header-title">
          <h1>Consultation Results</h1>
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
          {consults.map((consult, i) => {
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
        <div className="btn-wrapper">
          <Button
            label="Back to homepage"
            className="btn-back"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultResultPage;
