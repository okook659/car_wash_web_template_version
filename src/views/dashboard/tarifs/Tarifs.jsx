import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ServiceTarificationList() {
    const [tarifications, setTarifications] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:8000/api/tarifications', {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setTarifications(response.data);
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des tarifs:', error);
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous supprimer ce tarif ?")) {
            axios.delete(`http://localhost:8000/api/tarifications/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                setTarifications(prev => prev.filter(t => t.id !== id));
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
                        <h5 className="card-title mb-0">Tarifs des services</h5>
                        <a href="tarif/create" className="btn btn-primary btn-sm">
                            Ajouter
                        </a>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle text-center">
                            <thead className="table-light">
                                <tr>
                                    <th>Service</th>
                                    <th>Type de Véhicule</th>
                                    <th>Prix</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tarifications.map((tarif) => (
                                    <tr key={tarif.id}>
                                        <td>{tarif.service}</td>
                                        <td>{tarif.type_vehicule}</td>
                                        <td><strong>{tarif.prix}</strong></td>
                                        <td>
                                            <button onClick={() => handleDelete(tarif.id)} className="btn btn-sm btn-outline-danger">
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {tarifications.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-muted">Aucun tarif trouvé.</td>
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

export default ServiceTarificationList;
