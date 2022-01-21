import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import React, { useState } from "react";
import "./SurveyPage.scss";

const SurveyPage = () => {
  const [kebutuhan, setKebutuhan] = useState(null);
  const question = [
    "Apakah Nama Tipe Laptop Yang Anda Punya",
    "Apakah Merk Atau Produsen Laptop Yand Anda Punya",
    "Apakah Jenis Processor Dari Laptop Yang Anda Punya",
    "Apakah Jenis Graphic Card Dari Laptop Yang Anda Punya",
    "Tipe Media Penyimpanan Yand Terdapat Pada Laptop Anda",
    "Berapa RAM Dari Laptop Yang Anda Punya",
    "Berapakah Resolusi Layar Laptop Yang Anda Punya",
    "Apakah Tipe Layar Laptop Yang Anda Punya",
    "Apakah Tipe Dari Laptop Yang Anda Punya",
    "Berapakah Perkiraan Harga Dari Laptop Yang Anda Punya",
  ];

  return (
    <div className="container-survey">
      <div className="container-survey-header mb-6">
        <h1>CREAVEN ONLINE SURVEY</h1>
      </div>
      <div className="dot"></div>
      <div className="container-survey-body py-6">
        <form method="POST" className="">
          {question.map((data, i) => (
            <div className="form-field p-fluid">
              <p className="question">
                {i + 1} {data} ?
              </p>
              <InputText type="text" className="p-inputtext p-component" />
            </div>
          ))}
          <div className="form-field p-fluid">
            <p className="question">
              11. Kegiatan Utama Yang Anda Biasa Lakukan Dengan Laptop Anda
            </p>
            <div className="p-field-radiobutton">
              <RadioButton
                inputId="city1"
                name="city"
                value="Gaming"
                onChange={(e) => setKebutuhan(e.value)}
                checked={kebutuhan === "Gaming"}
              />
              <label htmlFor="city1">Gaming</label>
            </div>
            <div className="p-field-radiobutton">
              <RadioButton
                inputId="city2"
                name="city"
                value="Desain"
                onChange={(e) => setKebutuhan(e.value)}
                checked={kebutuhan === "Desain"}
              />
              <label htmlFor="city2">Desain</label>
            </div>
            <div className="p-field-radiobutton">
              <RadioButton
                inputId="city3"
                name="city"
                value="Office"
                onChange={(e) => setKebutuhan(e.value)}
                checked={kebutuhan === "Office"}
              />
              <label htmlFor="city3">Office</label>
            </div>
            <div className="p-field-radiobutton">
              <RadioButton
                inputId="city4"
                name="city"
                value="Lainnya"
                onChange={(e) => setKebutuhan(e.value)}
                checked={kebutuhan === "Lainnya"}
              />
              <label htmlFor="city4">Lainnya</label>
            </div>
          </div>
          <div className="text-center mt-3 mb-5">
            <Button
              label="SUBMIT"
              className="p-button-primary w-3 border-round"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyPage;
