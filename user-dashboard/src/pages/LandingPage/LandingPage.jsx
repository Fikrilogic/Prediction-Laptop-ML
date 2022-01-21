import { Icon } from "@iconify/react";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WelcomeImage from "../../assets/img/landing-page-image.png";
import "./LandingPage.scss";

const LandingPage = () => {
  const navigate = useNavigate();
  // const algorithm = [
  //   {name: "K-Nearest Neighbors", link: ''},
  //   {name: "Decision Tree", link: ''},
  //   {name: "Gradient Boost Decision Tree", link: ''},
  //   {name: "Naive Bayes", link: ''},
  // ]

  return (
    <div className="container-landing">
      <div className="welcome-section">
        <div className="welcome-wrapper">
          <p className="title">CREAVEN</p>
          <p className="sub">
            Gives you the best prediction for laptop’s recommendation
          </p>
          <div className="browse">
            <Button label="Consult Now" onClick={() => navigate("/consult")} />
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
          <h2>WHAT IS CREAVEN ?</h2>
          <p>
            <strong>Creaven</strong> is a website that uses some sort of machine
            learning algorithm, such as{" "}
            <span className="algorithm">K-Nearest Neighbors</span>,{" "}
            <span className="algorithm">Decision Tree</span>,{" "}
            <span className="algorithm">Gradient Boost Decision Tree</span> and{" "}
            <span className="algorithm">Naive Bayes</span>. These algorithm will
            gives you the best laptop's recommendation for you day to day needs.
          </p>
        </div>
        <div className="goal-section">
          <h2>WHAT IS THE GOAL ?</h2>
          <p>
            The goal of the creation of this website is to find which is the
            best machine learning algorithm to use for prediction. In this case,{" "}
            <strong>Creaven</strong> uses these algorithm to predict the best
            laptop recommendation based on user's needs.
          </p>
        </div>
      </div>
      <div className="algorithm-section">
        <div className="title">
          <h2>ALGORITHM CREAVEN USES</h2>
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
        <h1>Have Time For A Little Survey ?</h1>
        <p>
          By doing this survey, you are contributing to help our machine
          learning algorithm to give the best prediction for you. If you already
          logged in and want to participate in this survey, You can click the
          link below.
        </p>
        <Link to="/survey">Go To Survey</Link>
      </div>
    </div>
  );
};

export default LandingPage;
