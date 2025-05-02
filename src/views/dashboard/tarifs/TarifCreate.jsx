import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function TarifCreate() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        service: "",
        type_vehicule: "",
        prix: 0,
    });
    const [services, setServices] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/api/services/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => setServices(response.data))
        .catch(error => console.error('Erreur lors de la récupération des services:', error));
    }, [])

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: name === "prix" ? Number(value) : value,
      }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/tarifications/', formData, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
        .then(() => {
            navigate(-1);
        })
        .catch((error) => {
            console.error("Erreur lors de la création:", error);
        });
        console.log(formData)
};
  return (
    <div className="container py-5">
    <div className="card shadow-sm">
      <div className="card-body">
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-4">Ajouter une tarification</h5>
        </div>
        <form className='w-100' onSubmit={handleSubmit}>
          {/* row 1 */}
          <div className="d-flex row mb-3 justify-content-around">
            <div className="form-group col-6 align-items-center">
            <label htmlFor="service" className='form-label'>Service</label>
                <select id='service' required className='form-select' name='service' value={formData.service} onChange={handleChange}>
                  <option value="">Sélectionner un service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.nom}>
                      {service.nom} - {service.description}
                    </option>
                  ))}
                </select>
           </div>
            <div className="form-group col-6 align-items-center">
            <label htmlFor="type_vehicule" className='form-label'>Type de vehicule</label>
                <select id='type_vehicule' required className='form-select' name='type_vehicule' value={formData.type_vehicule} onChange={handleChange}>
                  <option value="">Sélectionnez un type de véhicule</option>
                  <option value="voiture">Voiture</option>
                  <option value="moto">Moto</option>
                  <option value="camion">Camion</option>
                  <option value="camionnette">Camionnette</option>
                  <option value="utilitaire">Utilitaire</option>
                </select>
            </div>
          </div>

          {/* row 2 */}
          <div className="d-flex row mb-4 justify-content-around">
            
            <div className="form-group col-6 align-items-center">
              <label htmlFor="prix" className='form-label'>Prix</label>
              <input type="number" required className='form-control' value={formData.prix} name='prix' id='prix' onChange={handleChange} />
            </div>
          </div>

          {/* row 3 */}
          <div className="d-flex row mb-3 justify-content-around">
            <div className="col-8">
            </div>
            <div className="col-4 d-flex row justify-content-left">
              <div className="col-6">
                <button className="btn btn-secondary btn-sm" onClick={() => {navigate(-1);}} >Retour</button>
              </div>
              <div className="col-6">
                <button type='submit' className="btn btn-primary btn-sm">Valider</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default TarifCreate