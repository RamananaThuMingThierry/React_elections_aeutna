import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";
const AfficherUnElecteurMembreVote = (props) =>{

    const history = useHistory();

    const [loading, setLoading]  = useState(true);
    const [showmembres, setMembres] = useState([]);
    const [user, setUser] = useState([]);

    const fetchUserId = async () => {
        try {
            const response = await axios.get('/api/getUser');
            if(response.data.status === 200){
                setUser(response.data.user);
                setLoading(false);
            }else{
                swal("Avertissement", response.data.message, "error");
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    useEffect(() =>{ 
        const id_electeur_membre_vote = props.match.params.id;
        axios.get(`api/afficher_un_electeur_membre_vote/${id_electeur_membre_vote}`).then(res =>{
            if(res.data.status === 200){
                setMembres(res.data.electeur_membre_vote);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/electeur_non_adhere_vote");
            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                history.push("/admin/tableau_de_bord");
            }
            fetchUserId();
        });
    },[props.match.params.id]);

    const DesapprouverUnElecteur = (e) =>{
        e.preventDefault();

        const electeur_id = props.match.params.id;

        axios.post(`api/desapprouve_un_electeur_vote/${electeur_id}`).then(res =>{
            if(res.data.status === 200){
                swal("Success", res.data.message, "success");
                history.push('/admin/liste_des_electeurs_membres');
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/tableau_de_bord");
            }
        });
    }

    if(loading){
        return <Loading/>
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h3 className="text-center roboto-font text-muted my-3">Informations</h3>
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
                                            <img style={{borderRadius: '5px'}} src={showmembres.photo == null ? `${process.env.PUBLIC_URL}/images/photo.jpg` : `${BASE_URL}/${showmembres.photo}`} width="250px" height="250px" alt="Image"/>                                          
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Numéro Carte</label>
                                                <input className="form-control roboto-font p-3 rounded-0" disabled value={showmembres.numero_carte ?? '-'} style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Sexe</label>
                                                <input className="form-control roboto-font p-3 rounded-0" disabled value={showmembres.sexe ?? 'Masculin'} style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Nom</label>
                                                <input className="form-control roboto-font p-3 rounded-0" value={showmembres.nom ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Prénom</label>
                                                <input className="form-control roboto-font p-3 rounded-0" value={showmembres.prenom} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">C.I.N</label>
                                                <input className="form-control roboto-font p-3 rounded-0" value={showmembres.cin ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Axes</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.axes ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">sympathisant(e)</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.sympathisant ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Date d'inscription</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.date_inscription ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-6 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Secteurs</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.secteurs ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Votes</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.cin == 'cin' ? 'C.I.N' : 'Carte A.E.U.T.N.A'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                <hr className="mt-4"/>
                                <div className="row">
                                    <div className="col-md-4">
                                    </div>
                                    {
                                        user.roles == 0
                                        ?
                                            <div className="col-md-4 offset-md-8 mt-2">
                                                <Link to="/admin/listes-electeurs-membres" className="btn btn-danger roboto-font p-3 rounded-0 w-100">Retour</Link>
                                            </div>
                                        :
                                        <>
                                            <div className="col-md-4 mt-2">
                                                <Link to="/admin/liste_des_electeurs_votes" className="btn btn-danger roboto-font p-3 rounded-0 w-100">Retour</Link>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <Link type="button" onClick={DesapprouverUnElecteur} className="btn btn-warning text-white roboto-font p-3 rounded-0 w-100">Désapprouver</Link>
                                            </div>
                                        </>
                                    }
                                </div> 
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AfficherUnElecteurMembreVote;