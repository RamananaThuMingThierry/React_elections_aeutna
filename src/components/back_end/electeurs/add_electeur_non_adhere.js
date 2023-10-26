import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

const AddElecteurNonAdhere = () =>{

    const history = useHistory();

    const [electeursInput, setElecteurs] = useState({
        nom:'',
        prenom:'',
        ddn:'',
        ldn:'',
        sexe:'',
        cin:'',
        delivrance:'',
        adresse:'',
        contact:'',
        axes:'',
        facebook:'',
        secteurs:'',
    });

    const handleInput = (e) =>{
        e.persist();

        setElecteurs({...electeursInput, [e.target.name]: e.target.value});
    }
    
    const SubmitAddElecteurNonAdhere = (e) =>{
        e.preventDefault();

        const formData = new FormData();

        if(electeursInput.nom == ''){
            swal("Warning", "Veuillez saisir votre nom !", "warning");
        }else if(electeursInput.sexe == ''){
            swal("Warning", "Veuillez séléctionner votre sexe !", "warning");
        }else if(electeursInput.cin != '' && electeursInput.cin.length != 12){
            swal("Warning", "Votre numéro de C.I.N invalide !", "warning");
        }else if(electeursInput.cin != '' && electeursInput.delivrance == ''){
            swal("Warning", "Veuillez saisir la date de délivrance de votre C.I.N !", "warning");
        }else if(electeursInput.ddn == ''){
            swal("Warning", "Veuillez saisir votre date de naissance !", "warning");
        }else if(electeursInput.ldn == ''){
            swal("Warning", "Veuillez saisir votre lieu de naissan !", "warning");
        }else if(electeursInput.adresse == ''){
            swal("Warning", "Veuillez saisir votre adresse !", "warning");
        }else if(electeursInput.contact == ''){
            swal("Warning", "Veuillez saisir votre contact !", "warning");
        }else if(electeursInput.axes == ''){
                swal("Warning", "Veuillez séléctionner votre axes !", "warning");
        }else if(electeursInput.secteurs == ''){
            swal("Warning", "Veuillez séléctionner votre secteurs !", "warning");
        }else{
            formData.append('nom', electeursInput.nom);
            formData.append('prenom', electeursInput.prenom);
            formData.append('ddn', electeursInput.ddn);
            formData.append('ldn', electeursInput.ldn);
            formData.append('sexe', electeursInput.sexe);
            formData.append('cin', electeursInput.cin);
            formData.append('delivrance', electeursInput.delivrance);
            formData.append('adresse', electeursInput.adresse);
            formData.append('contact', electeursInput.contact);
            formData.append('secteurs', electeursInput.secteurs);
            formData.append('axes', electeursInput.axes);
            formData.append('facebook', electeursInput.facebook);
            
            console.log(formData);
    
            axios.post(`api/store-electeur-non-adhere`, formData).then(res =>{
                if(res.data.status === 200){
                    swal("Success", res.data.message, "success");
                    history.push('/admin/liste-non-adhere');
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message, "warning");
                }else if(res.data.status === 422){
                    history.push('/admin/liste-non-adhere');
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
                <div className="col-md-12">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h3 className="text-center text-muted roboto-font my-3">Ajouter un nouveau bachelier</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <form  onSubmit={SubmitAddElecteurNonAdhere}>
                                {/* Nom, Prénom, Sexe */}
                                <div className="row">
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="nom">Nom</label>
                                        <input className="form-control p-3 roboto-font rounded-0" type="text" autoComplete="false" id="nom" name="nom" value={electeursInput.nom ?? ''} placeholder="Saisir votre nom" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="prenom">Prénom</label>
                                        <input className="form-control p-3 roboto-font rounded-0" type="text" value={electeursInput.prenom ?? ''} id="prenom" name="prenom" autoComplete="false" placeholder="Saisir votre prénom" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="sexe">Sexe</label>
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
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="cin">C.I.N</label>
                                        <input maxLength={12} minLength={12} className="form-control roboto-font p-3 rounded-0" id="cin" type="number" onChange={handleInput} value={electeursInput.cin ?? ''} autoComplete="false" placeholder="Saisir votre Numéro de C.I.N" name="cin"/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="delivrance">Lieu de délivrance</label>
                                        <input className="form-control roboto-font p-3 rounded-0" type="text" value={electeursInput.delivrance ?? ''} id="delivrance" name="delivrance" autoComplete="false" onChange={handleInput} placeholder="Saisir le lieu de délivrance de votre C.I.N"/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="axes">Axes</label>
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
                                </div>
                                {/* Adresse, contact */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="adresse">Adresse</label>
                                        <input className="form-control p-3 roboto-font rounded-0" value={electeursInput.adresse ?? ''} type="text" id="adresse" name="adresse" autoComplete="false" onChange={handleInput} placeholder="Saisir votre adresse"/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="contact">Contact</label>
                                        <input className="form-control p-3 roboto-font rounded-0" value={electeursInput.contact ?? ''} type="number" maxLength={10} id="contact" name="contact" autoComplete="false" onChange={handleInput} placeholder="Saisir votre contact"/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="facebook">Facebook</label>
                                        <input className="form-control p-3 roboto-font rounded-0" value={electeursInput.facebook ?? ''} id="facebook" name="facebook" onChange={handleInput} type="text" placeholder="Saisir votre nom sur facebook" autoComplete="false"/>
                                    </div>
                                </div> 
                                {/* Date et lieu de naissance et Filières */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="ddn">Date de naissance</label>
                                        <input className="form-control roboto-font p-3 rounded-0" type="date" value={electeursInput.ddn ?? ''} id="ddn" name="ddn" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="ldn">Lieu de naissance</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={electeursInput.ldn ?? ''} id="ldn" name="ldn" placeholder="Saisir votre lieu de naissance" type="text" autoComplete="false" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="secteurs">Secteurs</label>
                                        <select className="form-select roboto-font rounded-0 p-3" name="secteurs" id="secteurs" value={electeursInput.secteurs} onChange={handleInput}>
                                            <option value="" selected>Secteurs</option>
                                            <option value="67 h">67 h</option>
                                            <option value="Ambohipo">Ambohipo</option>
                                            <option value="Ambolikandrina">Ambolikandrina</option>
                                            <option value="Ankatso 1">Ankatso 1</option>
                                            <option value="Ankatso 2">Ankatso 2 </option>
                                            <option value="Itaosy">Itaosy</option>
                                            <option value="Ivato">Ivato</option>
                                            <option value="Votovorona">Votovorona</option>
                                        </select>
                                    </div>
                                </div> 
                                {/* Actions */}
                                <div className="row">
                                    <div className="col-md-4 mt-4 offset-md-4">
                                    <Link to="/admin/liste-non-adhere" className="btn btn-danger p-3 roboto-font  rounded-0 w-100">Annuler</Link>
                                    </div>
                                    <div className="col-md-4 mt-4">
                                        <button type="submit" className="btn btn-info p-3 rounded-0 roboto-font w-100">Enregistre</button>
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

export default AddElecteurNonAdhere;