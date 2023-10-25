import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../components/back_end/Dashboard";
import Profile from "../../components/back_end/Profile";
import Membres_electeurs from "../../components/back_end/electeurs/membres";
import AddMembres from "../../components/back_end/electeurs/add_membres";
import ShowMembres from "../../components/back_end/electeurs/show_membres";
import Navbar from "./Navbar";
import Aside from "./Aside";
import Footer from "./Footer";
import Liste_des_membres_electeurs from "../../components/back_end/electeurs/liste_des_electeurs";
import ApprouveMembres from "../../components/back_end/electeurs/approuve_membres";
import ErrorPage from '../../components/ErrorPage';
import '../../assets/back_end/css/styles.css';
import '../../assets/back_end/js/scripts';
import EditMembres from "../../components/back_end/electeurs/edit_membres";
import ShowElecteurs from "../../components/back_end/electeurs/show_electeurs";
import Non_adhere from "../../components/back_end/electeurs/non_adhere";
import AddElecteurNonAdhere from "../../components/back_end/electeurs/add_electeur_non_adhere";
import ShowElecteurNonAdhere from "../../components/back_end/electeurs/show_electeur_non_adhere";
import EditElecteurNonAdhere from "../../components/back_end/electeurs/edit_electeur_non_adhere";
import Resultat from "../../components/back_end/statistiques/resultat";
import Liste_des_Utilisateurs from "../../components/back_end/users/Liste_des_Utilisateurs";

class MasterLayout extends Component{
    render(){
        return (
            <>
                <Navbar/>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <Aside/>
                    </div>
                    <div id="layoutSidenav_content"  style={{backgroundColor:'#ccc'}}>
                        <main>
                            <div class="container-fluid">
                                <Switch>
                                    <Route exact path="/admin/dashboard" component={Dashboard} />
                                    <Route exact path="/admin/profile" component={Profile} />
                                    {/* Membres */}
                                    <Route exact path="/admin/membres" component={Membres_electeurs} />
                                    {/* liste des électeurs */}
                                    <Route exact path="/admin/listes-electeurs-membres" component={Liste_des_membres_electeurs} />
                                    {/* liste membres non adhéré */}
                                    <Route exact path="/admin/liste-non-adhere" component={Non_adhere} />
                                    {/* Liste des utilisateurs */}
                                    <Route exact path="/admin/liste_utilisateurs" component={Liste_des_Utilisateurs} />
                                    {/* Approuve membres AEUTNA */}
                                    <Route exact path="/admin/approuve-membres/:id" component={ApprouveMembres} />
                                    <Route exact path="/admin/add-membres" component={AddMembres} />
                                    <Route exact path="/admin/add-nouveau-bachelier" component={AddElecteurNonAdhere} />
                                    <Route exact path="/admin/show-membre/:id" component={ShowMembres} />
                                    <Route exact path="/admin/show-electeur/:id" component={ShowElecteurs} />
                                    <Route exact path="/admin/show-electeur-non-adhere/:id" component={ShowElecteurNonAdhere} />
                                    <Route exact path="/admin/edit-membres/:id" component={EditMembres} />
                                    <Route exact path="/admin/edit-electeur-non-adhere/:id" component={EditElecteurNonAdhere} />
                                    <Route exact path="/admin/resultat" component={Resultat} />

                                    {/* Page d'erreurs */}
                                    <Route component={ErrorPage}/>
                                </Switch>
                            </div>
                        </main>
                    <Footer/>
                    </div>
                </div>
            </>
        );
    }
}

export default MasterLayout;