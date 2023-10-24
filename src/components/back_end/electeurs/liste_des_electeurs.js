import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";

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
    
        axios.get(`api/liste_des_electeurs`).then(res =>{
            if(res.status === 200){
                setListesMembresElecteursList(res.data.electeurs);   
            }
             setLoading(false);
         });

     },[]);

    if(loading){
        return (
            <div className="container-fluid bg-white mt-2 d-flex justify-content-center align-items-center" style={{height: '85vh'}}>
                <div className="text-center">
                    <h1 className="roboto-font">Chargment...</h1>
                    <h2 className="text-muted roboto-font">Liste des électeurs A.E.U.T.N.A</h2>        
                </div>    
            </div>
        );
    }


    const Refresh = (e) =>{
        e.preventDefault();
        
        searchInput.search = '';
        searchInput.select = '';

        axios.get(`api/liste_des_electeurs`).then(res =>{
            if(res.status === 200){
                setListesMembresElecteursList(res.data.electeurs);   
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
            swal("Warning", "Voulez-vous faire une recherche par quoi ?", "warning");
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
                        <div className="d-flex text-muted roboto-font justify-content-between">
                        <h2>
                            Liste des électeurs
                        </h2>
                        <div>
                        <button onClick={Refresh} className="btn mt-1 btn-primary rounded-0 btn-md"><i className="fas fa-refresh"></i></button> 
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
                                <input type="search" name="search" className="form-control roboto-font rounded-0" placeholder="Recherche" value={searchInput.search} onChange={handleInput} aria-label="Search" aria-describedby="search-addon" />
                                <select class="form-select roboto-font" name="select" value={searchInput.select} onChange={handleInput} aria-label="Default select example">
                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                    <option value="numero_carte">Numéro carte</option>
                                    <option value="nom">Nom</option>
                                    <option value="prenom">Prénom</option>
                                    <option value="cin">C.I.N</option>
                                </select>
                                <button type="submit" className="btn btn-outline-primary roboto-font rounded-0">Recherche</button>
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
                                    <th className="roboto-font">Photos</th>
                                    <th className="roboto-font">Numéro carte</th>
                                    <th className="roboto-font">Noms et Prénoms</th>
                                    <th className="roboto-font">Votes</th>
                                    <th className="roboto-font">Secteurs</th>
                                    <th className="roboto-font text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td><img src={item.photo == null ? `${process.env.PUBLIC_URL}/images/photo.jpg` : `${BASE_URL}/${item.photo}`} width="35px" height="35px" style={{borderRadius: '50%'}} alt="Image"/></td>
                                                <td className="roboto-font">{item.numero_carte ?? '-'}</td>
                                                <td className="roboto-font">{`${item.nom} ${item.prenom}`}</td>
                                                <td className="roboto-font">{item.votes == 'cin' ? 'C.I.N' : item.votes == 'Convocation' ? item.votes : 'Carte A.E.U.T.N.A'}</td>
                                                <td className="roboto-font">{item.secteurs}</td>
                                                <td className="text-center">
                                                {
                                                    item.numero_carte == null 
                                                    ?
                                                    <Link to={`show-electeur-non-adhere/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                    :
                                                    <Link to={`show-electeur/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                }       
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

export default Liste_des_membres_electeurs;