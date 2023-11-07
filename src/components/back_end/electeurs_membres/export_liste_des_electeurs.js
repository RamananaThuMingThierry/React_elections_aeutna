// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// const Export_liste_des_electeurs = () => {

//   const [users, setUsers] = useState([]);
//   const history = useHistory();

//   // Récupère la liste des utilisateurs
//   const getUsers = async () => {
//       const response = await axios.get('/users');
//       setUsers(response.data);
//   };

//   // Exporte les données au format PDF
//   const exportData = async () => {
  
//     const pdf = await pdf.generate({
//           data: users.map((user) => ({
//               nom: user.nom,
//               prenom: user.prenom,
//           }),
//           filename: 'users.pdf',
//           table: {
//               header: ['Nom', 'Prénom'],
//               data: (data) => data.map((row) => [row.nom, row.prenom]),
//           },
//       });
//       window.open(pdf.output);
//   };

//   return (
//     <div>
//         <h1>Liste des utilisateurs</h1>
//         <ul>
//             {users.map((user) => (
//                 <li key={user.id}>{user.nom} {user.prenom}</li>
//             ))}
//         </ul>
//         <button onClick={getUsers}>Récupérer les données</button>
//         <button onClick={exportData}>Exporter les données</button>
//     </div>
// );
// }

// export default Export_liste_des_electeurs;
