import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom'; 

function RendezVousCalendar() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalDays: 0, filledDays: 0 });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8000/api/rendezvous/', {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
        const formattedEvents = data.map(rdv => ({
          title: rdv.title,
          date: rdv.date
        }));
        setEvents(formattedEvents);

        // Calcul statistique
        const uniqueDates = new Set(formattedEvents.map(e => e.date));
        setStats({
          totalDays: 30, // 30 jours dans le mois (simplifié)
          filledDays: uniqueDates.size
        });
      });
  }, []);

  const handleDateClick = (info) => {
    navigate('/dashboard/rendezvous/create');
  };

  const fillPercentage = (stats.filledDays / stats.totalDays) * 100;

  return (
    <div className="container py-5 bg-light min-vh-100">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h1 className="h4 text-dark">Calendrier des Rendez-vous</h1>
    <a href="/free/dashboard/rendezvous/create" className="btn btn-primary btn-sm">
      Planifier
    </a>
  </div>

  <div className="row gx-4">
    {/* Partie principale : Calendrier */}
    <div className="col-lg-8 mb-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
          }}
          height="auto"
          contentHeight="auto"
          dayMaxEventRows={3}
        />
      </div>
    </div>

    {/* Sidebar : Statistiques et Activité */}
    <div className="col-lg-4 d-flex flex-column gap-4">
      {/* Carte Statistiques */}
      <div className="bg-white p-4 rounded shadow-sm text-center">
        <h2 className="h6 text-secondary mb-3">Statistiques</h2>
        <div className="position-relative mx-auto" style={{ width: '8rem', height: '8rem' }}>
          <svg className="w-100 h-100" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
            <path
              className="text-muted"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-primary"
              strokeWidth="3"
              strokeDasharray={`${fillPercentage}, 100`}
              stroke="currentColor"
              fill="none"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="position-absolute top-50 start-50 translate-middle">
            <span className="fw-semibold text-dark small">{Math.round(fillPercentage)}%</span>
          </div>
        </div>
        <p className="small text-muted mt-3">{stats.filledDays} jours remplis / {stats.totalDays}</p>
      </div>

      {/* Carte Activité récente */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="h6 text-secondary mb-3">Activité récente</h2>
        <ul className="list-unstyled mb-0">
          {events.slice(0, 5).map((event, index) => (
            <li key={index} className="small text-muted mb-2">
              {event.title}{' '}
              <span className="text-secondary">({new Date(event.date).toLocaleDateString()})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>

  )
}

export default RendezVousCalendar