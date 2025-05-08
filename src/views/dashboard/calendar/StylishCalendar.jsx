import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

// FullCalendar requires stylesheets, we import them here
// import '@fullcalendar/core/index.css';
// import '@fullcalendar/daygrid/index.css';
// import '@fullcalendar/timegrid/index.css';
// import '@fullcalendar/list/index.css';


const StylishCalendar = () => {
  const events = [
    { title: 'Conference', date: '2024-06-12', description: 'Annual company conference' },
    { title: 'Meeting', date: '2024-06-15T14:00:00', description: 'Team sync-up meeting' },
    { title: 'Vacation', date: '2024-06-21', description: 'Start of vacation' },
    { title: 'Deadline', date: '2024-06-28', description: 'Project deadline' },
  ];

  // Custom event content to show description on mouse hover or tap
  const renderEventContent = (eventInfo) => {
    return (
      <div className="fc-event-custom">
        <div className="fc-event-title">{eventInfo.event.title}</div>
        {eventInfo.event.extendedProps.description && (
          <div className="fc-event-desc" title={eventInfo.event.extendedProps.description}>
            {eventInfo.event.extendedProps.description}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style>{`
        .fc {
          max-width: 900px;
          margin: 30px auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .fc-toolbar-chunk, .fc-toolbar-title {
          color: white !important;
          font-weight: 700;
          letter-spacing: 0.06em;
        }
        .fc .fc-button {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          font-weight: 600;
          text-transform: uppercase;
          transition: background-color 0.3s ease;
          border-radius: 6px;
          padding: 6px 14px;
        }
        .fc .fc-button:focus, .fc .fc-button:hover {
          background: rgba(255,255,255,0.35);
          color: white;
          outline: none;
        }
        .fc-daygrid-day-number {
          font-weight: 700;
          color: #f0f0f0;
          padding-left: 10px;
        }
        .fc-daygrid-day.fc-day-today {
          background: rgba(255,255,255,0.15);
          border-radius: 8px;
        }
        .fc-event {
          background-color: rgba(255, 255, 255, 0.8) !important;
          color: #333 !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-size: 0.85rem;
          padding: 3px 6px !important;
          cursor: pointer;
          transition: box-shadow 0.3s ease;
        }
        .fc-event:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }
        .fc-event-custom {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .fc-event-title {
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .fc-event-desc {
          font-size: 0.7rem;
          color: #555;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 600px) {
          .fc {
            max-width: 100% !important;
            margin: 10px;
            font-size: 14px;
          }
          .fc-toolbar-title {
            font-size: 1.2rem !important;
          }
          .fc .fc-button {
            padding: 4px 8px;
            font-size: 0.8rem;
          }
          .fc-event {
            font-size: 0.7rem !important;
          }
        }
      `}</style>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        buttonText={{
          today: 'Aujourd\'hui',
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          list: 'Liste'
        }}
        events={events}
        eventContent={renderEventContent}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        height="auto"
      />
    </>
  );
};

export default StylishCalendar;
