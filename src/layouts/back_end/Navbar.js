import React from "react";
import { Link } from "react-router-dom";
import '../../assets/back_end/css/styles.css';
import '../../assets/back_end/js/scripts';

const Navbar = () =>{
    return (
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ps-3" href="index.html">Elections AEUTNA</a>
      <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
      <ul className="navbar-nav d-flex d-md-inline-block form-inline ms-auto  me-lg-4">
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#!">Settings</a></li>
                  <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link to="" className="dropdown-item">Déconnecter</Link></li>
              </ul>
          </li>
      </ul>
  </nav>
    );
}

export default Navbar;