import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import Loading from "../constants/Loading";

const ModifierUnElecteurNonAdhere = (props) =>{

    const history = useHistory();

    const [electeur_non_adhere_input, setElecteurNonAdhere]= useState([]);
    
    const [loading, setLoading]= useState([]);

    useEffect(() =>{
        const id_electeur_non_adhere = props.match.params.id;
        axios.get(`api/obtenir_un_electeur_non_adhere/${id_electeur_non_adhere}`).then(res =>{
            if(res.data.status === 200){
                console.log(res.data.electeur_non_adhere);
                setElecteurNonAdhere(res.data.electeur_non_adhere);
            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                history.push('/admin/liste_des_electeurs_non_adheres');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) =>{
        e.persist();

        setElecteurNonAdhere({...electeur_non_adhere_input, [e.target.name]: e.target.value});
    }

    const modifierUnElecteurNonAdhereSubmit = (e) =>{

        e.preventDefault();

        const id_membre = props.match.params.id;
        
        const formData = new FormData();

        electeur_non_adhere_input.nom = electeur_non_adhere_input.nom ?? '';
        electeur_non_adhere_input.prenom = electeur_non_adhere_input.prenom ?? '';
        electeur_non_adhere_input.sexe = electeur_non_adhere_input.sexe ?? '';
        electeur_non_adhere_input.cin = electeur_non_adhere_input.cin ?? '';
        electeur_non_adhere_input.secteurs = electeur_non_adhere_input.secteurs ?? '';
        electeur_non_adhere_input.axes = electeur_non_adhere_input.axes ?? '';
        electeur_non_adhere_input.votes = electeur_non_adhere_input.votes ?? '';
        electeur_non_adhere_input.adhesion = electeur_non_adhere_input.adhesion ?? '';
        electeur_non_adhere_input.heure_vote = electeur_non_adhere_input.heure_vote;
        electeur_non_adhere_input.date_inscription = electeur_non_adhere_input.date_inscription;

        if(electeur_non_adhere_input.nom == ''){
            swal("Avertissement", "Veuillez saisir votre nom !", "warning");
        }else if(electeur_non_adhere_input.sexe == ''){
            swal("Avertissement", "Veuillez séléctionner votre sexe !", "warning");
        }else if(electeur_non_adhere_input.cin != '' && electeur_non_adhere_input.cin.length != 12){
            swal("Avertissement", "Votre numéro de C.I.N invalide !", "warning");
        }else if(electeur_non_adhere_input.axes == ''){
                swal("Avertissement", "Veuillez séléctionner votre axes !", "warning");
        }else if(electeur_non_adhere_input.secteurs == ''){
            swal("Avertissement", "Veuillez votre secteurs !", "warning");
        }else if(electeur_non_adhere_input.votes == ''){
            swal("Avertissement", "Veuillez votre date d'inscription !", "warning");
        }else if(electeur_non_adhere_input.adhesion == ''){
            swal("Avertissement", "Vérifier si vous êtes membres ou pas !", "warning");
        }else if(electeur_non_adhere_input.adhesion == '1' && electeur_non_adhere_input.votes == 'Relevé de notes'){
            swal("Avertissement", "Vous n'êtes pas autoriser à faire une adhésion !", "warning");
        }else if(electeur_non_adhere_input.cin == '' && electeur_non_adhere_input.votes == 'C.I.N'){
            swal("Avertissement", "Votre pièce justificative invalide !", "warning");
        }else if(electeur_non_adhere_input.cin != '' && electeur_non_adhere_input.votes == 'Copie'){
            swal("Avertissement", "Votre pièce justificative invalide !", "warning");
        }else if(electeur_non_adhere_input.date_inscription == ''){
            swal("Avertissement", "Veuillez votre date d'inscription !", "warning");
        }else{
            formData.append('nom', electeur_non_adhere_input.nom);
            formData.append('prenom', electeur_non_adhere_input.prenom);
            formData.append('sexe', electeur_non_adhere_input.sexe);
            formData.append('cin', electeur_non_adhere_input.cin);
            formData.append('secteurs', electeur_non_adhere_input.secteurs);
            formData.append('axes', electeur_non_adhere_input.axes);
            formData.append('votes', electeur_non_adhere_input.votes);
            formData.append('adhesion', electeur_non_adhere_input.adhesion);
            formData.append('heure_vote', electeur_non_adhere_input.heure_vote);
            formData.append('date_inscription', electeur_non_adhere_input.date_inscription);

            axios.post(`api/modifier_un_electeur_non_adhere/${id_membre}`, formData).then(res =>{ 
                console.log(res.data);
                if(res.data.status === 200){
                    swal("Réussi", res.data.message, "success");
                    history.push('/admin/liste_des_electeurs_non_adheres');
                }else if(res.data.status === 404){
                    swal("Avertissement", res.data.message, "warning");
                }else if(res.data.status === 422){
                    swal("Avertissement", res.data.message, "warning");
                }
            });
        }
    }

    if(loading){
       return <Loading/>
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h3 className="text-center text-muted roboto-font my-3">Modifier un électeur non adhéré</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <form  onSubmit={modifierUnElecteurNonAdhereSubmit}>
                                {/* Nom, Prénom, Sexe */}
                                <div className="row">
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}  className="roboto-font" for="nom">Nom</label>
                                        <input className="form-control roboto-font p-3 rounded-0" type="text" autoComplete="false" id="nom" name="nom" value={electeur_non_adhere_input.nom ?? ''} placeholder="Saisir votre nom" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font"  for="prenom">Prénom</label>
                                        <input className="form-control roboto-font p-3 rounded-0" type="text" value={electeur_non_adhere_input.prenom ?? ''} id="prenom" name="prenom" autoComplete="false" placeholder="Saisir votre prénom" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font"  for="sexe">Sexe</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="sexe" id="sexe" value={electeur_non_adhere_input.sexe} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="masculin">Masculin</option>
                                            <option value="feminin">Féminin</option>
                                        </select>
                                    </div>
                                </div>
                                {/* C.I.N et lieu de délivrance et axes */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="cin">C.I.N</label>
                                        <input maxLength={12} minLength={12} className="form-control roboto-font p-3 rounded-0" id="cin" type="number" onChange={handleInput} value={electeur_non_adhere_input.cin ?? ''} autoComplete="false" placeholder="Saisir votre Numéro de C.I.N" name="cin"/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="axes">Axes</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="axes" id="axes" value={electeur_non_adhere_input.axes} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="Andempona">Andempona</option>
                                            <option value="Andrarony">Andrarony</option>
                                            <option value="Ankavanana">Ankavanana</option>
                                            <option value="Ankavia">Ankavia</option>
                                            <option value="Antalaha ville">Antalaha Ville</option>
                                            <option value="Cap-Est">Cap-Est</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="secteurs">Secteurs</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="secteurs" id="secteurs" value={electeur_non_adhere_input.secteurs} onChange={handleInput}>
                                            <option value="" selected>Secteurs</option>
                                            <option value="67 h">67 h</option>
                                            <option value="Ambohipo">Ambohipo</option>
                                            <option value="Ambolikandrina">Ambolikandrina</option>
                                            <option value="Ankatso 1">Ankatso 1</option>
                                            <option value="Ankatso 2">Ankatso 2</option>
                                            <option value="Centre Ville">Centre Ville</option>
                                            <option value="Itaosy">Itaosy</option>
                                            <option value="Ivato">Ivato</option>
                                            <option value="Votovorona">Votovorona</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="votes">Pièce justificative</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="votes" id="votes" value={electeur_non_adhere_input.votes} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="C.I.N">C.I.N</option>
                                            <option value="Copie">Copie</option>
                                            <option value="Relevé de notes">Relève de notes</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font text-muted" for="adhesion">Adhésion</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="adhesion" id="adhesion" value={electeur_non_adhere_input.adhesion} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="1">Oui</option>
                                            <option value="0">Non</option>
                                        </select>
                                    </div>
                                </div>
                                <hr className="mt-4"/>
                                <div className="row">
                                <div className="col-md-4 offset-md-4 mt-2">
                                    <Link to="/admin/liste_des_electeurs_non_adheres" className="btn btn-danger p-3 roboto-font rounded-0 w-100">Annuler</Link>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <button type="submit" className="btn btn-info p-3 text-white roboto-font rounded-0 w-100">Valider</button>
                                    </div>
                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        );
}

export default ModifierUnElecteurNonAdhere;