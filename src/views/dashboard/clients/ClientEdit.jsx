import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

function ClientEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const token = localStorage.getItem('token');
    const [showError, setShowError] = useState(false)
    const [formData, setFormData] = useState({
        id: 0,
        points_fidelite: 0,
        user: {
            id: 0,
            username: "",
            email: ""
        }
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/clients/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setFormData({
                    user: response.data.user,
                    id: response.data.id,
                    points_fidelite: response.data.points_fidelite ?? 0
                });               
            })
            .catch((error) => {
                console.error("Erreur de chargement du client:", error);
            });
    }, [id]);
    

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'username' || name === 'email') {
            setFormData((prevData) => ({
                ...prevData,
                user: {
                    ...prevData.user,
                    [name]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/clients/${id}/`, formData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(() => {
            navigate(-1);
        }).catch((error) => {
            if (error.response.status === 400) {
                setError("Ce client existe déjà")
                setShowError(true)
            } else {
                console.error("Erreur lors de la mise à jour du client: ", error);
            }
        });
     
    }

    return (
        <div className="container py-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    {/* {showError ? <div className="row alert alert-danger alert-dismissible fade show" role="alert">
             <strong className='col-10'> Un client existe déjà avec ce nom et cet email</strong>
             <span className="close col-2" data-dismiss="alert" aria-label="Close">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" height={2} width={5}/></svg>
             </span>
           </div> : ''} */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title mb-4">Modifier un client</h5>
                    </div>
                    <form className='w-100' onSubmit={handleSubmit}>
                        {/* row 1 */}
                        <div className="d-flex row mb-3 justify-content-around">
                            <div className="form-group col-6 align-items-center">
                                <label htmlFor="username" className='form-label'>Nom</label>
                                <input type="text" name='username' id='username' className='form-control' value={formData.user.username || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group col-6 align-items-center">
                                <label htmlFor="email" className='form-label'>Email</label>
                                <input type="email" id='email' className='form-control' name='email' value={formData.user.email || ""} onChange={handleChange} />
                            </div>
                        </div>

                        {/* row 2 */}
                        <div className="d-flex row mb-4 justify-content-around">
                           
                            <div className="form-group col-6 align-items-center">
                                <label htmlFor="points_fidelite" className='form-label'>Points fidelités</label>
                                <input type="number" id='points_fidelite' name='points_fidelite' className='form-control' value={formData.points_fidelite ?? 0} readOnly />
                            </div>
                        </div>

                        {/* row 3 */}
                        <div className="d-flex row mb-3 justify-content-around">
                            <div className="col-8">
                            </div>
                            <div className="col-4 d-flex row justify-content-left">
                                <div className="col-6">
                                    <button className="btn btn-secondary btn-sm" onClick={() => { navigate(-1); }} >Retour</button>
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

export default ClientEdit