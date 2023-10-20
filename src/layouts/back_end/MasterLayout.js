import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../components/back_end/Dashboard";
import Profile from "../../components/back_end/Profile";
import Membres_electeurs from "../../components/back_end/electeurs/membres_electeurs";
import Navbar from "./Navbar";
import Aside from "./Aside";
import Footer from "./Footer";
import ErrorPage from '../../components/ErrorPage';
import '../../assets/back_end/css/styles.css';
import '../../assets/back_end/js/scripts';

class MasterLayout extends Component{
    render(){
        return (
            <>
                <Navbar/>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <Aside/>
                    </div>
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid">
                                <Switch>
                                    <Route exact path="/admin/dashboard" component={Dashboard} />
                                    <Route exact path="/admin/profile" component={Profile} />
                                    {/* Elécteurs */}
                                    <Route exact path="/admin/electeurs-membres" component={Membres_electeurs} />
                                    {/* <Route exact path="/admin/add-category" component={AddCategory} />
                                    <Route exact path="/admin/view-category/:id" component={ViewCategory} />
                                    <Route exact path="/admin/edit-category/:id" component={EditCategory} /> */}

                                    {/* Users */}
                                    {/* <Route exact path="/admin/users" component={Users} /> */}

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