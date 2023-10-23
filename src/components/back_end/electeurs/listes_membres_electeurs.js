import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

const Liste_des_membres_electeurs = () =>{
    
    const [listesmembresElecteursList, setListesMembresElecteursList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [searchInput, setSearch] = useState({
        search:'',
        select:''
    });

    const handleInput = (e) =>{
        e.persist();
        setSearch({...searchInput, [e.target.name]: e.target.value});
    }

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = listesmembresElecteursList.slice(firstIndex, lastIndex);
    const npage = Math.ceil(listesmembresElecteursList.length / recordsPerPage);
    const numbers = [...Array(npage +1).keys()].slice(1);
    
    const  handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    useEffect(() =>{
    
        axios.get(`api/liste_des_electeurs_membres`).then(res =>{
            if(res.status === 200){
                setListesMembresElecteursList(res.data.liste_des_electeurs_membres);   
            }
             setLoading(false);
         });

     },[]);

    if(loading){
        return <h4>Loading Listes membres AEUTNA...</h4>
    }


    const Refresh = (e) =>{
        e.preventDefault();
        
        searchInput.search = '';
        searchInput.select = '';

        axios.get(`api/liste_des_electeurs_membres`).then(res =>{
            if(res.status === 200){
                setListesMembresElecteursList(res.data.liste_des_electeurs_membres);   
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
            axios.get(`api/recherche_membre_electeurs/${data.select}/${data.search}`).then(res =>{
                console.log(res.data);
                if(res.data.status  === 200){
                    console.log(res.data.recherche_membre_electeurs);
                    setListesMembresElecteursList(res.data.recherche_membre_electeurs);
                }else if(res.data.status === 400){
                    swal("Info", res.data.message,"info");
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message,"warning");
                }
            });
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-2 p-2 rounded-0">
                        <div className="d-flex justify-content-between">
                        <h4>
                            Liste des électeurs membres A.E.U.T.N.A
                        </h4>
                        <div>
                        <button onClick={Refresh} className="btn ml-2 btn-primary rounded-0 btn-md"><i className="fas fa-refresh"></i></button> 
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
                                <input type="search" name="search" className="form-control rounded-0" placeholder="Recherche" value={searchInput.search} onChange={handleInput} aria-label="Search" aria-describedby="search-addon" />
                                <select class="form-select" name="select" value={searchInput.select} onChange={handleInput} aria-label="Default select example">
                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                    <option value="numero_carte">Numéro carte</option>
                                    <option value="nom">Nom</option>
                                    <option value="prenom">Prénom</option>
                                    <option value="cin">C.I.N</option>
                                </select>
                                <button type="submit" className="btn btn-outline-primary rounded-0">Recherce</button>
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
                                    <th>Photos</th>
                                    <th>Numéro carte</th>
                                    <th>Noms</th>
                                    <th>Prénoms</th>
                                    <th>Votes</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td><img src={item.photo == null ? `${process.env.PUBLIC_URL}/images/photo.jpg` : `http://localhost:8000/${item.photo}`} width="35px" height="35px" style={{borderRadius: '50%'}} alt="Image"/></td>
                                                <td>{item.numero_carte ?? '-'}</td>
                                                <td>{item.nom}</td>
                                                <td>{item.prenom}</td>
                                                <td>{item.votes == 'cin' ? 'C.I.N' : 'Carte A.E.U.T.N.A'}</td>
                                                <td className="text-center">
                                                    <Link to={`show-electeur/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                            <ReactPaginate 
                            previousLabel={'Precedent'}
                            nextLabel={'Suivant'}
                            breakLabel={'...'}
                            pageCount={numbers.length}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={6}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination justify-content-center'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Liste_des_membres_electeurs;