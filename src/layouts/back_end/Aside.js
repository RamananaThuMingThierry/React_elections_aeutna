import React from "react";
import { Link } from "react-router-dom";

const Aside = () =>{
   return (
    <nav className="sb-sidenav accordion elevation-2 sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
            <div className="sb-sidenav-menu-heading">Accueil</div>
            <Link to="/admin/dashboard" className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Tableau de bord
              </Link>
          </div>
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Listes des Electeurs</div>
              <Link to="/admin/membres" className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-solid fa-users-line"></i></div>
                Membres
              </Link>
              <Link to="" className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                Non adhéré
              </Link>
          </div>
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Votes</div>
            <Link to="/admin/listes-electeurs-membres" className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-vote-yea"></i></div>
                Electeurs
              </Link>
          </div>
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Utilisateurs</div>
              <Link to="/admin/profile" className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-solid fa-user"></i></div>
                Profiles
              </Link>
          </div>
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Statiques</div>
              <Link to="" className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-chart-bar"></i></div>
                Résultat
              </Link>
          </div>
      </div>
    </nav>
   );
}

export default Aside;