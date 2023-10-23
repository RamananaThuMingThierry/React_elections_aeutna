import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useHistory } from "react-router-dom";

const Login = () =>{  
    const history = useHistory();

    const inputStyle = {
        marginTop: '25px',
        borderRadius: '10px',
        padding: '10px'
    }

    const [LoginInput, setLogin] = useState({
        email: '',
        password:'',
        error_list: [],
    });

    const handleInput = (e) =>{
        e.persist();
        setLogin({...LoginInput, [e.target.name]: e.target.value});
    }

    const LoginSubmit = (e) =>{
        e.preventDefault();

        const data = {
            email: LoginInput.email,
            password: LoginInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res =>{
                if(res.data.status  === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.pseudo);
                    swal("Success", res.data.message,"success");
                    history.push("/admin/dashboard");
                }else if(res.data.status === 401){
                    swal("Warning", res.data.message,"warning");
                }
                else{
                    setLogin({...LoginInput, error_list: res.data.Validation_errors});
                }
            });
        });
    }

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg.jpg)`,
                        backgroundSize: 'cover',
                        width: '100vw',
                        height: '100vh',
                    }}>
                <div className="row">
                    <div className="col-md-4 col-sm-6 offset-sm-3 offset-md-4" style={{marginTop: '150px'}}>
                        <h4 className="text-center">Login</h4>
                        <form onSubmit={LoginSubmit}>
                            <div className="form-group">
                                <input type="email" placeholder="Adresse E-mail" name="email" onChange={handleInput} className="form-control" value={LoginInput.email} style={inputStyle}/>
                                <span>{LoginInput.error_list.email}</span>
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Mot de passe" name="password" onChange={handleInput} className="form-control" value={LoginInput.password} style={inputStyle}/>
                                <span>{LoginInput.error_list.password}</span>
                            </div>
                            <Link  to="/register">S'inscrire</Link>
                            <div className="form-group text-center" style={inputStyle}>
                                <button type="submit" className="btn btn-primary">Se Connecter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;