import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";
import FormatageDate from "../constants/formatageDate";
const AfficherUnElecteurNonAdhere = (props) =>{

    const history = useHistory();

    const [loading, setLoading]  = useState(true);
    const [afficher_electeur_non_adhere, setMembres] = useState([]);

    useEffect(() =>{ 
        const id_electeur_non_adhere = props.match.params.id;
        axios.get(`${BASE_URL}/api/afficher_un_electeur_non_adhere/${id_electeur_non_adhere}`).then(res =>{   
            console.log(res.data);
            if(res.data.status === 200){
                setMembres(res.data.electeur_non_adhere);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/tableau_de_bord");
            }
            setLoading(false);
        });
    },[props.match.params.id]);

    if(loading){
        return <Loading/>
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h3 className="text-center text-muted my-3 roboto-font">Informations</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Nom</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={afficher_electeur_non_adhere.nom ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Prénom</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={afficher_electeur_non_adhere.prenom} disabled style={{backgroundColor:'white'}}/>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Sexe</label>
                                    <input className="form-control roboto-font p-3 rounded-0" disabled value={afficher_electeur_non_adhere.sexe ?? 'Masculin'} style={{backgroundColor:'white'}}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">C.I.N</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={afficher_electeur_non_adhere.cin ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Axes</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={afficher_electeur_non_adhere.axes ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                </div>    
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Secteurs</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={afficher_electeur_non_adhere.secteurs ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Votes</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={afficher_electeur_non_adhere.votes ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Date d'inscription</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={FormatageDate(afficher_electeur_non_adhere.date_inscription)} disabled style={{backgroundColor:'white'}}/>
                                </div>
                            </div> 
                            <hr className="mt-4"/>
                            <div className="row">
                                <div className="col-md-4 offset-md-8">
                                    <Link to="/admin/liste_des_electeurs_non_adheres" className="btn btn-primary roboto-font p-3 rounded-0 w-100">Retour</Link>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AfficherUnElecteurNonAdhere;