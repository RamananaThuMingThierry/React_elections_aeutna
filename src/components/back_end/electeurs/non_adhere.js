import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import swal from "sweetalert";

const Non_adhere = () =>{
    
    const [loading, setLoading] = useState(true);
    
    const [searchInput, setSearch] = useState({
        search:'',
        select:''
    });

    const handleInput = (e) =>{
        e.persist();
        setSearch({...searchInput, [e.target.name]: e.target.value});
    }

    const [NonAdhereElecteurList, setNonAdhereElecteurList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = NonAdhereElecteurList.slice(firstIndex, lastIndex);
    const npage = Math.ceil(NonAdhereElecteurList.length / recordsPerPage);
    const numbers = [...Array(npage +1).keys()].slice(1);
    
    const  handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    useEffect(() =>{

        axios.get(`api/non_adhere`).then(res =>{
            if(res.status === 200){
                setNonAdhereElecteurList(res.data.electeurs_non_adhere);   
            }
             setLoading(false);
         });
     },[]);

    if(loading){
        return (
            <div className="container-fluid bg-white mt-2 d-flex justify-content-center align-items-center" style={{height: '85vh'}}>
                <div className="text-center">
                    <h1 className="roboto-font">Chargment...</h1>
                    <h2 className="text-muted roboto-font">Liste des Électeurs non adhérés</h2>        
                </div>    
            </div>
        );
    }


    const Refresh = (e) =>{
        e.preventDefault();
        
        searchInput.search = '';
        searchInput.select = '';

        axios.get(`api/non_adhere`).then(res =>{
            if(res.status === 200){
                setNonAdhereElecteurList(res.data.electeurs_non_adhere);   
            }
         });
    }

    
    const RechercheSubmit = (e) =>{
        e.preventDefault();

        const data = {
            search: searchInput.search,
            select: searchInput.select
        }

        if(data.search == ''){
            swal("Warning", "Veuillez entrer la valuer à recherche !", "warning");
        }else if(data.select == ''){
            swal("Warning", "Voulez-vous séléctionner par quoi ?", "warning");
        }else{
            axios.get(`api/recherche_electeurs_non_adhere/${data.select}/${data.search}`).then(res =>{
                console.log(res.data);
                if(res.data.status  === 200){
                    console.log(res.data.recherche_electeur_non_adhere);
                    setNonAdhereElecteurList(res.data.recherche_electeur_non_adhere);
                }else if(res.data.status === 400){
                    swal("Info", res.data.message,"info");
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message,"warning");
                }
            });
        }
    }

    const deleteElecteursNonAdhere = (e, id) =>{
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
                        Refresh(e); 
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
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-2 p-2 rounded-0">
                        <div className="d-flex justify-content-between">
                        <h2 className="roboto-font text-muted">
                            Liste des électeurs non adhérés
                        </h2>
                        <div className="group-btn mt-1">
                            <button onClick={Refresh} className="btn ml-2 btn-primary rounded-0 btn-md"><i className="fas fa-refresh"></i></button>
                            <Link to="/admin/add-nouveau-bachelier" className="rounded-0 btn btn-success btn-md"><i className="fas fa-user-plus"></i></Link>    
                        </div>
                        </div>
                        </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-1 p-2 rounded-0">
                       <form onSubmit={RechercheSubmit}>
                            <div className="input-group">
                                <input type="search" name="search" className="form-control roboto-font rounded-0"  placeholder="Recherche" value={searchInput.search} onChange={handleInput} aria-label="Search" aria-describedby="search-addon" />
                                <select className="form-select roboto-font" name="select" value={searchInput.select} onChange={handleInput} aria-label="Default select example">
                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                    <option value="nom">Nom</option>
                                    <option value="prenom">Prénom</option>
                                    <option value="cin">C.I.N</option>
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
                                    <th className="roboto-font">Secteurs</th>
                                    <th className="roboto-font">Votes</th>
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
                                                <td className="roboto-font">{item.secteurs}</td>
                                                <td className="roboto-font">{item.votes}</td>
                                                <td className="text-center">
                                                    <div className="btn-group btn-group-md">
                                                    <Link to={`show-electeur-non-adhere/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                    <Link to={`edit-electeur-non-adhere/${item.id}`} className="btn btn-primary btn-md ml-2"><i className="fa fa-edit"></i></Link>
                                                    <button className="rounded-0 btn btn-danger btn-md d-inline" onClick={(e) => deleteElecteursNonAdhere(e, item.id)}><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                            <ReactPaginate 
                            previousLabel={'Précédent'}
                            nextLabel={'Suivant'}
                            breakLabel={'...'}
                            pageCount={numbers.length}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={6}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination justify-content-center'}
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
        </div>
    );
}
export default Non_adhere;