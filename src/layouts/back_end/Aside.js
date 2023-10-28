import React from "react";
import { Link } from "react-router-dom";

const Aside = () =>{

  const toggleBodyClass = (e) => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
     e.preventDefault();
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
};

   return (
    <nav className="sb-sidenav accordion elevation-2 sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
            <div className="sb-sidenav-menu-heading">Accueil</div>
            <Link to="/admin/tableau_de_bord" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Tableau de bord
              </Link>
          </div>
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Liste des Electeurs</div>
              <Link to="/admin/liste_des_electeurs_membres" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-solid fa-users-line"></i></div>
                Membres
              </Link>
              <Link to="/admin/liste_des_electeurs_non_adheres" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                Non adhéré
              </Link>
             <Link to="/admin/liste_des_electeurs_votes" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-vote-yea"></i></div>
                Votes
              </Link>
          </div>
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Résultat</div>
              <Link to="/admin/statistiques" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-chart-bar"></i></div>
                Statistiques
              </Link>
          </div>
           <div className="nav">
            <div className="sb-sidenav-menu-heading">Utilisateurs</div>
              <Link to="/admin/liste_des_utilisateurs" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-solid fa-users fa-solid"></i></div>
                Utilisateurs
              </Link>
          </div>
      </div>
    </nav>
   );
}

export default Aside;