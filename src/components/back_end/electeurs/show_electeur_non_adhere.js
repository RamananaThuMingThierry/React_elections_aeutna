import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
const ShowElecteurNonAdhere = (props) =>{

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
                history.push("/admin/dashboard");
            }
            setLoading(false);
        });
    },[props.match.params.id]);

    if(loading){
        return (
            <div className="container-fluid bg-white mt-2 d-flex justify-content-center align-items-center" style={{height: '85vh'}}>
                <div className="text-center">
                    <h2 className="text-muted roboto-font">Veuillez patienter s'il vous plait...!</h2>        
                </div>    
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h3 className="text-center text-muted my-3 roboto-font">Informations</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Nom</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={showmembres.nom ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Prénom</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={showmembres.prenom} disabled style={{backgroundColor:'white'}}/>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Sexe</label>
                                    <input className="form-control roboto-font p-3 rounded-0" disabled value={showmembres.sexe ?? 'Masculin'} style={{backgroundColor:'white'}}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">C.I.N</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={showmembres.cin ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Lieu de délivrance</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={showmembres.delivrance_cin ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Axes</label>
                                    <input className="form-control roboto-font p-3 rounded-0" value={showmembres.axes ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                </div>
                            </div>
                                {/* Date et lieu de naissance et Facebook */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Date de naissance</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.ddn ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Lieu de naissance</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.ldn ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Facebook</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.facebook ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                {/* Adresse, contact, facebook */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Adresse</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.adresse ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Contact</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.contact ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Secteurs</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.secteurs ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                {/* Axes, sympathisant, date d'inscription */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Votes</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.votes ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Date d'inscription</label>
                                        <input className="form-control roboto-font p-3 rounded-0" value={showmembres.date_inscription ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:'33px'}}>
                                      <Link to="/admin/liste-non-adhere" className="btn btn-primary roboto-font p-3 rounded-0 w-100">Retour</Link>
                                    </div>
                                </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowElecteurNonAdhere;