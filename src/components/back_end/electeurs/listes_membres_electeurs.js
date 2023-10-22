import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

const Liste_des_membres_electeurs = () =>{
    
    const [loading, setLoading] = useState(true);
    const [listesmembresElecteursList, setListesMembresElecteursList] = useState([]);

    useEffect(() =>{

        axios.get(`api/liste_des_electeurs_membres`).then(res =>{
            if(res.status === 200){
                setListesMembresElecteursList(res.data.liste_des_electeurs_membres);   
            }
             setLoading(false);
         });

     },[]);

    if(loading){
        return <h4>Loading Listes électeurs membres AEUTNA...</h4>
    }

    const deleteElecteursMembres = (e, id) =>{
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Suppression";

        swal({
            title: "Vous êtes sûr?",
            text: "Voulez-vous vraiment supprimer cet électeur?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`api/delete-electeur/${id}`).then(res =>{
                    if(res.data.status === 200){
                        swal("Success", res.data.message, "success");
                        thisClicked.closest("tr").remove();
                    }else if(res.data.status === 404){
                        swal("Error", res.data.message, "error");
                        thisClicked.innerHTML = "<i class=\"fas fa-trash\"></i>";
                    }
                });
            } else {
              swal("La suppression a été annulé!");
              thisClicked.innerHTML = "<i class=\"fas fa-trash\"></i>";
            }
          });

       
    }

    return (
        <div className="container-fluid">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Liste des membres AEUTNA
                        <Link to="/admin/add-electeur-membre" className="btn btn-success float-end btn-sm"><i className="fas fa-plus"></i></Link>    
                 </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Photos</th>
                                    <th>Numéro carte</th>
                                    <th>Noms</th>
                                    <th>Prénoms</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listesmembresElecteursList.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td><img src={item.photo == null ? `${process.env.PUBLIC_URL}/images/photo.jpg` : `http://localhost:8000/${item.photo}`} width="50px" alt="Image"/></td>
                                                <td>{item.numero_carte}</td>
                                                <td>{item.nom}</td>
                                                <td>{item.prenom}</td>
                                                <td className="text-center">
                                                    <Link to={`show-electeur/${item.id}`} className="btn btn-warning btn-sm mr-2"><i className="fas fa-eye"></i></Link>
                                                    <Link to={`edit-electeur/${item.id}`} className="btn btn-primary btn-sm mr-2"><i className="fa fa-edit"></i></Link>
                                                    <button className="btn btn-danger btn-sm d-inline" onClick={(e) => deleteElecteursMembres(e, item.id)}><i className="fas fa-trash"></i></button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Liste_des_membres_electeurs;