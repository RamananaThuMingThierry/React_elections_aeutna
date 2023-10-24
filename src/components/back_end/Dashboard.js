import React, { Fragment } from "react";

const Dashboard = () =>{
    return (
        <Fragment>
          <div className="card mt-2 elevation-1 rounded-0">
          <img style={{borderRadius: '5px',  height:"85vh"}} className="rounded-0" src={`${process.env.PUBLIC_URL}/images/bg.jpg`}  alt="Image"/>  
          </div>
        </Fragment>
    );
}

export default Dashboard;