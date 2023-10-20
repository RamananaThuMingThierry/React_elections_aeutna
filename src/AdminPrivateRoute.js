import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import swal from "sweetalert";
import MasterLayout from "./layouts/back_end/MasterLayout";
const AdminPrivateRoute = ({...rest}) =>{

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() =>{
        axios.get(`api/checkingAuthenticated`).then(res =>{
            if(res.status === 200){
                setAuthenticated(true);
            }
            setLoading(false);
        });

        return () =>{
            setAuthenticated(false);
        };

    }, []);


    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status === 401){
            swal("Vous n'avez pas eu accès!", err.response.data.message, "warning");
            history.push("/");
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response){
        return response;
    }, function (error){
        
        if(error.response.status === 403) // Access Denied
        {
            swal("Forbidden", error.response.data.message, "warning");
            history.push("/403");
        }else if(error.response.status === 404) // Page not found
        {
            swal("404 Error", "Url/Page Not Found", "warning");
            history.push("/404");
        }
        return Promise.reject(error);
    });

    if(loading){
        return <h1 className="text-center mt-4">loading...</h1>
    }

    return (
        <Route {...rest}
            render={({location}) =>
                Authenticated ?
                (<MasterLayout/>):
                ( <Redirect to={ {pathname: "/", state: {from: location}} }/>)
            }
        />
    );
}

export default AdminPrivateRoute;