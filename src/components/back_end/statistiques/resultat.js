import React, { Fragment, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from "axios";

const Resultat = () =>{
  
const [loading, setLoading] = useState(true);
const [membresAEUTNA, setMembresAEUTNA] = useState(0);
const [electeursMembres, setElecteursMembres] = useState(0);
const [electeursNonAdheres, setElecteursNonAdheres] = useState(0);
const [electeursVotes, setElecteursVotes] = useState(0);

useEffect(() =>{

  axios.get(`api/resultat`).then(res =>{
    console.log(res.data.MembresAEUTNA);
      if(res.data.status === 200){
        setMembresAEUTNA(res.data.MembresAEUTNA);
        setElecteursMembres(res.data.ElecteursMembres);
        setElecteursNonAdheres(res.data.ElecteursNonAdheres);
        setElecteursVotes(res.data.Electeursvotes);
       }
       setLoading(false);
   });
},[]);

if(loading){
  return (
      <div className="container-fluid bg-white mt-2 d-flex justify-content-center align-items-center" style={{height: '85vh'}}>
          <div className="text-center">
              <h2 className="text-muted roboto-font">Veuillez patienter s'il vous plaît...!</h2>        
          </div>    
      </div>
  );
}

const data = [
  { name: 'Groupe A', value: membresAEUTNA }, // Membres AEUTNA
  { name: 'Groupe B', value:  electeursVotes }, // Electeurs Votes
  { name: 'Groupe C', value:  electeursMembres }, // Electeurs Membres
  { name: 'Groupe D', value:  electeursNonAdheres }, // Electeurs Non adhéré
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Fragment>
      <div className="row">
          <div className="col-md-12">
            <div className="card elevation-1 border-0 rounded-0 mt-2">
                <h3 className="text-center text-muted roboto-font my-3">Statistiques du votes</h3>
            </div>
        </div>
      </div>
      <div className="row">
          <div className="col-md-12">
            <div className="card elevation-1 border-0 rounded-0 mt-2">
                <h3 className="text-center text-muted roboto-font my-3">Nombre Total</h3>
            </div>
        </div>
      </div>
      <div className="row">
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#0088FE'}}>
                  <h3 className="text-center roboto-font mt-4 my-3 text-white">Membres AEUTNA</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{membresAEUTNA}</h1>
              </div>
          </div>
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#FFBB28'}}>
                  <h3 className="text-center roboto-font mt-4 my-3 text-white">Electeurs membres</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{electeursMembres}</h1>
              </div>
          </div>
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#FF8042'}}>
                  <h3 className="text-center roboto-font mt-4 text-white my-3">Electeurs non adhérés</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{electeursNonAdheres}</h1>
              </div>
          </div>
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#00C49F'}}>
                  <h3 className="text-center roboto-font mt- text-white mt-4 my-3">Electeurs Votes</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{electeursVotes}</h1>
              </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card elevation-1 border-0 rounded-0 mt-2">
            <ResponsiveContainer width="100%" height={480}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
    </Fragment>
  );
}

export default Resultat;