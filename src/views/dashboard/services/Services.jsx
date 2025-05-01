import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ServiceList() {
    const [services, setServices] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/services', {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setServices(res.data);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous supprimer ce service ?")) {
            axios.delete(`http://localhost:8000/api/services/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                setServices(prev => prev.filter(service => service.id !== id));
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
                        <h5 className="card-title mb-0">Liste des services</h5>
                        <a href="/services/create" className="btn btn-primary btn-sm">
                            Ajouter
                        </a>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle text-center">
                            <thead className="table-light">
                                <tr>
                                    <th>Nom</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => (
                                    <tr key={service.id}>
                                        <td>{service.nom}</td>
                                        <td>{service.description}</td>
                                        <td>
                                            <a href={`/services/edit/${service.id}`} className="btn btn-sm btn-outline-primary me-2">
                                                Modifier
                                            </a>
                                            <button onClick={() => handleDelete(service.id)} className="btn btn-sm btn-outline-danger">
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {services.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-muted">Aucun service trouvé.</td>
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

export default ServiceList;
