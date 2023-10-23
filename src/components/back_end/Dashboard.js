import React from "react";

const Dashboard = () =>{
    return (
        <div className="container-fluid elevation-1 mt-2">
          <div className="card elevation-1 rounded-0">
          <img style={{borderRadius: '5px',  height:"85vh"}} className="rounded-0" src={`${process.env.PUBLIC_URL}/images/bg.jpg`}  alt="Image"/>  
          </div>
        </div>
    );
}

export default Dashboard;