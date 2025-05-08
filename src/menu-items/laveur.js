// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'laveur',
  type: 'group',
  children: [
    {
      id: 'laveur',
      title: 'laveur',
      type: 'item',
      url: '/laveur',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
  
  ]
};

export default other;
