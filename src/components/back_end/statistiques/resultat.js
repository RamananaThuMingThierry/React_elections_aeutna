import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Resultat = () =>{

  
const data = [
  { name: 'Groupe A', value: 750 }, // Membres AEUTNA
  { name: 'Groupe B', value: 900 }, // Electeurs Votes
  { name: 'Groupe C', value: 700 }, // Electeurs Membres
  { name: 'Groupe D', value: 200 }, // Electeurs Non adhéré
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container-fluid">
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
                  <h1 className="text-center roboto-font my-3 text-white">750</h1>
              </div>
          </div>
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#FFBB28'}}>
                  <h3 className="text-center roboto-font mt-4 my-3 text-white">Electeurs membres</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">700</h1>
              </div>
          </div>
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#FF8042'}}>
                  <h3 className="text-center roboto-font mt-4 text-white my-3">Electeurs non adhérés</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">200</h1>
              </div>
          </div>
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#00C49F'}}>
                  <h3 className="text-center roboto-font mt- text-white mt-4 my-3">Electeurs Votes</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">900</h1>
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
    </div>
  );
}

export default Resultat;