import React from "react";
import BiomarkerData from "./modules/BiomarkerData.js";
import HabitTracking from "./modules/HabitTracking.js";
import Insights from "./modules/Insights.js";
import LearnMore from "./modules/LearnMore.js";
import "./css/Profile.css";

function Profile(props) {
  
    return (
      <div>

        <div className="profile-container">
          <div className="container">
            <div className="profile-info">
              <div className="profile-avatar">
                {props.currentUser.imageUrl ? (
                  <img
                    src={props.currentUser.imageUrl}
                    alt={props.currentUser.name}
                  />
                ) : (
                  <div className="text-avatar">
                    <span>
                      {props.currentUser.name &&
                        props.currentUser.name[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="profile-name">
                <h2>{props.currentUser.name}</h2>
                <p className="profile-email">{props.currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-container">
          <div className="dashboard-first-row">
            <BiomarkerData />
            <HabitTracking />
          </div>
          <div className="dashboard-second-row">
            <Insights />
            <LearnMore />
          </div>
        </div>
      </div>
    );

}

export default Profile;
