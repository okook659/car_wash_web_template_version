import React, { useState, useEffect } from 'react';

function Laveur() {
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
    const getStatusColor = (status) => {
      switch (status) {
          case 'en_attente': return 'bg-yellow-200 text-yellow-800';
          case 'confirme': return 'bg-green-200 text-green-800';
          case 'annule': return 'bg-red-200 text-red-800';
          default: return 'bg-gray-200 text-gray-800';
      }
  };

    fetchRendezVous();
  }, [token]);

  // ✅ Déplacée ici, en dehors de useEffect
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/rendezvous/${id}/changer-statut/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setRendezVous((prev) =>
          prev.map((rdv) =>
            rdv.id === id ? { ...rdv, status: newStatus } : rdv
          )
        );
      } else {
        console.error("Erreur lors du changement de statut");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Laveur</h3>
      </div>
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
                        <th>Prix</th>
                        <th>Type Véhicule</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rendezVous.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-muted">Aucun rendez-vous trouvé.</td>
                        </tr>
                      ) : (
                        rendezVous.map((rdv) => (
                          <tr key={rdv.id}>
                            <td>{rdv.username || 'N/A'}</td>
                            <td>{rdv.tarification?.service || 'N/A'}</td>
                            <td>{new Date(rdv.date).toLocaleString()}</td>
                            <td>{rdv.tarification?.prix || 'N/A'} francs</td>
                            <td>{rdv.type_vehicule}</td>
                            <td>{rdv.status}</td>
                            <td>
                              {rdv.status !== 'termine' && (
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleStatusChange(rdv.id, 'termine')}
                                >
                                  Terminer
                                </button>
                              )}
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
  );
}

export default Laveur;
