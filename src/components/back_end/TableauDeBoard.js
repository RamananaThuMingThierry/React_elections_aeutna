import React, { Fragment } from "react";

const TableauDeBoard = () =>{
    return (
        <Fragment>
          <div className="card mt-2 elevation-1 rounded-0">
          <img style={{height:"87vh"}} className="rounded-0" src={`${process.env.PUBLIC_URL}/images/bg.jpg`}  alt="Image"/>  
          </div>
        </Fragment>
    );
}

export default TableauDeBoard;