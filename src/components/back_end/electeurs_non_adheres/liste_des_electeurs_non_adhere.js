import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import swal from "sweetalert";
import Loading from "../constants/Loading";

const ListeDesElecteursNonAdheres = () =>{
    
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState([]);
    
    const [searchInput, setSearch] = useState({
        search:'',
        select:''
    });

    const fetchUserId = async () => {
        try {
            const response = await axios.get('/api/getUser');
            if(response.data.status === 200){
                setUser(response.data.user);
                setLoading(false);
            }else{
                swal("Avertissement", response.data.message, "error");
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
      };

    const handleInput = (e) =>{
        e.persist();
        setSearch({...searchInput, [e.target.name]: e.target.value});
    }

    const [liste_des_electeurs_non_adhere, setliste_des_electeurs_non_adhere] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = liste_des_electeurs_non_adhere.slice(firstIndex, lastIndex);
    const npage = Math.ceil(liste_des_electeurs_non_adhere.length / recordsPerPage);
    const numbers = [...Array(npage +1).keys()].slice(1);
    
    const  handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    useEffect(() =>{

        axios.get(`api/liste_des_electeurs_non_adheres`).then(res =>{
            if(res.status === 200){
                setliste_des_electeurs_non_adhere(res.data.liste_des_electeurs_non_adhere);   
            }
         });
        fetchUserId();
     },[]);

    if(loading){
        return <Loading/>
    }

    const Actualiser = (e) =>{
        e.preventDefault();
        
        searchInput.search = '';
        searchInput.select = '';

        axios.get(`api/liste_des_electeurs_non_adheres`).then(res =>{
            if(res.status === 200){
                setliste_des_electeurs_non_adhere(res.data.liste_des_electeurs_non_adhere);   
            }
         });
    }

    
    const RechereElecteurNonAdhere = (e) =>{
        e.preventDefault();

        const data = {
            search: searchInput.search,
            select: searchInput.select
        }

        if(data.search == ''){
            swal("Warning", "Veuillez entrer la valuer à recherche !", "warning");
        }else if(data.select == ''){
            swal("Warning", "Voulez-vous faire une recherche par quoi ?", "warning");
        }else{
            axios.get(`api/recherche_electeur_non_adhere/${data.select}/${data.search}`).then(res =>{
                console.log(res.data);
                if(res.data.status  === 200){
                    console.log(res.data.recherche_electeur_non_adhere);
                    setliste_des_electeurs_non_adhere(res.data.recherche_electeur_non_adhere);
                }else if(res.data.status === 400){
                    swal("Info", res.data.message,"info");
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message,"warning");
                }
            });
        }
    }

    const supprimerElecteursNonAdhere = (e, id) =>{
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
                axios.post(`api/delete-electeur/${id}`).then(res =>{
                    if(res.data.status === 200){
                        swal("Success", res.data.message, "success");
                        Actualiser(e); 
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
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-2 p-2 rounded-0">
                        <div className="d-flex justify-content-between align-items-center">
                        <h2 className="roboto-font text-muted text-center">
                            Liste des électeurs non adhérés
                        </h2>
                        <div className="d-flex justify-content-between align-items-center">
                            <button onClick={Actualiser} className="btn btn-primary rounded-0 btn-md"><i className="fas fa-refresh"></i></button>
                            <span>&nbsp;</span>
                            <Link to="/admin/ajouter_un_electeur_non_adhere" className="rounded-0 btn btn-success btn-md"><i className="fas fa-user-plus"></i></Link>    
                        </div>
                        </div>
                        </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-1 p-2 rounded-0">
                       <form onSubmit={RechereElecteurNonAdhere}>
                            <div className="input-group">
                                <input type="search" name="search" className="form-control roboto-font rounded-0"  placeholder="Recherche" value={searchInput.search} onChange={handleInput} aria-label="Search" aria-describedby="search-addon" />
                                <select className="form-select roboto-font" name="select" value={searchInput.select} onChange={handleInput} aria-label="Default select example">
                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                    <option value="nom">Nom</option>
                                    <option value="prenom">Prénom</option>
                                </select>
                                <button type="submit" className="btn roboto-font btn-outline-primary rounded-0">Recherche</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="card mt-1 rounded-0">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="roboto-font">Noms</th>
                                    <th className="roboto-font">Prénoms</th>
                                    <th className="roboto-font">C.I.N</th>
                                    <th className="roboto-font">Secteurs</th>
                                    <th className="roboto-font">Pièce</th>
                                    <th className="roboto-font">Heure</th>
                                    <th className="text-center roboto-font">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td className="roboto-font">{item.nom}</td>
                                                <td className="roboto-font">{item.prenom}</td>
                                                <td className="roboto-font">{item.cin ?? '-'}</td>
                                                <td className="roboto-font">{item.secteurs}</td>
                                                <td className="roboto-font">{item.votes}</td>
                                                <td className="roboto-font">{item.heure_vote}</td>
                                                <td className="text-center">
                                                    <div className="btn-group btn-group-md">
                                                        {
                                                            user.roles == 0 
                                                            ?
                                                                <Link to={`afficher_electeur_non_adhere/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                            :
                                                            <>
                                                                <Link to={`afficher_electeur_non_adhere/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                                <Link to={`modifier_un_electeur_non_adhere/${item.id}`} className="btn btn-primary btn-md ml-2"><i className="fa fa-edit"></i></Link>
                                                                <button className="rounded-0 btn btn-danger btn-md d-inline" onClick={(e) => supprimerElecteursNonAdhere(e, item.id)}><i className="fas fa-trash"></i></button>
                                                            </>
                                                        }
                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                            <ReactPaginate 
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            pageCount={numbers.length}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={6}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination mt-4 justify-content-center'}
                            pageClassName={'page-item roboto-font'}
                            pageLinkClassName={'page-link rounded-0'}
                            previousClassName={'page-item roboto-font'}
                            previousLinkClassName={'page-link rounded-0'}
                            nextClassName={'page-item roboto-font'}
                            nextLinkClassName={'page-link rounded-0'}
                            breakClassName={'page-item roboto-font'}
                            breakLinkClassName={'page-link rounded-0'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default ListeDesElecteursNonAdheres;