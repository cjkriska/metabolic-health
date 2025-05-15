import React from "react";
import BiomarkerData from "./modules/BiomarkerData.js";
import HabitTracking from "./modules/HabitTracking.js";
import Insights from "./modules/Insights.js";
import LearnMore from "./modules/LearnMore.js";
import "./css/Profile.css";

function Profile(props) {

    return (
        {/* <div className="profile-container">
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
         </div> */},

        <div className="dashboard-container">
          <div className="dash-intro">
            Welcome {props.currentUser.name}! Here's your metabolic health at a glance:
          </div>
          <div className="dashboard-data-container">
            <div className="dash-left-column">
              <BiomarkerData />
            </div>
            <div className="dash-right-column">
              <div className="dash-top-row">
                <HabitTracking />
              </div>
              <div className="dash-bottom-row">
                <div className="dash-bottom-row-left">
                  <Insights />
                </div>
                <div className="dash-bottom-row-right">
                  <LearnMore />
                </div>
              </div>
            </div>
          </div>
        </div>
    );

}

export default Profile;
