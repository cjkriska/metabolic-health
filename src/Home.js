import React from "react";
import "./css/Home.css";
import metaBioLogo from "./images/MetaBioFullLogo.png";

function Home() {
    return (
      <div className="home-container">
        <img src={metaBioLogo} alt="MetaBio Logo" />
        <div className="container">
          <div className="graf-bg-container">
            <div className="graf-layout">
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
              <div className="graf-circle"></div>
            </div>
          </div>
          <h1 className="home-title">
          </h1>
        </div>
      </div>
    );
}

export default Home;
