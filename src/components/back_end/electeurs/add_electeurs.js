import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

const AddMembres = () =>{

    const history = useHistory();
    
    const [electeursInput, setElecteurs] = useState({
        numero_carte:'',
        nom:'',
        prenom:'',
        ddn:'',
        ldn:'',
        sexe:'',
        cin:'',
        delivrance_cin:'',
        filieres:'',
        niveau:'',
        adresse:'',
        contact:'',
        axes:'',
        sympathisant:'',
        facebook:'',
        date_inscription:'',
        error_list: [],
    });

    const handleInput = (e) =>{
        e.persist();

        setElecteurs({...electeursInput, [e.target.name]: e.target.value});
    }

    const SubmitAddElecteurs = (e) =>{
        e.preventDefault();

        const data = {
            numero_carte: electeursInput.numero_carte,
            nom: electeursInput.nom,
            prenom: electeursInput.prenom,
            ddn: electeursInput.ddn,
            ldn: electeursInput.ldn,
            sexe: electeursInput.sexe,
            cin: electeursInput.sexe,
            delivrance_cin: electeursInput.delivrance_cin,
            filieres: electeursInput.filieres,
            niveau: electeursInput.niveau,
            adresse: electeursInput.adresse,
            contact: electeursInput.contact,
            axes: electeursInput.axes,
            sympathisant: electeursInput.sympathisant,
            facebook: electeursInput.facebook,
            date_inscription: electeursInput.date_inscription
        };

        axios.post(`api/store-electeur`, data).then(res =>{
            if(res.data.code_status === 200){
                swal("Sucess", res.data.message, "success");
                document.getElementById('ELECTEURS_FORM').reset();
                history.push("/admin/electeur-membres");
            }else if(res.data.status === 404){
                swal("Warning", res.data.message, "warning");
                setCategory({...categoryInput, error_list: res.data.errors});
            }
        });
    }

    return (
        <div className="container-fluid pt-2">
            <div className="elevation-1 mb-2 p-2 bg-white">
                <h3>Category</h3>
            </div>
            <form onSubmit={SubmitAddElecteurs} id="ELECTEURS_FORM">
                <nav>
                    <div className="nav elevation-1 bg-white nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                    </div>
                </nav>
                <div className="tab-content bg-white elevation-1" id="nav-tabContent">
                    <div className="tab-pane card-body border fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        
                        <div className="form-group mb-3">
                            <input type="text" name="slug" placeholder="Slug" onChange={handleInput} value={categoryInput.slug} className="form-control"/>
                            <span>{categoryInput.error_list.slug}</span>
                        </div>
                        
                        <div className="form-group mb-3">
                            <input type="text" name="name" placeholder="Name" onChange={handleInput} value={categoryInput.name} className="form-control"/>
                            <span>{categoryInput.error_list.name}</span>
                        </div>
                        
                        <div className="form-group mb-3">
                            <textarea name="description" placeholder="Description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                            <span className="text-danger">{categoryInput.error_list.description}</span>
                        </div>
                        
                        <div className="form-group mb-3">
                            <label>status </label>
                            <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false}/>
                            Status 0: show / 1: hidden
                        </div>

                    </div>
                    <div className="tab-pane card-body border fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                        
                        <div className="form-group mb-3">
                            <input type="text" name="meta_title" placeholder="Meta title" onChange={handleInput} value={categoryInput.meta_title} className="form-control"/>
                            <span>{categoryInput.error_list.meta_title}</span>
                        </div>

                        <div className="form-group mb-3">
                            <textarea name="meta_keyword" placeholder="Meta Keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control"></textarea>
                        </div>

                        <div className="form-group mb-3">
                            <textarea name="meta_description" placeholder="Meta Description" onChange={handleInput} value={categoryInput.meta_description} className="form-control"></textarea>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary float-end">Enregistre</button>
            </form>    
        </div>
    );
}

export default AddCategory;