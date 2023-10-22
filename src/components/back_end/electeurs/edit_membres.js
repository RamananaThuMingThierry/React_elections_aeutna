import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

const EditMembres = (props) =>{

    const history = useHistory();
    
    const [picture, setPicture] = useState({
        photo:''
    });

    const [electeursInput, setElecteurs]= useState([]);
    
    const [loading, setLoading]= useState([]);
    
    const [image, setImages] = useState(null);

    useEffect(() =>{
        const id_membre = props.match.params.id;
        axios.get(`api/edit-electeur/${id_membre}`).then(res =>{
            if(res.data.status === 200){
                setElecteurs(res.data.membre);
            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                history.push('/admin/membres');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) =>{
        e.persist();

        setElecteurs({...electeursInput, [e.target.name]: e.target.value});
    }

    const handleImage = e =>{
        e.persist();
        const photo = e.target.files[0];
        setImages(e.target.files[0]);
        setPicture(URL.createObjectURL(photo));
    }

    const SubmitUpdateElecteurs = (e) =>{

        e.preventDefault();

        const id_membre = props.match.params.id;
        const formData = new FormData();

        electeursInput.numero_carte = electeursInput.numero_carte ?? '';

        if(electeursInput.numero_carte == ''){
            swal("Warning", "Veuillez saisir le numér de ta carte A.E.U.T.N.A !", "warning");
        }else if(electeursInput.nom == ''){
            swal("Warning", "Veuillez saisir votre nom !", "warning");
        }else if(electeursInput.sexe == ''){
            swal("Warning", "Veuillez séléctionner votre sexe !", "warning");
        }else if(electeursInput.cin != '' && electeursInput.cin.length != 12){
            swal("Warning", "Votre numéro de C.I.N invalide !", "warning");
        }
        else if(electeursInput.cin != '' && electeursInput.delivrance == ''){
            swal("Warning", "Veuillez indiquer le lieu de délivrance de votre C.I.N !", "warning");
        }else if(electeursInput.cin == '' && electeursInput.delivrance != ''){
            swal("Warning", "Veuillez saisir votre numéro de C.I.N !", "warning");
        }
        else if(electeursInput.ddn == ''){
            swal("Warning", "Veuillez saisir votre date de naissance !", "warning");
        }else if(electeursInput.ldn == ''){
            swal("Warning", "Veuillez saisir votre lieu de naissan !", "warning");
        }else if(electeursInput.adresse == ''){
            swal("Warning", "Veuillez saisir votre adresse !", "warning");
        }else if(electeursInput.contact == ''){
            swal("Warning", "Veuillez saisir votre contact !", "warning");
        }else if(electeursInput.axes == '' && (electeursInput.sympathisant == 'Non' || electeursInput.sympathisant == '')){
                swal("Warning", "Veuillez séléctionner votre axes !", "warning");
        }else if(electeursInput.date_inscription == ''){
            swal("Warning", "Veuillez votre date d'inscription !", "warning");
        }else if(electeursInput.filieres != '' && electeursInput.niveau == ''){
            swal("Warning", "Veuillez saisir votre niveau !", "warning");
        }else if(electeursInput.niveau != '' && electeursInput.filieres == ''){
            swal("Warning", "Veuillez saisir votre filière !", "warning");
        }
        else if(electeursInput.axes != '' && electeursInput.sympathisant == 'Oui'){
                swal("Warning", "Vous n'êtes pas sympathisnat !", "warning");
        }else{
            formData.append('photo', image);
            formData.append('numero_carte', electeursInput.numero_carte);
            formData.append('nom', electeursInput.nom);
            formData.append('prenom', electeursInput.prenom);
            formData.append('ddn', electeursInput.ddn);
            formData.append('ldn', electeursInput.ldn);
            formData.append('sexe', electeursInput.sexe);
            formData.append('cin', electeursInput.cin);
            formData.append('delivrance', electeursInput.delivrance);
            formData.append('filieres', electeursInput.filieres);
            formData.append('niveau', electeursInput.niveau);
            formData.append('adresse', electeursInput.adresse);
            formData.append('contact', electeursInput.contact);
            formData.append('axes', electeursInput.axes);
            formData.append('sympathisant', electeursInput.sympathisant ?? 'Non');
            formData.append('facebook', electeursInput.facebook);
            formData.append('date_inscription', electeursInput.date_inscription);
            
            console.log(formData);
    
            axios.put(`api/update-electeur/${id_membre}`, formData).then(res =>{
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';   
                if(res.data.status === 200){
                    swal("Success", res.data.message, "success");
                    history.push('/admin/membres');
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message, "warning");
                }else if(res.data.status === 422){
                    swal("Warning", res.data.message, "warning");
                }
            });
        }
    }

    if(loading){
        return (
            <h1>Update Product ...</h1>
        );
    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-12">
                <div className="card elevation-1 border-0 rounded-0 mt-2">
                    <h3 className="text-center font-weight-light my-4">Ajouter un nouveau membres AEUTNA</h3>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="card elevation-1 border-0 rounded-0 mt-1">
                    <div className="card-body">
                        <form  onSubmit={SubmitUpdateElecteurs} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        {
                                            picture.photo == '' ?
                                                <img className="mb-1 rounded-1" src={electeursInput.photo != null ? `http://localhost:8000/${electeursInput.photo}` :  `${process.env.PUBLIC_URL}/images/photo.jpg`} height="189px" width="189px" alt="Image"/>                                          
                                            :
                                        <img className="mb-1 rounded-1" src={picture.picture != picture ? picture :  `${process.env.PUBLIC_URL}/images/photo.jpg`} height="189px" width="189px" alt="Image"/>                                          
                                            }
                                        <input type="file" name="photo" onChange={handleImage} className="form-control rounded-0 p-3"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label for="numero_carte" style={{fontWeight: 'bold', fontSize: '17px'}}>Numéro Carte A.E.U.T.N.A</label>
                                            <input className="form-control p-3 rounded-0" type="number" min={1} max={1500} id="numero_carte" autoComplete="false" name="numero_carte" onChange={handleInput} value={electeursInput.numero_carte ?? ''} placeholder="Saisir votre numéro de carte AEUTNA"/>
                                        </div>
                                        <div className="col-md-12">
                                            <label style={{fontWeight: 'bold', fontSize: '17px'}} for="nom">Nom</label>
                                            <input className="form-control p-3 rounded-0" type="text" autoComplete="false" id="nom" name="nom" value={electeursInput.nom ?? ''} placeholder="Saisir votre nom" onChange={handleInput}/>
                                        </div>
                                        <div className="col-md-12">
                                            <label style={{fontWeight: 'bold', fontSize: '17px'}} for="prenom">Prénom</label>
                                            <input className="form-control p-3 rounded-0" type="text" value={electeursInput.prenom ?? ''} id="prenom" name="prenom" autoComplete="false" placeholder="Saisir votre prénom" onChange={handleInput}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label style={{fontWeight: 'bold', fontSize: '17px'}} for="sexe">Sexe</label>
                                            <select className="form-select rounded-0 p-3" name="sexe" id="sexe" value={electeursInput.sexe} onChange={handleInput}>
                                                <option value="" selected>Ouvre ce menu de séléction</option>
                                                <option value="masculin">Masculin</option>
                                                <option value="feminin">Féminin</option>
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            <label style={{fontWeight: 'bold', fontSize: '17px'}} for="cin">C.I.N</label>
                                            <input maxLength={12} minLength={12} className="form-control p-3 rounded-0" id="cin" type="number" onChange={handleInput} value={electeursInput.cin ?? ''} autoComplete="false" placeholder="Saisir votre Numéro de C.I.N" name="cin"/>
                                        </div>
                                        <div className="col-md-12">
                                            <label style={{fontWeight: 'bold', fontSize: '17px'}} for="delivrance">Lieu de délivrance</label>
                                            <input className="form-control p-3 rounded-0" type="text" value={electeursInput.delivrance ?? ''} id="delivrance" name="delivrance" autoComplete="false" onChange={handleInput} placeholder="Saisir le lieu de délivrance de votre C.I.N"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/* Date et lieu de naissance et Filières */}
                            <div className="row">
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="ddn">Date de naissance</label>
                                    <input className="form-control p-3 rounded-0" type="date" value={electeursInput.ddn ?? ''} id="ddn" name="ddn" onChange={handleInput}/>
                                </div>
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="ldn">Lieu de naissance</label>
                                    <input className="form-control p-3 rounded-0" value={electeursInput.ldn ?? ''} id="ldn" name="ldn" placeholder="Saisir votre lieu de naissance" type="text" autoComplete="false" onChange={handleInput}/>
                                </div>
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="filieres">Filières</label>
                                    <input className="form-control p-3 rounded-0" value={electeursInput.filieres ?? ''} id="filieres" name="filieres" type="text" placeholder="Saisir votre filière" autoComplete="false" onChange={handleInput}/>
                                </div>
                            </div> 
                            {/* Adresse, contact, facebook */}
                            <div className="row">
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="adresse">Adresse</label>
                                    <input className="form-control p-3 rounded-0" value={electeursInput.adresse ?? ''} type="text" id="adresse" name="adresse" autoComplete="false" onChange={handleInput} placeholder="Saisir votre adresse"/>
                                </div>
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="contact">Contact</label>
                                    <input className="form-control p-3 rounded-0" value={electeursInput.contact ?? ''} type="number" maxLength={10} id="contact" name="contact" autoComplete="false" onChange={handleInput} placeholder="Saisir votre contact"/>
                                </div>
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="niveau">Niveau</label>
                                    <input className="form-control p-3 rounded-0" value={electeursInput.niveau ?? ''} type="text" id="niveau" name="niveau" autoComplete="false" onChange={handleInput} placeholder="Saisir votre niveau"/>
                                </div>
                            </div> 
                            {/* Axes, sympathisant, date d'inscription */}
                            <div className="row">
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="axes">Axes</label>
                                    <select className="form-select rounded-0 p-3" name="axes" id="axes" value={electeursInput.axes} onChange={handleInput}>
                                        <option value="" selected>Ouvre ce menu de séléction</option>
                                        <option value="Andempona">Andempona</option>
                                        <option value="Andrarony">Andrarony</option>
                                        <option value="Ankavanana">Ankavanana</option>
                                        <option value="Ankavia">Ankavia</option>
                                        <option value="Antalaha ville">Antalaha Ville</option>
                                        <option value="Cap-Est">Cap-Est</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="sympathisant">sympathisant(e)</label>
                                    <select className="form-select rounded-0 p-3" name="sympathisant" id="sympathisant" value={electeursInput.sympathisant} onChange={handleInput}>
                                        <option value="" selected>Ouvre ce menu de séléction</option>
                                        <option value="Non">Non</option>
                                        <option value="Oui">Oui</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="facebook">Facebook</label>
                                    <input className="form-control p-3 rounded-0" value={electeursInput.facebook ?? ''} id="facebook" name="facebook" onChange={handleInput} type="text" placeholder="Saisir votre nom sur facebook" autoComplete="false"/>
                                </div>
                            </div> 
                            {/* Date d'inscription, Actions */}
                            <div className="row">
                                <div className="col-md-4">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="date_inscription">Date d'inscription</label>
                                    <input className="form-control p-3 rounded-0" value={electeursInput.date_inscription ?? ''} id="date_inscription" name="date_inscription" type="date" onChange={handleInput} autoComplete="false"/>
                                </div>
                                <div className="col-md-4 mt-4">
                                  <Link to="/admin/membres" className="btn btn-danger p-3 rounded-0 w-100">Annuler</Link>
                                </div>
                                <div className="col-md-4 mt-4">
                                    <button type="submit" className="btn btn-info p-3 rounded-0 w-100">Modifier</button>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default EditMembres;