import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import laveur from './laveur';

// ==============================|| MENU ITEMS ||============================== //

const role = localStorage.getItem('role');

let menuItems = {
  items: []
};

if (role === 'laveur') {
  // Laveur voit uniquement sa propre page
  menuItems.items = [laveur];
} else if (role === 'admin') {
  // Admin voit tout sauf la page laveur
  menuItems.items = [dashboard, pages, other];
} else if (role === 'client') {
  // Client voit tout sauf la page laveur
  menuItems.items = [dashboard, pages, other];
}

export default menuItems;
