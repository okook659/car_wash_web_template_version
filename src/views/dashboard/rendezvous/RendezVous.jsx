import React, { useEffect, useState } from 'react';

const RendezVous = () => {
  const [rendezVous, setRendezVous] = useState([]);
  const [laveurs, setLaveurs] = useState([]);
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

    const fetchLaveurs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/laveurs/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setLaveurs(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des laveurs:', error);
      }
    };

    fetchRendezVous();
    fetchLaveurs();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Rendez-vous</h3>
        <div>
          <a href="laveurs" className="btn btn-outline-secondary btn-sm me-2">
            Ajouter un laveur
          </a>
          <a href="/rendezvous/create" className="btn btn-primary btn-sm">
            Ajouter un rendez-vous
          </a>
        </div>
      </div>

      <div className="row">
        {/* Liste des Laveurs */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Liste des laveurs</h5>
              {laveurs.length === 0 ? (
                <p className="text-muted">Aucun laveur trouvé.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {laveurs.map((laveur) => (
                    <li key={laveur.id} className="list-group-item">
                      {laveur.username} – email : <span className="text-muted">{laveur.email}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Liste des Rendez-vous */}
        <div className="col-md-8 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Liste des rendez-vous</h5>

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
                        <th>Assignation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rendezVous.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-muted">Aucun rendez-vous trouvé.</td>
                        </tr>
                      ) : (
                        rendezVous.map((rdv) => (
                          <tr key={rdv.id}>
                            <td>{rdv.username || 'N/A'}</td>
                            <td>{rdv.tarification?.service || 'N/A'}</td>
                            <td>{new Date(rdv.date).toLocaleString()}</td>
                            <td>{rdv.type_vehicule}</td>
                            <td>{rdv.status}</td>
                            <td>
                              <select
                                className="form-select form-select-sm"
                                value={rdv.laveur || ''}
                                onChange={async (e) => {
                                  const selectedLaveurId = e.target.value;
                                  try {
                                    const response = await fetch(`http://localhost:8000/api/rendezvous/${rdv.id}/`, {
                                      method: 'PATCH',
                                      headers: {
                                        'Authorization': `Token ${token}`,
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({ laveur: selectedLaveurId })
                                    });

                                    if (!response.ok) throw new Error('Erreur lors de l’assignation du laveur');

                                    const updatedRdv = await response.json();

                                    // Mettre à jour le tableau local
                                    setRendezVous((prev) =>
                                      prev.map((r) => (r.id === rdv.id ? updatedRdv : r))
                                    );
                                  } catch (err) {
                                    console.error(err);
                                    alert("Erreur lors de l'assignation");
                                  }
                                }}
                              >
                                <option value="">-- Assigner --</option>
                                {laveurs.map((laveur) => (
                                  <option key={laveur.id} value={laveur.id}>
                                    {laveur.username}
                                  </option>
                                ))}
                              </select>
                            </td>
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
      </div>
    </div>
  );
};

export default RendezVous;
