// import pages
import { timeLine } from './routes/timeLine.js';
import { login } from './routes/login.js';
import { register } from './routes/register.js';

// Connect with html
export const root = document.getElementById('root'); // In this node is where everything is render
const routes = {
  // Object that contains the routes and what to render
  '/': login,
  '/timeline': timeLine,
  '/register': register,
};

export const onNavigate = (pathname) => {
  // Takes pathname and render section according to it
  window.history.pushState(
    {}, // State
    pathname, // Title
    window.location.origin + pathname // Domian or url
  );
  root.removeChild(root.firstChild); //
  root.appendChild(routes[pathname]()); // Run the function to enter the pathname received
};
const pages = routes[window.location.pathname]; // Render to "/"

window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(pages());
};

root.appendChild(pages());
