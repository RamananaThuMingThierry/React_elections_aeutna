import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

const Register = () =>{

    const history = useHistory();
    
    const [registerInput, setRegister] = useState({
        pseudo: '',
        email: '',
        password:'',
        error_list: [],
    });

    const handleInput = (e) =>{
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }

    const RegisterSubmit = (e) =>{
        e.preventDefault();

        const data = {
            pseudo: registerInput.pseudo,
            email: registerInput.email,
            password: registerInput.password,
            c_password: registerInput.c_password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/register`, data).then(res =>{
                if(res.data.code_status  === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.password);
                    swal("Success", res.data.message,"success");
                    history.push("/admin/dashboard");
                }else{
                    setRegister({...registerInput, error_list: res.data.Validation_errors});
                }
            });
        });
    }

    return (
        <>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card rounded-0">
                            <div className="card-header">
                                <h4 className="text-center">Inscription</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" placeholder="Pseudo" name="pseudo" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="E-mail" name="email" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Mot de passe" name="password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Confirmer votre mot de passe" name="password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">S'inscrire</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;