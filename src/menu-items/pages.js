// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  type: 'group',
  children: [
    // {
    //   id: 'authentication',
    //   title: 'Authentication',
    //   type: 'collapse',
    //   icon: icons.IconKey,
    //   children: [
    //     {
    //       id: 'login',
    //       title: 'login',
    //       type: 'item',
    //       url: '/pages/login',
    //       target: true
    //     },
    //     {
    //       id: 'register',
    //       title: 'register',
    //       type: 'item',
    //       url: '/pages/register',
    //       target: true
    //     }
    //   ]
    // }
    {
      id: 'clients',
      title: 'Clients',
      type: 'item',
      url: '/dashboard/clients',
      breadcrumbs: false
    },
    {
      id: 'services',
      title: 'Services',
      type: 'item',
      url: 'dashboard/services',
      breadcrumbs: false
    },
    {
      id: 'rendezvous',
      title: 'Rendez-Vous',
      type: 'item',
      url: 'dashboard/rendezvous',
      breadcrumbs: false
    },
    {
      id: 'tarifs',
      title: 'Tarifs',
      type: 'item',
      url: 'dashboard/tarifs',
      breadcrumbs: false
    },
    {
      id: 'laveur',
      title: 'laveur',
      type: 'item',
      url: 'dashboard/laveur',
      breadcrumbs: false
    },
    
  ]
};

export default pages;
