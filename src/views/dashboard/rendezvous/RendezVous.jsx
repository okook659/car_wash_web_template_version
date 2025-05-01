import React, { useEffect, useState } from 'react';

const RendezVous = () => {
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/rendezvous/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des rendez-vous');
        }

        const data = await response.json();
        setRendezVous(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRendezVous();
  }, []);

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Liste des rendez-vous</h5>
            <a href="/rendezvous/create" className="btn btn-primary btn-sm">
              Ajouter
            </a>
          </div>

          {loading ? (
            <p>Chargement des rendez-vous...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle text-center">
                <thead className="table-light">
                  <tr>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Type Véhicule</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rendezVous.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-muted">Aucun rendez-vous trouvé.</td>
                    </tr>
                  ) : (
                    rendezVous.map((rdv) => (
                      <tr key={rdv.id}>
                        <td>{rdv.username || 'N/A'}</td>
                        <td>{rdv.service?.nom || 'N/A'}</td>
                        <td>{new Date(rdv.date).toLocaleString()}</td>
                        <td>{rdv.type_vehicule}</td>
                        <td>{rdv.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RendezVous;
