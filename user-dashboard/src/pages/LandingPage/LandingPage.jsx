import { Icon } from "@iconify/react";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WelcomeImage from "../../assets/img/landing-page-image.png";
import { getProfile } from "../../Redux/User/fetch-action";
import "./LandingPage.scss";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="container-landing">
      <div className="welcome-section">
        <div className="welcome-wrapper">
          <p className="title">CREAVEN</p>
          <p className="sub">
            Memberikanmu prediksi terbaik dalam hal rekomendasi laptop
          </p>
          <div className="browse">
            <Button
              label="Ayo Konsultasi Sekarang"
              onClick={() => navigate("/consult")}
            />
          </div>
        </div>
        <div className="welcome-image">
          <img
            src={WelcomeImage}
            alt="from http://clipart-library.com/clipart/visitor-cliparts-website_1.htm"
            className="image"
          />
        </div>
      </div>
      <div className="detail-section">
        <div className="what-section">
          <h2>APA ITU CREAVEN ?</h2>
          <p>
            <strong>Creaven</strong> adalah sebuah website yang menggunakan
            semacam algoritma <em>machine learning</em>, seperti{" "}
            <span className="algorithm">K-Nearest Neighbors</span>,{" "}
            <span className="algorithm">Decision Tree</span>,{" "}
            <span className="algorithm">Gradient Boost Decision Tree</span> dan{" "}
            <span className="algorithm">Naive Bayes</span>. Algoritma-algortima
            tersebut akan memberikanmu prediksi terbaik dalam hal rekomendasi
            laptop untuk pemakaian sehari-hari.
          </p>
        </div>
        <div className="goal-section">
          <h2>APAKAH TUJUAN DARI CREAVEN ?</h2>
          <p>
            Tujuan dari pembuatan website ini yaitu untuk menentukan yang mana
            merupakan algoritma <em>machine learning</em> terbaik yang digunakan
            untuk prediksi. Dalam hal ini, <strong>Creaven</strong> menggunakan
            algoritma-algoritma tersebut untuk memberikan rekomendasi laptop
            berdasarkan kebutuhan-kebutuhan dari pengguna.
          </p>
        </div>
      </div>
      <div className="algorithm-section">
        <div className="title">
          <h2>ALGORITMA YANG DIGUNAKAN</h2>
        </div>
        <div className="card-list">
          {[
            "K-Nearest Neighbors",
            "Decision Tree",
            "Gradient Boost Decision Tree",
            "Naive Bayes",
          ].map((data, i) => (
            <div className="card-item" key={i}>
              <Icon icon="uil:processor" className="icon" />
              <h5>{data}</h5>
            </div>
          ))}
        </div>
      </div>
      <div className="survey-section">
        <h1>Memiliki Waktu Untuk Sedikit Survey ?</h1>
        <p>
          Dengan melakukan survey ini, kamu telah memberikan kontribusi dalam
          membantu algoritma <em>machine learning</em> kami untuk memberikan
          pilihan rekomendasi terbaik untuk kamu. Jika kamu telah memiliki akun
          dan ingin mengikuti survey ini, kamu bisa melakukan login dan juga
          klik tombol dibawah.
        </p>
        <Link to="/survey">Go To Survey</Link>
      </div>
    </div>
  );
};

export default LandingPage;
