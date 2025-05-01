import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

function ClientList() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        axios.get('http://localhost:8000/api/clients',
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            console.log(res.data)
            setClients(res.data);
        })
    }, [])
    const handleDelete = (id) => {
       if(confirm("Voulez-vous supprimer ce client?") == true){
        axios.delete(`http://localhost:8000/api/clients/${id}/`,
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        ).then(
            function(response){
              console.log(response);
              window.location.reload();
            }
          ).catch(function(error){
            console.log(error);
          });
       } else{
        alert("Opération annulée")
       }
    }
    return (
        <div className='text-white p-5'>
            <h1 className='text-3xl mb-6'>Liste des clients</h1>
            <a href='/clients/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg mb-3">
                Ajouter 
            </a>
            <table className='table w-full mt-4 text-lg border b-2 b-white'>
                        <thead className=' border b-2 border-black'>
                            <tr className="table-row" >
                                <th className='p-3 font-semibold table-cell border b-1'>Désignation</th>
                                <th className='p-3 font-semibold table-cell border b-1'>Email</th>
                                <th className='p-3 font-semibold table-cell border b-1'>Points de fidélité</th>
                                <th className='p-3 font-semibold table-cell border b-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                        {clients.map(function (client) {
                        return (
                                <tr className="table-row" key={client.id}>
                                    <td className='p-3 table-cell text-center border b-1'> {client.nom} </td>
                                    <td className='p-3 table-cell text-center border b-1'> {client.telephone} </td>
                                    <td className='p-3 table-cell text-center border b-1'> {client.email} </td>
                                    <td className='p-3 table-cell text-center border b-1'> {client.points_fidelite} </td>
                                    <td className='p-3 table-cell text-center border b-1'> 
                                        <div className="flex text-center justify-center">
                                            
                                            <a href={`/clients/edit/${client.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                                                <i className="fa-solid fa-pen-to-square" title="modifier"></i>
                                            </a>
                                            <span className="ml-2"></span>
                                            
                                                <button onClick={()=>{handleDelete(client.id)}} type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                    <i className="fa-solid fa-trash" title="supprimer"></i>
                                                </button>
                                            
                                        </div>    
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
           
        </div>
    )
}

export default ClientList