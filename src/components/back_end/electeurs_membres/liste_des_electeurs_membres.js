import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import '@fontsource/roboto';
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";

const ListeDesElecteursMembres = () =>{
    const [loading, setLoading] = useState(true);
    
    const [searchInput, setSearch] = useState({
        search:'',
        select:''
    });

    const handleInput = (e) =>{
        e.persist();
        setSearch({...searchInput, [e.target.name]: e.target.value});
    }

    const [listes_des_electeurs_membres, setlistes_des_electeurs_membres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = listes_des_electeurs_membres.slice(firstIndex, lastIndex);
    const npage = Math.ceil(listes_des_electeurs_membres.length / recordsPerPage);
    const numbers = [...Array(npage +1).keys()].slice(1);
    
    const [user, setUser] = useState([]);

    const  handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

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

    useEffect(() =>{
        axios.get(`api/liste_des_electeurs_membres`).then(res =>{
            if(res.status === 200){
                setlistes_des_electeurs_membres(res.data.liste_des_electeurs_membres);   
                }
         });
        fetchUserId();
     },[]);

    if(loading){
       return <Loading/>
    }


    const Acutaliser = (e) =>{
        e.preventDefault();
        
        searchInput.search = '';
        searchInput.select = '';

        axios.get(`api/liste_des_electeurs_membres`).then(res =>{
            if(res.status === 200){
                setlistes_des_electeurs_membres(res.data.liste_des_electeurs_membres);   
            }
         });
    }

    // const exportToPDF = () => {
    //     axios.get(`api/export_liste_des_electeurs_membres`)
    //         .then(response => {
    //             const blob = new Blob([response.data], { type: 'application/pdf' });
    //             const url = window.URL.createObjectURL(blob);
    
    //             // Crée un lien invisible pour le téléchargement
    //             const a = document.createElement('a');
    //             a.style.display = 'none';
    //             a.href = url;
    //             a.download = 'liste_noms_prenoms.pdf';
    //             document.body.appendChild(a);
    
    //             // Cliquez sur le lien pour ouvrir la fenêtre de téléchargement
    //             a.click();
    
    //             // Libère les ressources
    //             window.URL.revokeObjectURL(url);
    //         })
    //         .catch(error => {
    //             swal("Erreur", "Erreur d'exporation des données !", "error");
    //         });
    // };
    
    const RechercheElecteursMembresSubmit = (e) =>{
        e.preventDefault();

        const data = {
            search: searchInput.search,
            select: searchInput.select
        }

        if(data.search == ''){
            swal("Warning", "Veuillez entrer la valuer à recherche !", "warning");
        }else if(data.select == ''){
            swal("Avertissement", "Voulez-vous faire une recherche par quoi ?", "warning");
        }else{
            axios.get(`api/recherche_un_electeur_membre/${data.select}/${data.search}`).then(res =>{
                console.log(res.data);
                if(res.data.status  === 200){
                    console.log(res.data.recherche_un_electeur_membre);
                    setlistes_des_electeurs_membres(res.data.recherche_un_electeur_membre);
                }else if(res.data.status === 400){
                    swal("Info", res.data.message,"info");
                }else if(res.data.status === 404){
                    swal("Avertissement", res.data.message,"warning");
                }
            });
        }
    }

    const SupprimerUnElecteurMembre = (e, id) =>{
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
                        Acutaliser(e); 
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
                            <h3 className="roboto-font text-muted text-center mt-2">
                                Liste des élécteurs membres A.E.U.T.N.A
                            </h3>
                            <div className="d-flex justify-content-between align-items-center">
                                {/* <Link to="/admin/export_liste_des_electeurs" type="button" className="btn rounded-0 mt-1 btn-warning"><i className="fas fa-export"></i></Link>     */}
                                {/* <button onClick={exportToPDF} className="btn rounded-0 btn-warning btn-md mt-1"><i className="fas fa-export"></i></button>
                                <span>&nbsp;</span> */}
                                <button onClick={Acutaliser} className="btn rounded-0 btn-primary btn-md mt-1"><i className="fas fa-refresh"></i></button>
                                <span>&nbsp;</span>
                                <Link to="/admin/ajouter_un_electeur_membre" type="button" className="btn rounded-0 mt-1 btn-success"><i className="fas fa-user-plus"></i></Link>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-1 p-2 rounded-0">
                       <form onSubmit={RechercheElecteursMembresSubmit}>
                            <div className="input-group">
                                <input type="search" name="search" className="roboto-font form-control rounded-0" placeholder="Recherche" value={searchInput.search} onChange={handleInput} aria-label="Search" aria-describedby="search-addon" />
                                <select className="form-select roboto-font" name="select" value={searchInput.select} onChange={handleInput} aria-label="Default select example">
                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                    <option value="numero_carte">Numéro carte</option>
                                    <option value="nom">Nom</option>
                                    <option value="prenom">Prénom</option>
                                    <option value="cin">C.I.N</option>
                                </select>
                                <button type="submit" className="btn btn-outline-primary rounded-0 roboto-font">Recherche</button>
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
                                    <th className="roboto-font">C.I.N</th>
                                    <th className="roboto-font text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map(item => {
                                        return (
                                            <tr key={item.id} style={{backgroundColor: item.status == 0 ? '' : 'Red'}}>
                                                <td><img src={item.photo == null ? `${process.env.PUBLIC_URL}/images/photo.jpg` : `${BASE_URL}/${item.photo}`} width="35px" height="35px" style={{borderRadius: '50%'}} alt="Image"/></td>
                                                <td className="roboto-font">{item.numero_carte ?? '-'}</td>
                                                <td className="roboto-font">{item.nom}</td>
                                                <td className="roboto-font">{item.prenom ?? '-'}</td>
                                                <td className="roboto-font">{item.cin ?? '-'}</td>
                                                <td className="text-center">
                                                    <div className="btn-group btn-group-md">
                                                   
                                                    {
                                                        user.roles == 0
                                                        ?
                                                        <Link to={`afficher_un_electeur_membre/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                        :
                                                        <>
                                                         <Link to={`afficher_un_electeur_membre/${item.id}`} className="btn btn-warning btn-md ml-2 rounded-0"><i className="fas fa-eye"></i></Link>
                                                            <Link to={`modifier_un_electeur_membre/${item.id}`} className="btn btn-primary btn-md ml-2"><i className="fa fa-edit"></i></Link>
                                                            <button className="rounded-0 btn btn-danger btn-md d-inline" onClick={(e) => SupprimerUnElecteurMembre(e, item.id)}><i className="fas fa-trash"></i></button>
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

export default ListeDesElecteursMembres;