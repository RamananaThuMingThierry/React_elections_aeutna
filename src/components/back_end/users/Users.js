import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import swal from "sweetalert";

const Users = () =>{
    const [loading, setLoading] = useState(true);
    const [usersList, setUsersList] = useState([]);

    useEffect(() =>{

        axios.get(`api/users`).then(res =>{
            if(res.data.status === 200){
                setUsersList(res.data.users);   
            }
             setLoading(false);
         });

     },[]);

    if(loading){
        return <h4>Loading users...</h4>
    }

    const deleteUsers = (e, id) =>{
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Suppression...";

        swal({
            title: "Vous êtes sûr?",
            text: "Voulez-vous vraiment supprimer cet utilisateurs?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`api/delete-users/${id}`).then(res =>{
                    if(res.data.status === 200){
                        swal("Success", res.data.message, "success");
                        thisClicked.closest("tr").remove();
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
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Liste des utilisateurs
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Pseudo</th>
                                    <th>Adresse e-mail</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usersList.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.pseudo}</td>
                                                <td>{item.email}</td>
                                                <td className="text-center">
                                                    <Link to={`view-users/${item.id}`} className="btn btn-warning btn-sm mr-2"><i className="fas fa-eye"></i></Link>
                                                    <Link to={`edit-users/${item.id}`} className="btn btn-primary btn-sm mr-2"><i className="fa fa-edit"></i></Link>
                                                    <button className="btn btn-danger btn-sm d-inline" onClick={(e) => deleteUsers(e, item.id)}><i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;