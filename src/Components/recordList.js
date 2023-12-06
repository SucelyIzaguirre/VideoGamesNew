/*El siguiente código servirá como componente de visualización para nuestros registros.
 Obtendrá todos los registros en nuestra base de datos a través de un método GET.
 
 
El componente recupera los registros de la base de datos utilizando una solicitud GET a la ruta /record del servidor y
muestra cada registro en una fila de la tabla. Cada fila tiene botones para editar y eliminar el registro correspondiente. 
Cuando el usuario hace clic en el botón “Eliminar”, el componente envía una solicitud DELETE a la ruta /record/:id del servidor
para eliminar el registro de la base de datos. */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.name}</td>
   <td>{props.record.position}</td>
   <td>{props.record.level}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5050/record/`);
 
     if (!response.ok) {
       const message = `SE HA PRODUCIDO UN ERROR: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 


 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5050/record/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 

 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }


 
 useEffect(() => {
  async function getRecords() {
    const response = await fetch(`http://localhost:5050/record/`);

    if (!response.ok) {
      const message = `SE HA PRODUCIDO UN ERROR: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    setRecords(records);
  }

  getRecords();

  return;
}, [records.length]);

// This method will delete a record
async function deleteRecord(id) {
  await fetch(`http://localhost:5050/record/${id}`, {
    method: "DELETE"
  });

  const newRecords = records.filter((el) => el._id !== id);
  setRecords(newRecords);
}




 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Position</th>
           <th>Level</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}