import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ClientList from '../views/dashboard/clients/ClientList';
import ClientCreate from '../views/dashboard/clients/ClientCreate';
import ClientEdit from '../views/dashboard/clients/ClientEdit';
import Services from '../views/dashboard/services/Services';
import ServiceCreate from '../views/dashboard/services/ServiceCreate';
import ServiceEdit from '../views/dashboard/services/ServiceEdit';
import Tarifs from '../views/dashboard/tarifs/Tarifs';
// import Laveur from '../views/laveur';
import LaveurCreate from '../views/dashboard/laveurs/LaveurCreate';
import TarifCreate from '../views/dashboard/tarifs/TarifCreate';
import TarifEdit from '../views/dashboard/tarifs/TarifEdit';
import RendezVous from '../views/dashboard/rendezvous/RendezVous';
import RendezVousCalendar from '../views/dashboard/rendezvous/RendezVousCalendar';
import RendezVousEdit from '../views/dashboard/rendezvous/RendezVousEdit';
import RendezVousCreate from '../views/dashboard/rendezvous/RendezVousCreate';
import StylishCalendar from '../views/dashboard/calendar/StylishCalendar';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const Laveur = Loadable(lazy(() => import('views/laveur')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
        {
          path: 'clients',
          element: <ClientList />
        },
        {
          path: 'client/create',
          element: <ClientCreate />
        },
        {
          path: 'client/edit/:id',
          element: <ClientEdit />
        },
        {
          path: 'rendezvous',
          element: <RendezVous />
        },
        {
          path: 'rendezvous/create',
          element: <RendezVousCreate />
        },
        {
          path: 'rendezvous/calendar',
          element: <RendezVousCalendar />
        },
        {
          path: 'rendezvous/edit/:id',
          element: <RendezVousEdit />
        },
        {
          path: 'services',
          element: <Services />
        },
        {
          path: 'service/create',
          element: <ServiceCreate />
        },
        {
          path: 'service/edit/:id',
          element: <ServiceEdit />
        },
        {
          path: 'tarifs',
          element: <Tarifs />
        },
        {
          path: 'laveurs',
          element: <LaveurCreate />
        },
        {
          path: 'tarif/create',
          element: <TarifCreate />
        },
        {
          path: 'tarif/edit/:id',
          element: <TarifEdit />
        },
        {
          path: 'calendar',
          element: <StylishCalendar />
        },
        
      ]
    },
    
    {
      path: 'laveur',
      element: <Laveur />
    },
    {
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
