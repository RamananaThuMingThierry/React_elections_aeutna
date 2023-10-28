import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";

const ModifierUnElecteurMembre = (props) =>{

    const history = useHistory();
    
    const [picture, setPicture] = useState({
        photo:''
    });

    const [electeur_membre_input, setElecteurs]= useState([]);
    
    const [loading, setLoading]= useState([]);
    
    const [image, setImages] = useState(null);

    useEffect(() =>{
        const id_electeur_membre = props.match.params.id;
        axios.get(`api/obtenir_un_electeur/${id_electeur_membre}`).then(res =>{
            console.log(res.data.membre);
            if(res.data.status === 200){
                setElecteurs(res.data.electeur_membre);
            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                history.push('/admin/membres');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) =>{
        e.persist();

        setElecteurs({...electeur_membre_input, [e.target.name]: e.target.value});
    }

    const handleImage = e =>{
        e.persist();
        const photo = e.target.files[0];
        setImages(e.target.files[0]);
        setPicture(URL.createObjectURL(photo));
    }

    const ModifierUnElecteurMembre = (e) =>{

        e.preventDefault();

        const id_electeur_membre = props.match.params.id;
        
        const formData = new FormData();

        electeur_membre_input.numero_carte = electeur_membre_input.numero_carte ?? '';
        electeur_membre_input.nom = electeur_membre_input.nom ?? '';
        electeur_membre_input.sexe = electeur_membre_input.sexe ?? '';
        electeur_membre_input.cin = electeur_membre_input.cin ?? '';
        electeur_membre_input.axes = electeur_membre_input.axes ?? '';
        electeur_membre_input.sympathisant = electeur_membre_input.sympathisant ?? '';
        electeur_membre_input.date_inscription = electeur_membre_input.date_inscription ?? '';

        if(electeur_membre_input.numero_carte == ''){
            swal("Warning", "Veuillez saisir le numér de ta carte A.E.U.T.N.A !", "warning");
        }else if(electeur_membre_input.nom == ''){
            swal("Warning", "Veuillez saisir votre nom !", "warning");
        }else if(electeur_membre_input.sexe == ''){
            swal("Warning", "Veuillez séléctionner votre sexe !", "warning");
        }else if(electeur_membre_input.cin != '' && electeur_membre_input.cin.length != 12){
            swal("Warning", "Votre numéro de C.I.N invalide !", "warning");
        }else if(electeur_membre_input.axes == '' && (electeur_membre_input.sympathisant == 'Non' || electeur_membre_input.sympathisant == '')){
                swal("Warning", "Veuillez séléctionner votre axes !", "warning");
        }else if(electeur_membre_input.date_inscription == ''){
            swal("Warning", "Veuillez votre date d'inscription !", "warning");
        }else if(electeur_membre_input.axes != '' && electeur_membre_input.sympathisant == 'Oui'){
                swal("Warning", "Vous n'êtes pas sympathisant !", "warning");
        }else{
            formData.append('photo', image);
            formData.append('numero_carte', electeur_membre_input.numero_carte);
            formData.append('nom', electeur_membre_input.nom);
            formData.append('prenom', electeur_membre_input.prenom);
            formData.append('sexe', electeur_membre_input.sexe);
            formData.append('cin', electeur_membre_input.cin);
            formData.append('axes', electeur_membre_input.axes);
            formData.append('sympathisant', electeur_membre_input.sympathisant ?? 'Non');
            formData.append('date_inscription', electeur_membre_input.date_inscription);
    
            console.log(formData);

            axios.post(`api/modifier_un_electeur_membre/${id_electeur_membre}`, formData).then(res =>{
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';   
                console.log(res.data);
                if(res.data.status === 200){
                    swal("Success", res.data.message, "success");
                    history.push('/admin/liste_des_electeurs_membres');
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message, "warning");
                }else if(res.data.status === 422){
                    swal("Warning", res.data.message, "warning");
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
                        <h3 className="text-center text-muted my-3">Modifier un électeur membre</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <form  onSubmit={ModifierUnElecteurMembre} encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            {
                                                picture.photo == '' ?
                                                    <img className="mb-1 rounded-1" src={electeur_membre_input.photo != null ? `${BASE_URL}/${electeur_membre_input.photo}` :  `${process.env.PUBLIC_URL}/images/photo.jpg`} height="189px" width="189px" alt="Image"/>                                          
                                                :
                                            <img className="mb-1 rounded-1" src={picture.picture != picture ? picture :  `${process.env.PUBLIC_URL}/images/photo.jpg`} height="189px" width="189px" alt="Image"/>                                          
                                                }
                                            <input type="file" name="photo" onChange={handleImage} className="form-control mt-2 rounded-0 p-3"/>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label for="numero_carte" style={{fontWeight: 'bold', fontSize: '17px'}}>Numéro Carte A.E.U.T.N.A</label>
                                                <input className="form-control p-3 rounded-0" type="number" min={1} max={1500} id="numero_carte" autoComplete="false" name="numero_carte" onChange={handleInput} value={electeur_membre_input.numero_carte ?? ''} placeholder="Saisir votre numéro de carte AEUTNA"/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="sexe">Sexe</label>
                                                <select className="form-select rounded-0 p-3" name="sexe" id="sexe" value={electeur_membre_input.sexe} onChange={handleInput}>
                                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                                    <option value="masculin">Masculin</option>
                                                    <option value="feminin">Féminin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="nom">Nom</label>
                                                <input className="form-control p-3 rounded-0" type="text" autoComplete="false" id="nom" name="nom" value={electeur_membre_input.nom ?? ''} placeholder="Saisir votre nom" onChange={handleInput}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="prenom">Prénom</label>
                                                <input className="form-control p-3 rounded-0" type="text" value={electeur_membre_input.prenom ?? ''} id="prenom" name="prenom" autoComplete="false" placeholder="Saisir votre prénom" onChange={handleInput}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="cin">C.I.N</label>
                                                <input maxLength={12} minLength={12} className="form-control p-3 rounded-0" id="cin" type="number" onChange={handleInput} value={electeur_membre_input.cin ?? ''} autoComplete="false" placeholder="Saisir votre Numéro de C.I.N" name="cin"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Axes, sympathisant, date d'inscription */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="axes">Axes</label>
                                        <select className="form-select rounded-0 p-3" name="axes" id="axes" value={electeur_membre_input.axes} onChange={handleInput}>
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
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="sympathisant">sympathisant(e)</label>
                                        <select className="form-select rounded-0 p-3" name="sympathisant" id="sympathisant" value={electeur_membre_input.sympathisant} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="Non">Non</option>
                                            <option value="Oui">Oui</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="date_inscription">Date d'inscription</label>
                                        <input className="form-control p-3 rounded-0" value={electeur_membre_input.date_inscription ?? ''} id="date_inscription" name="date_inscription" type="date" onChange={handleInput} autoComplete="false"/>
                                    </div>
                                </div> 
                                <hr className="mt-4"/>
                                <div className="row">
                                    <div className="col-md-4 offset-md-4 mt-2">
                                    <Link to="/admin/liste_des_electeurs_membres" className="btn btn-danger p-3 rounded-0 w-100">Annuler</Link>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <button type="submit" className="btn btn-info p-3 rounded-0 w-100 text-white">Valider</button>
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

export default ModifierUnElecteurMembre;