// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'laveurs',
  type: 'group',
  children: [
    {
      id: 'laveurs',
      title: 'laveurs',
      type: 'item',
      url: '/laveurs',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
  
  ]
};

export default other;
