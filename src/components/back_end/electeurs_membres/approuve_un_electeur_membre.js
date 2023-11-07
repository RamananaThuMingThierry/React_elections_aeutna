import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";
const ApprouveUnElecteurMembre = (props) =>{

    const history = useHistory();

    const [loading, setLoading]  = useState(true);
    const [afficher_un_electeur_membre_approuve, setElecteurMembreApprouve] = useState([]);
    const [approuveInput, setApprouveMembres] = useState({
        secteurs:'',
        votes:''
    });

    const handleInput = (e) =>{
        e.persist();
        setApprouveMembres({...approuveInput, [e.target.name]: e.target.value});
    }

    const ValiderElecteurMembre = (e) =>{
        e.preventDefault();

        const id_electeur_membre = props.match.params.id;

        const data = {
            secteurs: approuveInput.secteurs,
            votes: approuveInput.votes
        }

        if(data.secteurs == ''){
            swal("Info", "Veuillez séléctionner son secteur !", "info");
        }else if(data.votes == ''){
            swal("Avertissement", "Veuillez séléctionner son pièce jointe !", "warning");
        }else{
            axios.post(`api/valide_un_electeur_membre/${id_electeur_membre}`, data).then(res =>{
                if(res.data.status  === 200){
                    swal("Réussi", res.data.message,"success");
                    history.push("/admin/liste_des_electeurs_votes");
                }else if(res.data.status === 404){
                    swal("Avertissement", res.data.message,"warning");
                }
            });
        }
    }

    useEffect(() =>{ 
        const electeur_id = props.match.params.id;
        axios.get(`api/approuve_un_electeur_membre/${electeur_id}`).then(res =>{
            if(res.data.status === 200){
                console.log(res.data.electeur_membre);
                setElecteurMembreApprouve(res.data.electeur_membre);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/dashboard");
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
                        <h2 className="text-center text-muted my-3 roboto-font">Informations</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 col-sm-6 mt-2">
                                    <div className="d-flex justify-content-center">
                                        <img style={{borderRadius: '5px'}} src={afficher_un_electeur_membre_approuve.photo != null ? `${BASE_URL}/${afficher_un_electeur_membre_approuve.photo}` : `${process.env.PUBLIC_URL}/images/photo.jpg`} height="250px" width="250px" alt="Image"/>                                          
                                    </div>
                                    </div>
                                    <div className="col-md-8 mt-2">
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Numéro Carte</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" disabled value={afficher_un_electeur_membre_approuve.numero_carte ?? '-'} style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Sexe</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" disabled value={afficher_un_electeur_membre_approuve.sexe ?? 'Masculin'} style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Nom</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficher_un_electeur_membre_approuve.nom ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Prénom</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficher_un_electeur_membre_approuve.prenom} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">C.I.N</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficher_un_electeur_membre_approuve.cin ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>    
                                        <div/>
                                    </div>
                                </div>
                                <form onSubmit={ValiderElecteurMembre}>
                                    {/* Secteurs et vote */}
                                    <div className="row">
                                        <div className="col-md-6 mt-2">
                                            <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Secteurs</label>
                                            <select className="form-select rounded-0 p-3 roboto-font" name="secteurs" value={approuveInput.secteurs} onChange={handleInput}>
                                                <option value="" selected>Secteurs</option>
                                                <option value="67 h">67 h</option>
                                                <option value="ambohipo">Ambohipo</option>
                                                <option value="ambolikandrina">Ambolikandrina</option>
                                                <option value="ankatso 1">Ankatso 1</option>
                                                <option value="ankatso 2">Ankatso 2 </option>
                                                <option value="itaosy">Itaosy</option>
                                                <option value="ivato">Ivato</option>
                                                <option value="votovorona">Votovorona</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mt-2">
                                            <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Vote</label>
                                            <select className="form-select rounded-0 p-3 roboto-font" name="votes" value={approuveInput.votes} onChange={handleInput}>
                                                <option value="" selected>Ouvre ce menu de séléction</option>
                                                <option value="numero_carte">Carte A.E.U.T.N.A</option>
                                                <option value="cin">C.I.N</option>
                                            </select>
                                        </div>
                                    </div> 
                                    <hr/>
                                    {/* Retour, Valider */}
                                    <div className="row">
                                        <div className="col-md-4 offset-md-4 mt-2">
                                            <Link to={`/admin/afficher_un_electeur_membre/${afficher_un_electeur_membre_approuve.id}`} className="btn btn-danger p-3 rounded-0 roboto-font w-100">Annuler</Link>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <button type="submit" className="btn btn-info p-3 text-white rounded-0 w-100 roboto-font">Valider</button>
                                        </div>
                                    </div> 
                                </form>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ApprouveUnElecteurMembre;