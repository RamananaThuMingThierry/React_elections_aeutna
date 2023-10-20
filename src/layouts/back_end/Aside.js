import React from "react";
import { Link } from "react-router-dom";

const Aside = () =>{
   return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Addons</div>
              <Link to="/admin/dashboard" className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Dashboard
              </Link>
              <Link to="" className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Dashboard
              </Link>
              <Link to="" className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Membres
              </Link>
          </div>
      </div>
    </nav>
   );
}

export default Aside;