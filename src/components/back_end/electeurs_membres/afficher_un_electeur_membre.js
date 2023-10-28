import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";
const AfficherUnElecteurMembre = (props) =>{

    const history = useHistory();

    const [loading, setLoading]  = useState(true);
    const [afficherUnElecteurMembre, setElecteurMembres] = useState([]);

    useEffect(() =>{ 
        const id_electeur_membre = props.match.params.id;
        axios.get(`api/afficher_un_electeur_membre/${id_electeur_membre}`).then(res =>{
            if(res.data.status === 200){
                setElecteurMembres(res.data.electeur_membre);
                console.log(res.data.electeur_membre);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/liste_des_electeurs_membres");
            }
            setLoading(false);
        }) .catch(error => {
            swal("Error", "Une erreur s'est produite lors de l'appel à l'API", "error");
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
                        <h2 className="text-center text-muted roboto-font my-3">Informations</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <div className="row">
                                    <div className="col-md-4">
                                        <div className="d-flex justify-content-center">
                                            <img style={{borderRadius: '5px'}} src={afficherUnElecteurMembre.photo == null ? `${process.env.PUBLIC_URL}/images/photo.jpg` : `${BASE_URL}/${afficherUnElecteurMembre.photo}`} height="250px" width="250px" alt="Image"/>                                          
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Numéro Carte</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" disabled value={afficherUnElecteurMembre.numero_carte ?? '-'} style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-6">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Sexe</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" disabled value={afficherUnElecteurMembre.sexe ?? 'Masculin'} style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Nom</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnElecteurMembre.nom ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Prénom</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnElecteurMembre.prenom} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">C.I.N</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnElecteurMembre.cin ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Axes</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnElecteurMembre.axes ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">sympathisant(e)</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnElecteurMembre.sympathisant ?? 'Non'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Date d'inscription</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnElecteurMembre.date_inscription ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                <hr className="mt-4"/>
                                <div className="row">
                                    <div className="col-md-4 offset-md-4 mt-2">
                                      <Link to="/admin/liste_des_electeurs_membres" className="btn btn-primary p-3 rounded-0 w-100 roboto-font">Retour</Link>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                    <Link to={`/admin/approuve_un_electeur_membre/${afficherUnElecteurMembre.id}`} className="btn btn-warning text-white p-3 rounded-0 w-100 roboto-font">Approuver</Link>
                                      </div>
                                </div> 
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AfficherUnElecteurMembre;