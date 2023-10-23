import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
const ShowElecteurs = (props) =>{

    const history = useHistory();

    const [loading, setLoading]  = useState(true);
    const [showmembres, setMembres] = useState([]);

    useEffect(() =>{ 
        const electeur_id = props.match.params.id;
        axios.get(`api/show-electeur/${electeur_id}`).then(res =>{
            if(res.data.status === 200){
                setMembres(res.data.electeur);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/liste_des_electeurs_membres");
            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                history.push("/admin/dashboard");
            }
            setLoading(false);
        });
    },[props.match.params.id]);

    const desapprouveHandle = (e) =>{
        e.preventDefault();

        const electeur_id = props.match.params.id;

        axios.post(`api/desapprouve-membre-electeur/${electeur_id}`).then(res =>{
            if(res.data.status === 200){
                swal("Success", res.data.message, "success");
                history.push('/admin/membres');
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/dashboard");
            }
        });

    }

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
                                    <div className="col-md-4">
                                        <div className="d-flex justify-content-center">
                                            <img style={{borderRadius: '5px'}} src={showmembres.photo == null ? `${process.env.PUBLIC_URL}/images/photo.jpg` : `http://localhost:8000/${showmembres.photo}`} width="250px" height="250px" alt="Image"/>                                          
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
                                                <input className="form-control p-3 rounded-0" value={showmembres.delivrance_cin ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                {/* Date et lieu de naissance et Facebook */}
                                <div className="row">
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Date de naissance</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.ddn ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Lieu de naissance</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.ldn ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Filières</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.filieres ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                {/* Adresse, contact, facebook */}
                                <div className="row">
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Adresse</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.adresse ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Contact</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.concat ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Niveau</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.niveau ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                {/* Axes, sympathisant, date d'inscription */}
                                <div className="row">
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Axes</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.axes ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>sympathisant(e)</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.sympathisant ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Facebook</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.facebook ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                {/* Filières, Niveau */}
                                <div className="row">
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Date d'inscription</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.date_inscription ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Secteurs</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.secteurs ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}}>Votes</label>
                                        <input className="form-control p-3 rounded-0" value={showmembres.cin == 'cin' ? 'C.I.N' : 'Carte A.E.U.T.N.A'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                {/* Filières, Niveau */}
                                <div className="row">
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4 mt-4">
                                      <Link to="/admin/listes-electeurs-membres" className="btn btn-danger p-3 rounded-0 w-100">Retour</Link>
                                    </div>
                                    <div className="col-md-4 mt-4">
                                    <Link type="button" onClick={desapprouveHandle} className="btn btn-warning p-3 rounded-0 w-100">Désapprouver</Link>
                                      </div>
                                </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowElecteurs;