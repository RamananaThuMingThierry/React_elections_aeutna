import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
const ApprouveMembres = (props) =>{

    const history = useHistory();

    const [loading, setLoading]  = useState(true);
    const [showmembres, setMembres] = useState([]);
    const [approuveInput, setApprouveMembres] = useState({
        secteurs:'',
        votes:''
    });

    const handleInput = (e) =>{
        e.persist();
        setApprouveMembres({...approuveInput, [e.target.name]: e.target.value});
    }

    const ValideMembresElecteurs = (e) =>{
        e.preventDefault();

        const id_electeur = props.match.params.id;

        const data = {
            secteurs: approuveInput.secteurs,
            votes: approuveInput.votes
        }

        console.log(data);

        if(data.secteurs == ''){
            swal("Info", "Veuillez séléctionner son secteur !", "info");
        }else if(data.votes == ''){
            swal("Warning", "Veuillez séléctionner son pièce jointe !", "warning");
        }else{
            console.log("Je suis là !");
            axios.post(`api/valide_membres_electeurs/${id_electeur}`, data).then(res =>{
                if(res.data.status  === 200){
                    swal("Success", res.data.message,"success");
                    history.push("/admin/membres");
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message,"warning");
                }
            });
        }
    }

    useEffect(() =>{ 
        const electeur_id = props.match.params.id;
        axios.get(`api/approuve-membres/${electeur_id}`).then(res =>{
            if(res.data.status === 200){
                console.log(res.data.electeur);
                setMembres(res.data.electeur);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/dashboard");
            }
            setLoading(false);
        });
    },[props.match.params.id]);

    if(loading){
        return (
            <h2>Veuillez patientez ...</h2>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h3 className="text-center font-weight-light my-4">Informations</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <div className="d-flex justify-content-center">
                                            <img style={{borderRadius: '5px'}} src={showmembres.photo != null ? `http://localhost:8000/${showmembres.photo}` : `${process.env.PUBLIC_URL}/images/photo.jpg`} height="250px" width="250px" alt="Image"/>                                          
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}}>Numéro Carte</label>
                                                <input className="form-control p-3 rounded-0" disabled value={showmembres.numero_carte ?? '-'} style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}}>Nom</label>
                                                <input className="form-control p-3 rounded-0" value={showmembres.nom ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}}>Prénom</label>
                                                <input className="form-control p-3 rounded-0" value={showmembres.prenom} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}}>Sexe</label>
                                                <input className="form-control p-3 rounded-0" disabled value={showmembres.sexe ?? 'Masculin'} style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}}>C.I.N</label>
                                                <input className="form-control p-3 rounded-0" value={showmembres.cin ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}}>Lieu de délivrance</label>
                                                <input className="form-control p-3 rounded-0" value={showmembres.delivrance_cin ?? '-'} disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <form onSubmit={ValideMembresElecteurs}>
                                    {/* Secteurs et vote */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label style={{fontWeight: 'bold', fontSize: '17px'}}>Secteurs</label>
                                            <select className="form-select rounded-0 p-3" name="secteurs" value={approuveInput.secteurs} onChange={handleInput}>
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
                                        <div className="col-md-6">
                                            <label style={{fontWeight: 'bold', fontSize: '17px'}}>Vote</label>
                                            <select className="form-select rounded-0 p-3" name="votes" value={approuveInput.votes} onChange={handleInput}>
                                                <option value="" selected>Ouvre ce menu de séléction</option>
                                                <option value="cin">C.I.N</option>
                                                <option value="numero_carte">Numéro Carte</option>
                                            </select>
                                        </div>
                                    </div> 
                                    <hr/>
                                    {/* Retour, Valider */}
                                    <div className="row">
                                        <div className="col-md-8 offset-md-2">
                                            <div className="row">
                                                <div className="col-md-6">
                                                <Link to={`/admin/show-electeur/${showmembres.id}`} className="btn btn-danger p-3 rounded-0 w-100">Annuler</Link>
                                                </div>
                                                <div className="col-md-6">
                                                <button type="submit" className="btn btn-info p-3 rounded-0 w-100">Valider</button>
                                                </div>
                                            </div>
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

export default ApprouveMembres;