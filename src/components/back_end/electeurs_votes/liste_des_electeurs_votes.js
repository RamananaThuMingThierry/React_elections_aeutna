import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";

const Liste_des_electeurs_votes = () =>{
    
    const [liste_des_electeurs, setliste_des_electeurs] = useState([]);
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
    const records = liste_des_electeurs.slice(firstIndex, lastIndex);
    const npage = Math.ceil(liste_des_electeurs.length / recordsPerPage);
    const numbers = [...Array(npage +1).keys()].slice(1);
    
    const  handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    useEffect(() =>{
    
        axios.get(`api/liste_des_electeurs_votes`).then(res =>{
            if(res.status === 200){
                setliste_des_electeurs(res.data.electeurs_votes);   
            }
             setLoading(false);
         });

     },[]);

    if(loading){
      return <Loading/>
    }


    const Actualiser = (e) =>{
        e.preventDefault();
        
        searchInput.search = '';
        searchInput.select = '';

        axios.get(`api/liste_des_electeurs_votes`).then(res =>{
            if(res.status === 200){
                setliste_des_electeurs(res.data.electeurs_votes);   
            }
         });
    }

    
    const RechercheElecteurVote = (e) =>{
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
            axios.get(`api/recherche_un_electeur_vote/${data.select}/${data.search}`).then(res =>{
                console.log(res.data);
                if(res.data.status  === 200){
                    console.log(res.data.recherche_un_electeur_vote);
                    setliste_des_electeurs(res.data.recherche_un_electeur_vote);
                }else if(res.data.status === 400){
                    swal("Info", res.data.message,"info");
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message,"warning");
                }
            });
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-2 p-2 rounded-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h2 className="text-muted roboto-font mt-2 text-center">
                                Liste des électeurs
                            </h2>
                            <div className="d-flex justify-content align-items-center">
                                <button onClick={Actualiser} className="btn mt-1 btn-primary rounded-0 btn-md"><i className="fas fa-refresh"></i></button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-1 p-2 rounded-0">
                       <form onSubmit={RechercheElecteurVote}>
                            <div className="input-group">
                                <input type="search" name="search" className="form-control roboto-font rounded-0" placeholder="Recherche" value={searchInput.search} onChange={handleInput} aria-label="Search" aria-describedby="search-addon" />
                                <select class="form-select roboto-font" name="select" value={searchInput.select} onChange={handleInput} aria-label="Default select example">
                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                    <option value="numero_carte">Numéro carte</option>
                                    <option value="nom">Nom</option>
                                    <option value="prenom">Prénom</option>
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
                                    <th className="roboto-font">Noms</th>
                                    <th className="roboto-font">Prénoms</th>
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
                                                <td className="roboto-font">{item.nom}</td>
                                                <td className="roboto-font">{item.prenom}</td>
                                                <td className="roboto-font">{item.votes == 'cin' ? 'C.I.N' : item.votes == 'Convocation' ? item.votes : 'Carte A.E.U.T.N.A'}</td>
                                                <td className="roboto-font">{item.secteurs}</td>
                                                <td className="text-center">
                                                {
                                                    item.numero_carte == null 
                                                    ?
                                                    <Link to={`afficher_un_electeur_non_adhere_vote/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                    :
                                                    <Link to={`afficher_un_electeur_membre_vote/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                }       
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        </div>
                        <ReactPaginate 
                        previousLabel={'<<'}
                        nextLabel={'>>'}
                        breakLabel={'...'}
                        pageCount={numbers.length}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={1}
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
        </Fragment>
    );
}

export default Liste_des_electeurs_votes;