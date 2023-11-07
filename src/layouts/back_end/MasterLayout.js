import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
/*------------------------ Layouts --------------------------*/
import Navbar from "./Navbar";
import Aside from "./Aside";
import Footer from "./Footer";

/*------------------------- Style ---------------------------*/
import '../../assets/back_end/css/styles.css';
import '../../assets/back_end/js/scripts';

/*-------------------------- Utilisateurs ---------------------*/
import Liste_des_Utilisateurs from "../../components/back_end/utilisateurs/liste_des_Utilisateurs";
import ModifierUnUtilisateur from "../../components/back_end/utilisateurs/modifier_un_utilisateur";
import AfficherUnUtilisateur from "../../components/back_end/utilisateurs/afficher_un_utilisateur";

/*----------------------- Tableau de bord --------------------*/
import TableauDeBoard from "../../components/back_end/TableauDeBoard";

/*------------------------- Profile --------------------------*/
import Profile from "../../components/back_end/Profile";
import ModifierMotDePasse from "../../components/back_end/auths/modifier_mot_de_passe";


/*------------------------ Page d'Erreur ---------------------*/
import PageDErreur from "../../components/PageDErreur";

/*-------------------------- Electeurs Non Adherés -----------------------*/
import AjouterElecteurNonAdhere from "../../components/back_end/electeurs_non_adheres/ajouter_electeur_non_adhere";
import ListeDesElecteursNonAdheres from "../../components/back_end/electeurs_non_adheres/liste_des_electeurs_non_adhere";
import ModifierUnElecteurNonAdhere from "../../components/back_end/electeurs_non_adheres/modifier_un_electeur_non_adhere";
import AfficherUnElecteurNonAdhere from "../../components/back_end/electeurs_non_adheres/afficher_un_electeur_non_adhere";

/*--------------------------- Electeurs Votes --------------------------*/
import Liste_des_electeurs_votes from "../../components/back_end/electeurs_votes/liste_des_electeurs_votes";
import AfficherUnElecteurMembreVote from "../../components/back_end/electeurs_votes/afficher_un_electeur_membre_vote";
import AfficherUnElecteurNonAdhereVote from "../../components/back_end/electeurs_votes/afficher_un_electeur_non_adhere_vote";

/*------------------------------------ Electeurs Membres --------------------------*/
import AjouterUnElecteurMembre from "../../components/back_end/electeurs_membres/ajouter_un_electeur_membre";
import AfficherUnElecteurMembre from "../../components/back_end/electeurs_membres/afficher_un_electeur_membre";
import ListeDesElecteursMembres from "../../components/back_end/electeurs_membres/liste_des_electeurs_membres";
import ModifierUnElecteurMembre from "../../components/back_end/electeurs_membres/modifier_un_electeur_membre";
import ApprouveUnElecteurMembre from "../../components/back_end/electeurs_membres/approuve_un_electeur_membre";

/*-------------------------------- Statistiques --------------------------------*/
import Statistiques from "../../components/back_end/resultats/statistiques";
import Export_liste_des_electeurs from "../../components/back_end/electeurs_membres/export_liste_des_electeurs";


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
                                    <Route exact path="/admin/tableau_de_bord" component={TableauDeBoard} />
                                    <Route exact path="/admin/profile" component={Profile} />
                                    <Route exact path="/admin/modifier_mot_de_passe" component={ModifierMotDePasse} />
                                    
                                    {/*--------------------------------- Membres AEUTNA ------------------------------------*/}
                                    <Route exact path="/admin/ajouter_un_electeur_membre" component={AjouterUnElecteurMembre} />
                                    <Route exact path="/admin/export_liste_des_electeurs" component={Export_liste_des_electeurs} />
                                    <Route exact path="/admin/liste_des_electeurs_membres" component={ListeDesElecteursMembres} />
                                    <Route exact path="/admin/modifier_un_electeur_membre/:id" component={ModifierUnElecteurMembre} />
                                    <Route exact path="/admin/afficher_un_electeur_membre/:id" component={AfficherUnElecteurMembre} />
                                    <Route exact path="/admin/approuve_un_electeur_membre/:id" component={ApprouveUnElecteurMembre} />
                                    
                                    {/* Non adhéré */}
                                    <Route exact path="/admin/ajouter_un_electeur_non_adhere" component={AjouterElecteurNonAdhere} />
                                    <Route exact path="/admin/liste_des_electeurs_non_adheres" component={ListeDesElecteursNonAdheres} />
                                    <Route exact path="/admin/modifier_un_electeur_non_adhere/:id" component={ModifierUnElecteurNonAdhere} />
                                    <Route exact path="/admin/afficher_electeur_non_adhere/:id" component={AfficherUnElecteurNonAdhere} /> 
                                    
                                    {/*-------------------------------- liste des électeurs votes ----------------------------------*/}
                                    <Route exact path="/admin/liste_des_electeurs_votes" component={Liste_des_electeurs_votes} />
                                    <Route exact path="/admin/afficher_un_electeur_membre_vote/:id" component={AfficherUnElecteurMembreVote} />
                                    <Route exact path="/admin/afficher_un_electeur_non_adhere_vote/:id" component={AfficherUnElecteurNonAdhereVote} />
                                    
                                    {/* Liste des utilisateurs */}
                                    <Route exact path="/admin/liste_des_utilisateurs" component={Liste_des_Utilisateurs} />
                                    <Route exact path="/admin/modifier_un_utilisateur/:id" component={ModifierUnUtilisateur} />
                                    <Route exact path="/admin/afficher_un_utilisateur/:id" component={AfficherUnUtilisateur} />
                                    

                                    {/* --------------------------------- Statistiques ---------------------------------------- */}
                                    <Route exact path="/admin/statistiques" component={Statistiques} />

                                    {/* --------------------------------- Page d'erreurs ----------------------------------------*/}
                                    <Route component={PageDErreur}/>
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