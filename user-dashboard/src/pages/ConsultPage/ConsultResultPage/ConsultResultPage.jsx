import React from "react";
import CardData from "../../../components/CardData/card-data.component";
import "./ConsultResultPage.scss";

const ConsultResultPage = () => {
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
          <CardData
            cpu="AMD Ryzen 3 5300U"
            gpu="Integrated AMD Radeon Graphics"
            storage="SSD 256GB"
            ram="4GB"
            screen={`4" HD`}
            name="HP 245 G8 56K70PA"
          />
          <CardData
            cpu="AMD Ryzen 5 5500U"
            gpu="Integrated AMD Radeon Graphics"
            storage="SSD 512GB"
            ram="8GB"
            screen={`14" HD`}
            name="HP 245 G8 56K72PA"
          />
          <CardData
            cpu="AMD Ryzen 5 3200U"
            gpu="Integrated AMD Radeon Graphics"
            storage="SSD 256GB"
            ram="4GB"
            screen={`14" HD`}
            name="HP 245 G8 61G55PA"
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultResultPage;
