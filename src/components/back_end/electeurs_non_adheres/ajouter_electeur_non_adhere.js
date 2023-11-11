import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

const AjouterElecteurNonAdhere = () =>{

    const history = useHistory();

    const [electeursInput, setElecteurs] = useState({
        nom:'',
        prenom:'',
        sexe:'',
        cin:'',
        axes:'',
        secteurs:'',
        votes:'',
        adhesion:'',
    });

    const handleInput = (e) =>{
        e.persist();
        setElecteurs({...electeursInput, [e.target.name]: e.target.value});
    }
    
    const AjouterElecteurNonAdhereSubmit = (e) =>{
        e.preventDefault();

        const formData = new FormData();

        if(electeursInput.nom == ''){
            swal("Avertissement", "Veuillez saisir votre nom !", "warning");
        }else if(electeursInput.sexe == ''){
            swal("Avertissement", "Veuillez séléctionner votre sexe !", "warning");
        }else if(electeursInput.cin != '' && electeursInput.cin.length != 12){
            swal("Avertissement", "Votre numéro de C.I.N invalide !", "warning");
        }else if(electeursInput.axes == ''){
                swal("Avertissement", "Veuillez séléctionner votre axes !", "warning");
        }else if(electeursInput.secteurs == ''){
            swal("Avertissement", "Veuillez séléctionner votre secteurs !", "warning");
        }else if(electeursInput.votes == ''){
            swal("Avertissement", "Veuillez séléctionner votre pièce justificative !", "warning");
        }else if(electeursInput.adhesion == ''){
            swal("Avertissement", "Vérifier si vous êtes membres ou pas!", "warning");
        }else if(electeursInput.adhesion == '1' && electeursInput.votes == 'Relève de notes'){
            swal("Avertissement", "Vous n'êtes pas autoriser à faire une adhésion !", "warning");
        }else if(electeursInput.cin == '' && electeursInput.votes == 'C.I.N'){
            swal("Avertissement", "Votre pièce jusitifactive invalide !", "warning");
        }else{
            formData.append('nom', electeursInput.nom);
            formData.append('prenom', electeursInput.prenom);
            formData.append('sexe', electeursInput.sexe);
            formData.append('cin', electeursInput.cin);
            formData.append('secteurs', electeursInput.secteurs);
            formData.append('axes', electeursInput.axes);
            formData.append('votes', electeursInput.votes);
            formData.append('adhesion', electeursInput.adhesion);
            
            console.log(formData);
    
            axios.post(`api/ajouter_un_electeur_non_adhere`, formData).then(res =>{
                if(res.data.status === 200){
                    swal("Success", res.data.message, "success");
                    history.push('/admin/liste_des_electeurs_non_adheres');
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message, "warning");
                }else if(res.data.status === 422){
                    history.push('/admin/liste_des_electeurs_non_adheres');
                }else if(res.data.status === 400){
                    swal("Avertissement", res.data.message, "error");
                }else if(res.data.status === 422){
                    swal("Warning", res.data.message, "warning");
                }
            });
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h3 className="text-center text-success roboto-font my-3">AJOUTER UN ELECTEUR NON ADHERE</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <form  onSubmit={AjouterElecteurNonAdhereSubmit}>
                                {/* Nom, Prénom, Sexe */}
                                <div className="row">
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font text-muted" for="nom">Nom</label>
                                        <input className="form-control p-3 roboto-font rounded-0" type="text" autoComplete="false" id="nom" name="nom" value={electeursInput.nom ?? ''} placeholder="Saisir votre nom" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font text-muted" for="prenom">Prénom</label>
                                        <input className="form-control p-3 roboto-font rounded-0" type="text" value={electeursInput.prenom ?? ''} id="prenom" name="prenom" autoComplete="false" placeholder="Saisir votre prénom" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font text-muted" for="sexe">Sexe</label>
                                        <select className="form-select rounded-0 roboto-font p-3" name="sexe" id="sexe" value={electeursInput.sexe} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="masculin">Masculin</option>
                                            <option value="feminin">Féminin</option>
                                        </select>
                                    </div>
                                </div>
                                {/* C.I.N et lieu de délivrance et axes */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font text-muted" for="cin">C.I.N</label>
                                        <input maxLength={12} minLength={12} className="form-control roboto-font p-3 rounded-0" id="cin" type="number" onChange={handleInput} value={electeursInput.cin ?? ''} autoComplete="false" placeholder="Saisir votre Numéro de C.I.N" name="cin"/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font text-muted" for="axes">Axes</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="axes" id="axes" value={electeursInput.axes} onChange={handleInput}>
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
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font text-muted" for="secteurs">Secteurs</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="secteurs" id="secteurs" value={electeursInput.secteurs} onChange={handleInput}>
                                            <option value="" selected>Secteurs</option>
                                            <option value="67 h">67 h</option>
                                            <option value="Ambohipo">Ambohipo</option>
                                            <option value="Ambolikandrina">Ambolikandrina</option>
                                            <option value="Ankatso 1">Ankatso 1</option>
                                            <option value="Ankatso 2">Ankatso 2 </option>
                                            <option value="Centre Ville">Centre Ville</option>
                                            <option value="Itaosy">Itaosy</option>
                                            <option value="Ivato">Ivato</option>
                                            <option value="Votovorona">Votovorona</option>
                                        </select>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-6 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font text-muted" for="votes">Pièce justificative</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="votes" id="votes" value={electeursInput.votes} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="C.I.N">C.I.N</option>
                                            <option value="Copie">Copie</option>
                                            <option value="Relève de notes">Relève de notes</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font text-muted" for="adhesion">Adhésion</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="adhesion" id="adhesion" value={electeursInput.adhesion} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="1">Oui</option>
                                            <option value="0">Non</option>
                                        </select>
                                    </div>
                                </div>
                                <hr className="mt-4"/>
                                {/* Actions */}
                                <div className="row">
                                    <div className="col-md-4 mt-2 offset-md-4">
                                    <Link to="/admin/liste_des_electeurs_non_adheres" className="btn btn-danger p-3 roboto-font  rounded-0 w-100">Annuler</Link>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <button type="submit" className="btn btn-info p-3 rounded-0 roboto-font text-white w-100">Enregistre</button>
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

export default AjouterElecteurNonAdhere;