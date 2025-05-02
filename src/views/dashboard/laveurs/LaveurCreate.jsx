import React, { useState } from 'react';
import axios from 'axios';

function LaveurCreate() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Le nom d’utilisateur et le mot de passe sont requis.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/laveur/',
        { username, email, password },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Erreur lors de la création du laveur.");
      console.error(error.response?.data);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      {success && (
        <div className="position-fixed top-0 end-0 m-4 z-3">
          <div className="alert alert-success d-flex align-items-center shadow" role="alert">
            <i className="fas fa-check-circle me-2"></i>
            <div>Laveur créé avec succès !</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3 shadow-sm p-4 p-md-5" style={{ maxWidth: '900px', width: '100%' }}>
        <h3 className="mb-4">Formulaire d'ajout d’un laveur</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12 col-sm-6">
            <label className="form-label d-flex justify-content-between align-items-center" htmlFor="username">
              <span>Nom d’utilisateur</span>
              <span className="edit-save text-muted" style={{ fontSize: '0.75rem', cursor: 'pointer' }}>
                <i className="fas fa-pencil-alt me-1"></i>Modifier
              </span>
            </label>
            <div className="input-group">
              <input
                className="form-control"
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <span className="input-group-text">
                <i className="fas fa-user text-secondary"></i>
              </span>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <label className="form-label d-flex justify-content-between align-items-center" htmlFor="email">
              <span>Email</span>
              <span className="edit-save text-muted" style={{ fontSize: '0.75rem', cursor: 'pointer' }}>
                <i className="fas fa-pencil-alt me-1"></i>Modifier
              </span>
            </label>
            <div className="input-group">
              <input
                className="form-control"
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <span className="input-group-text">
                <i className="far fa-envelope text-secondary"></i>
              </span>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <label className="form-label d-flex justify-content-between align-items-center" htmlFor="password">
              <span>Mot de passe</span>
              <span className="edit-save text-muted" style={{ fontSize: '0.75rem', cursor: 'pointer' }}>
                <i className="fas fa-pencil-alt me-1"></i>Modifier
              </span>
            </label>
            <div className="input-group">
              <input
                className="form-control"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span className="input-group-text">
                <i className="fas fa-lock text-secondary"></i>
              </span>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-success px-4 py-2">
              <i className="fas fa-plus me-2"></i>Créer le laveur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LaveurCreate;
