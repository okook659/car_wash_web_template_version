import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClientList() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:8000/api/clients', {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setClients(res.data);
            console.log(res.data);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous supprimer ce client?")) {
            axios.delete(`http://localhost:8000/api/clients/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                setClients(prev => prev.filter(c => c.id !== id));
            }).catch(err => {
                console.error(err);
            });
        } else {
            alert("Opération annulée");
        }
    };

    return (
        <div className="container py-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title mb-0">Liste des clients</h5>
                        <a href="client/create" className="btn btn-primary btn-sm">
                            Ajouter
                        </a>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle text-center">
                            <thead className="table-light">
                                <tr>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Points</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id}>
                                        <td>{client.user.username}</td>
                                        <td>{client.user.email}</td>
                                        <td><strong>{client.points_fidelite}</strong></td>
                                        <td>
                                            <a href={`client/edit/${client.id}`} className="btn btn-sm btn-outline-primary me-2">
                                                Modifier
                                            </a>
                                            <button onClick={() => handleDelete(client.id)} className="btn btn-sm btn-outline-danger">
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {clients.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-muted">Aucun client trouvé.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientList;
