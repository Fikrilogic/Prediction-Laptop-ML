import { Button } from "primereact/button";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardData from "../../../components/CardData/card-data.component";
import "./ConsultResultPage.scss";

const ConsultResultPage = () => {
  const consults = useSelector((state) => state.user.results);
  const knnConsult = useSelector((state) => state.user.knnResult);
  const navigate = useNavigate();

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
          {knnConsult && (
            <CardData name={knnConsult.predict} data={knnConsult.laptop} />
          )}
          {consults &&
            consults.map((consult, i) => {
              return (
                <CardData
                  key={i}
                  name={consult.predict}
                  data={consult.laptop}
                />
              );
            })}
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
