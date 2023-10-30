import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

const  ModifierMotDePasse = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Valider les données du formulaire
  const ModifierMotDePasseSubmit = (e) => {
    e.preventDefault();

    // Valider l'ancien mot de passe
    if (oldPassword === "") {
      alert("Veuillez entrer votre ancien mot de passe.");
      return;
    }

    // Valider le nouveau mot de passe
    if (newPassword === "") {
      alert("Veuillez entrer votre nouveau mot de passe.");
      return;
    }

    // Valider la confirmation du nouveau mot de passe
    if (newPassword !== confirmNewPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Changer le mot de passe
    changePassword(oldPassword, newPassword);
  };

  // Changer le mot de passe
  const changePassword = (oldPassword, newPassword) => {
    // Appeler l'API Laravel
    axios.post("/api/change-password", {
      old_password: oldPassword,
      new_password: newPassword,
    }).then((response) => {
      // Si la requête a réussi
      if (response.status === 200) {
        // Rediriger vers la page de connexion
        window.location.href = "/";
      } else {
        // Afficher une erreur
        alert(response.data.message);
      }
    });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6 offset-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2">
                  <h3 className="text-center roboto-font text-muted my-3">Modifier le mot de passe</h3>
              </div>
          </div>
      </div>
      <div className="row">
          <div className="col-md-6 offset-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-1">
                  <div className="card-body">
                      <form onSubmit={ModifierMotDePasseSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <label for="ancien_mot_de_passe" className="label-form roboto-font">Ancien Mot de passe</label>
                                <input type="text" value="" id="ancien_mot_de_passe" name="ancien_mot_de_passe" className="form-control p-3 rounded-0" placeholder="Entrer votre ancine mot de passe"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label for="ancien_mot_de_passe" className="label-form roboto-font">Ancien Mot de passe</label>
                                <input type="text" value="" id="ancien_mot_de_passe" name="ancien_mot_de_passe" className="form-control p-3 rounded-0" placeholder="Entrer votre ancine mot de passe"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label for="ancien_mot_de_passe" className="label-form roboto-font">Ancien Mot de passe</label>
                                <input type="text" value="" id="ancien_mot_de_passe" name="ancien_mot_de_passe" className="form-control p-3 rounded-0" placeholder="Entrer votre ancine mot de passe"/>
                            </div>
                        </div>
                        <hr className="mt-4"/>
                        <div className="row">
                            <div className="col-md-4 offset-md-4">
                                
                            </div>
                            <div className="col-md-4">
                                
                            </div>
                        </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </Fragment>
    // <div>
    //   <h1>Changer le mot de passe</h1>

    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="password"
    //       placeholder="Ancien mot de passe"
    //       value={oldPassword}
    //       onChange={(e) => setOldPassword(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Nouveau mot de passe"
    //       value={newPassword}
    //       onChange={(e) => setNewPassword(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Confirmer le nouveau mot de passe"
    //       value={confirmNewPassword}
    //       onChange={(e) => setConfirmNewPassword(e.target.value)}
    //     />
    //     <button type="submit">Changer le mot de passe</button>
    //   </form>
    // </div>
  );
};

export default ModifierMotDePasse;