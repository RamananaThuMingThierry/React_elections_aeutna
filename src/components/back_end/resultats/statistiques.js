import React, { Fragment, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from "axios";
import Loading from "../constants/Loading";

const Statistiques = () =>{
  
const [loading, setLoading] = useState(true);
const [membresAEUTNA, setMembresAEUTNA] = useState(0);
const [electeursMembres, setElecteursMembres] = useState(0);
const [electeursNonAdheres, setElecteursNonAdheres] = useState(0);
const [electeursVotes, setElecteursVotes] = useState(0);
const [nombre_67h, set67h] = useState(0);
const [nombre_Ambohipo, setAmbohipo] = useState(0);
const [nombre_Ambolikandrina, setAmbolikandrina] = useState(0);
const [nombre_Ankatso_1, setAnkatso1] = useState(0);
const [nombre_Ankatso_2, setAnkatso2] = useState(0);
const [nombre_Centre_Ville, setCentreVille] = useState(0);
const [nombre_Itaosy, setItaosy] = useState(0);
const [nombre_Ivato, setIvato] = useState(0);
const [nombre_Votovorona, setVotovorona] = useState(0);

const [nombre_cin, setCIN] = useState(0);
const [nombre_copie, setCopie] = useState(0);
const [nombre_releve_de_notes, setReleveDeNotes] = useState(0);

const [nombre_nouveau_adhere, setNouveauAdhere] = useState(0);
useEffect(() =>{

  axios.get(`api/statistiques`).then(res =>{
    console.log(res.data.MembresAEUTNA);
      if(res.data.status === 200){
        setMembresAEUTNA(res.data.MembresAEUTNA);
        setElecteursMembres(res.data.ElecteursMembres);
        setElecteursNonAdheres(res.data.ElecteursNonAdheres);
        setElecteursVotes(res.data.Electeursvotes);
        set67h(res.data.nombre_67h);
        setAmbohipo(res.data.nombre_Ambohipo);
        setAmbolikandrina(res.data.nombre_Ambolikandrina);
        setAnkatso1(res.data.nombre_Ankatso_1);
        setAnkatso2(res.data.nombre_Ankatso_2);
        setCentreVille(res.data.nombre_Centre_Ville);
        setItaosy(res.data.nombre_Itaosy);
        setVotovorona(res.data.nombre_Votovorona);

        setCIN(res.data.nombre_cin);
        setCopie(res.data.nombre_copie);
        setReleveDeNotes(res.data.nombre_releve_de_notes);

        setNouveauAdhere(res.data.nombre_nouveau_adhere);
       }
       setLoading(false);
   });
},[]);

if(loading){
  return <Loading/>
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
            <div className="card elevation-1 border-0 bg-info rounded-0 mt-2">
                <h3 className="text-center text-white roboto-font my-3">S T A T I S T I Q U E S</h3>
            </div>
        </div>
      </div>

      <div className="row">
          <div className="col-md-12">
            <div className="card elevation-1 border-0 rounded-0">
                <h3 className="text-center text-muted roboto-font my-3">NOMBRE TOTAL</h3>
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
        <div className="card elevation-1 bg-secondary border-0 rounded-0 mt-2">
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

      <div className="row">
          <div className="col-md-12">
            <div className="card elevation-1 border-0 rounded-0 mt-2">
                <h3 className="text-center text-success roboto-font my-3">S E C T E U R S</h3>
            </div>
        </div>
      </div>
      <div className="row">
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#0088FE'}}>
                  <h3 className="text-center roboto-font mt-4 my-3 text-white">67 h</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{nombre_67h}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#FFBB28'}}>
                  <h3 className="text-center roboto-font mt-4 my-3 text-white">Ambohipo</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{nombre_Ambohipo}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 mt-2 bg-secondary">
                  <h3 className="text-center roboto-font mt-4 text-white my-3">Ambolikandrina</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{nombre_Ambolikandrina}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 mt-2 bg-light">
                  <h3 className="text-center roboto-font mt- text-primary mt-4 my-3">Ankatso 1</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-primary">{nombre_Ankatso_1}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 mt-2 bg-dark">
                  <h3 className="text-center roboto-font mt- text-white mt-4 my-3">Ankatso 2</h3>
                  <hr style={{color: 'white'}}/>
                  <h1 className="text-center roboto-font my-3 text-white">{nombre_Ankatso_2}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 mt-2 bg-info">
                  <h3 className="text-center roboto-font mt- text-white mt-4 my-3">Centre Ville</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{nombre_Centre_Ville}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 mt-2 bg-success">
                  <h3 className="text-center roboto-font mt- text-white mt-4 my-3">Itaosy</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{nombre_Itaosy}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 mt-2 bg-warning">
                  <h3 className="text-center roboto-font mt- text-white mt-4 my-3">Ivato</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{nombre_Ivato}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 mt-2 bg-danger">
                  <h3 className="text-center roboto-font mt- text-white mt-4 my-3">Votovorona</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{nombre_Votovorona}</h1>
              </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card elevation-1 border-0 rounded-0 mt-2">
                <h3 className="text-center text-success roboto-font my-3">Pièce Justificative</h3>
            </div>
        </div>
      </div>
      <div className="row mb-2">
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 bg-light mt-2">
                  <h3 className="text-center roboto-font mt-4 my-3 text-primary">C.I.N</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-primary">{nombre_cin}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 bg-light mt-2">
                  <h3 className="text-center roboto-font mt-4 my-3 text-primary">Copie</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-primary">{nombre_copie}</h1>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card elevation-1 border-0 rounded-0 bg-light mt-2">
                  <h3 className="text-center roboto-font mt-4 text-primary my-3">Relève de notes</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-primary">{nombre_releve_de_notes}</h1>
              </div>
          </div>
        </div>
       
        <div className="row">
          <div className="col-md-12">
            <div className="card elevation-1 border-0 bg-primary rounded-0 mt-2">
                <h3 className="text-center text-white roboto-font my-3">NOUVEAU ADHERE</h3>
            </div>
        </div>
      </div>
      <div className="row mb-2">
          <div className="col-md-12">
              <div className="card elevation-1 border-0 rounded-0 bg-light">
                  <h1 className="text-center roboto-font my-3 text-primary">{nombre_nouveau_adhere}</h1>
              </div>
          </div>
        </div>
    </Fragment>
  );
}

export default Statistiques;